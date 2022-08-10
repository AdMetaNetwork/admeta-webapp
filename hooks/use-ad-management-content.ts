
import { createContext, ReactNode } from 'react'

interface BaseData {
  showTip: boolean,
  setShowTip: (v: boolean) => void,
  showModal: boolean,
  setShowModal: (v: boolean) => void,
  modalTitle: string,
  setModalTitle: (v: string) => void,
  modalBody: ReactNode,
  setModalBody: (v: ReactNode) => void,
  isLoading: boolean,
  setLoading: (v: boolean) => void
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
  isLoading: false,
  setLoading: () => {}
}

const AdManagementCtx = createContext(initialState);

export default AdManagementCtx;
