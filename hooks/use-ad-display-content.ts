
import { createContext, ReactNode } from 'react'

interface ad {
  adurl: string,
  adimg: string,
  adIdx: number,
  adTitle: string,
  adDec?: string,
  adDisplay?: boolean
}

interface BaseData {
  showTip: boolean,
  setShowTip: (v: boolean) => void,
  showModal: boolean,
  setShowModal: (v: boolean) => void,
  modalTitle: string,
  setModalTitle: (v: string) => void,
  modalBody: ReactNode,
  setModalBody: (v: ReactNode) => void,
  adMap: ad
}

export const initialState: BaseData = {
  showTip: false,
  setShowTip: () => {},
  showModal: false,
  setShowModal: () => {},
  modalTitle: '',
  setModalTitle: () => {},
  modalBody: '',
  setModalBody: () => {},
  adMap: {
    adimg: '',
    adurl: '',
    adIdx: 0,
    adTitle: '',
    adDec: '',
    adDisplay: false
  }
}

const AdDisplayCtx = createContext(initialState);

export default AdDisplayCtx;
