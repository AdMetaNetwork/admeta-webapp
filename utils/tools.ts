import { hexToString } from '@polkadot/util'

export const formatAddress = (address: string): string => {
	const str_1 = address.substring(0, 4)
	const str_2 = address.substring(address.length - 4)
	return `${str_1}......${str_2}`
}

export function formatAdData(c: any[]) {
	let arr: any[] = []
	c.forEach(item => {
		arr.push(item[1])
	})
	arr.forEach(item => {
		item = item.toString()
	})

	let a: any[] = JSON.parse(`[${arr.toString()}]`)
	a.forEach(item => {
		item.target = hexToString(item.target)
		item.metadata = hexToString(item.metadata)
		item.title = hexToString(item.title)
		
	})

	return a
}
