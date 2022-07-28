
import { createContext, ReactNode } from 'react'

interface HomeData {
  showModal: boolean,
  setShowModal: (v: boolean) => void,
  modalTitle: string,
  setModalTitle: (v: string) => void,
  modalBody: ReactNode,
  setModalBody: (v: ReactNode) => void
}

export const initialState: HomeData = {
  showModal: false,
  setShowModal: () => {},
  modalTitle: '',
  setModalTitle: () => {},
  modalBody: '',
  setModalBody: () => {}
}

const HomeCtx = createContext(initialState);

export default HomeCtx;
