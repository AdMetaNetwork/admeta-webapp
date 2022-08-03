import { createContext } from 'react'

interface p {
	age: string
	tag: string
	display: boolean
}

interface BaseData {
	profile: p
}

export const initialState: BaseData = {
	profile: {
		age: '',
		tag: '',
		display: false
	}
}

const ProfileCtx = createContext(initialState)

export default ProfileCtx
