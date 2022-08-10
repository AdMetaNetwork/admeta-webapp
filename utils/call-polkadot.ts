import { extension_name } from '../config/constant'
import type { ApiRx } from '@polkadot/api'
import { formatAdData } from './tools'
import { AdInfo } from './type'

class CallPolkadot {
	sender: string
	api: ApiRx

	constructor(sender: string, api: ApiRx) {
		this.sender = sender
		this.api = api
	}

	private tx() {
		if (!this.api) return null

		return this.api.tx
	}

	private qu() {
		if (!this.api) return null

		return this.api.query
	}

	// get balance
	getAddressBanlance() {
		return new Promise((resolve, reject) => {
			this.qu()
				?.system.account(this.sender)
				.subscribe((c: any) => {
					if (c.toString()) {
						const d = JSON.parse(c.toString())
						resolve(d.data.free || 0)
					}
				})
		})
	}

	// get user profile
	getUserProfile() {
		return new Promise((resolve, reject) => {
			this.qu()
				?.user.users(this.sender)
				.subscribe((c: any) => {
					if (c.toString()) {
						const d = JSON.parse(c.toString())
						resolve({ info: d })
					} else {
						resolve({ err: 'no data' })
					}
				})
		})
	}

	// update user profile
	async updateUserProfile(age: number, tag: string, display: boolean) {
		const { web3FromAddress, web3Enable } = await import(
			'@polkadot/extension-dapp'
		)
		await web3Enable(extension_name)
		const injector = await web3FromAddress(this.sender)

		return new Promise((resolve, reject) => {
			this.tx()
				?.user.addProfile(age, tag, display)
				.signAndSend(this.sender, { signer: injector.signer })
				.subscribe(result => {
					if (result.isInBlock) {
						resolve({ info: 'ok' })
					}
				})
		})
	}

	// set ad display
	async setAdDisplay(p: boolean) {
		const { web3FromAddress, web3Enable } = await import(
			'@polkadot/extension-dapp'
		)
		await web3Enable(extension_name)
		const injector = await web3FromAddress(this.sender)

		return new Promise((resolve, reject) => {
			this.tx()
				?.user.setAdDisplay(p)
				.signAndSend(this.sender, { signer: injector.signer })
				.subscribe(result => {
					if (result.isInBlock) {
						resolve({ info: 'ok' })
					}
				})
		})
	}

	// get user ad
	async getUserAd(uper: string, idx: number) {
		return new Promise((resolve, reject) => {
			this.qu()
				?.ad.impressionAds(uper, idx)
				.subscribe((c: any) => {
					if (c.toString()) {
						const d = JSON.parse(c.toString())
						resolve({ info: d })
					} else {
						resolve({ info: 'no data' })
					}
				})
		})
	}

	// get user ads
	async getUserAds(uper: string) {
		return new Promise((resolve, reject) => {
			this.qu()
				?.ad.impressionAds.entries(uper)
				.subscribe((c: any) => {
					
					if (c.toString()) {
						const d = formatAdData(c)
						resolve({ info: d })
					} else {
						resolve({ info: [] })
					}
				})
		})
	}

	// claim ad reward
	async claimReward(idx: number) {
		const { web3FromAddress, web3Enable } = await import(
			'@polkadot/extension-dapp'
		)
		await web3Enable(extension_name)
		const injector = await web3FromAddress(this.sender)

		return new Promise((resolve, reject) => {
			this.tx()
				?.user.claimReward(this.sender, idx)
				.signAndSend(this.sender, { signer: injector.signer })
				.subscribe(result => {
					if (result.isInBlock) {
						resolve({ info: 'ok' })
					}
				})
		})
	}

	// porpose ad
	async porposeAd(ad: AdInfo) {
		const { web3FromAddress, web3Enable } = await import(
			'@polkadot/extension-dapp'
		)
		await web3Enable(extension_name)
		const injector = await web3FromAddress(this.sender)

		return new Promise((resolve, reject) => {
			this.tx()
				?.ad.proposeAd(
					ad.metadata,
					ad.target,
					ad.title,
					ad.cpi,
					ad.amount,
					ad.endBlock,
					ad.preference
				)
				.signAndSend(this.sender, { signer: injector.signer })
				.subscribe(result => {
					if (result.isInBlock) {
						resolve({ info: 'ok' })
					}
				})
		})
	}

	// get current block
	async getCurrentBlock(): Promise<number> {
		return new Promise((resolve, reject) => {
			this.qu()
				?.system.number()
				.subscribe((c: any) => {
					if (c.toString()) {
						resolve(parseInt(c.toString()))
					} else {
						resolve(0)
					}
				})
		})
	}
}

export default CallPolkadot
