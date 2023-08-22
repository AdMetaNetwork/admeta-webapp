import axios from 'axios'
import { SCORE_LEVEL } from '../config/constant';

export const formatAddress = (address: string | undefined): string => {
	if (!address) return '';
	const str_1 = address.substring(0, 4)
	const str_2 = address.substring(address.length - 4)
	return `${str_1}......${str_2}`
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

export const calculationSingleLevel = (score: number) => {
	if (score === 0) {
		return 0
	}
	return SCORE_LEVEL.findIndex(v => score < v) + 1
}

class UserException {
	message: string
	name: string

	constructor(message: string, name: string) {
		this.message = message
		this.name = name
	}
}

export const throwException = (message: string, name: string) => {
	throw new UserException(message, name);
}
