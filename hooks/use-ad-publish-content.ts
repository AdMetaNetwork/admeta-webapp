
import { createContext, ReactNode } from 'react'

interface BaseData {
  showTip: boolean,
  setShowTip: (v: boolean) => void,
  showModal: boolean,
  setShowModal: (v: boolean) => void,
  modalTitle: string,
  setModalTitle: (v: string) => void,
  modalBody: ReactNode,
  setModalBody: (v: ReactNode) => void
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
}

const AdPublishCtx = createContext(initialState);

export default AdPublishCtx;
