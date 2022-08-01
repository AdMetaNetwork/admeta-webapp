import { createContext } from 'react'

interface p {
	age: string
	tag: string
	display: boolean
}

interface BaseData {
	profileMap: p
}

export const initialState: BaseData = {
	profileMap: {
		age: '',
		tag: '',
		display: false
	}
}

const ProfileCtx = createContext(initialState)

export default ProfileCtx
