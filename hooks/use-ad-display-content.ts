
import { createContext, ReactNode } from 'react'

interface HomeData {
  showTip: boolean,
  setShowTip: (v: boolean) => void,
  showModal: boolean,
  setShowModal: (v: boolean) => void,
  modalTitle: string,
  setModalTitle: (v: string) => void,
  modalBody: ReactNode,
  setModalBody: (v: ReactNode) => void
}

export const initialState: HomeData = {
  showTip: false,
  setShowTip: () => {},
  showModal: false,
  setShowModal: () => {},
  modalTitle: '',
  setModalTitle: () => {},
  modalBody: '',
  setModalBody: () => {}
}

const AdDisplayCtx = createContext(initialState);

export default AdDisplayCtx;
