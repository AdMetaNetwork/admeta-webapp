
import { createContext, ReactNode } from 'react'

interface BaseData {
  isLoading?: boolean,
  setLoading?: (v: boolean) => void,
  showTip?: boolean,
  setShowTip?: (v: boolean) => void,
  tipType?: 'Success' | 'Error',
  setTipType?: (v: 'Success' | 'Error') => void,
  tipText?: string,
  setTipText?: (v: string) => void,
  showModal?: boolean,
  setShowModal?: (v: boolean) => void,
  modalTitle?: string,
  setModalTitle?: (v: string) => void,
  modalBody?: ReactNode,
  setModalBody?: (v: ReactNode) => void
}

interface AdInfo {
  adurl: string,
  adimg: string,
  adIdx: number,
  adTitle: string,
  adDec?: string,
  adDisplay?: boolean,
  adCpi?: number
}

interface Profile {
	age: string
	tag: string
	display: boolean
}

interface CusetmerInfo extends BaseData {
  adMap?: AdInfo
  profile?: Profile
}

export const initialState: CusetmerInfo = {
  showTip: false,
  showModal: false,
  isLoading: false,
}



const BaseCtx = createContext(initialState);

export default BaseCtx;
