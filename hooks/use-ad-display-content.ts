
import { createContext, ReactNode } from 'react'

interface HomeData {
  showTip: boolean,
  setShowTip: (v: boolean) => void,
}

export const initialState: HomeData = {
  showTip: false,
  setShowTip: () => {}
}

const AdDisplayCtx = createContext(initialState);

export default AdDisplayCtx;
