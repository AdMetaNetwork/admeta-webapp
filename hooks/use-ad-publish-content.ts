
import { createContext, ReactNode } from 'react'

interface BaseData {
  showTip: boolean,
  setShowTip: (v: boolean) => void,
  tipType: string,
  setTipType: (v: 'Success' | 'Error') => void,
  tipText: any,
  setTipText: (v: any) => void,
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
  tipType: 'Success',
  setTipType: () => {},
  tipText: 'Success',
  setTipText: () => {},
  showModal: false,
  setShowModal: () => {},
  modalTitle: '',
  setModalTitle: () => {},
  modalBody: '',
  setModalBody: () => {},
  isLoading: false,
  setLoading: () => {}
}

const AdPublishCtx = createContext(initialState);

export default AdPublishCtx;
