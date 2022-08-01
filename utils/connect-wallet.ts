import type { Wallet } from './type'

export const connectWallet = async (callback: (arg0: Wallet[]) => void) => {
	if (typeof window !== 'undefined') {
		const { web3Enable, web3Accounts } = await import(
			'@polkadot/extension-dapp'
		)
		const extensions = await web3Enable('admeta-app')
		if (extensions.length === 0) {
			console.log('No extension found')
			return
		}
		const allAccounts = (await web3Accounts()) as Wallet[]
		callback(allAccounts)
		localStorage.setItem('_account', JSON.stringify(allAccounts))
	}
}

export const selectWallet = (address: string) => {
	localStorage.setItem('_select_account', address)
}