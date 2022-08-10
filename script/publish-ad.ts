import { Keyring, WsProvider, ApiPromise } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import type { ApiRx } from '@polkadot/api'
import { polkadot_network } from '../config/constant'

export const s = async () => {
	await cryptoWaitReady()
	const keyring = new Keyring({ type: 'sr25519' })

	const alice = keyring.addFromUri('//Alice')
	console.log(alice)
	const wsProvider = new WsProvider(polkadot_network)
	const api = await ApiPromise.create({ provider: wsProvider })

	api.tx.user.addProfile(33, 'GameFi', true).signAndSend(alice, result => {
		console.log(`Current status is ${result.status}`)

		if (result.status.isInBlock) {
			console.log(
				`Transaction included at blockHash ${result.status.asInBlock}`
			)
		} else if (result.status.isFinalized) {
			console.log(
				`Transaction finalized at blockHash ${result.status.asFinalized}`
			)
		}
	})
}
