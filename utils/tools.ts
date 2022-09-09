import { hexToString } from '@polkadot/util'
import axios from 'axios'

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

export const getConfig = async () => {
	let config = localStorage.getItem('_config')
	if (!config) {
		try {
			const { data } = await axios.get('/api/getConfig')
			config = JSON.stringify(data)
			localStorage.setItem('_config', JSON.stringify(data))
		} catch (error) {
			config = '{}'
			console.error(error)
		}
	}

	return JSON.parse(config || '{}')
}
