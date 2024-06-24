import { FC, useCallback, useContext, useEffect, useState } from "react";
import BaseCtx from "../../hooks/use-base-content";
import SelectWallet from "../common/select-wallet";
import { useRouter } from "next/router";
import { useAccount, useNetwork } from "wagmi";
import AuthDomain from "../common/auth-domain/inde";
import { useModal } from "connectkit";
import * as C from '../../config/constant'

import styles from './index.module.scss';

const HomeBody: FC = () => {

  const { setShowModal, setModalTitle, setModalBody, setShowTip, setTipText, setTipType } = useContext(BaseCtx)
  const router = useRouter()

  const { setOpen } = useModal()

  const { address, isConnected } = useAccount()
  const network = useNetwork()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(isConnected)
  }, [isConnected])

  const handleShowWallet = () => {
    setModalTitle!('Connect wallet')
    setModalBody!(<SelectWallet />)
  }

  const handleShowDomainModal = () => {
    setShowModal!(true)
    setModalTitle!('Auth domain list')
    setModalBody!(<AuthDomain handleClick={() => {
      setOpen(true)
      setShowModal!(false)
    }}/>)
  }

  const handleShowTip = useCallback((tipText: string, tipType: 'Success' | 'Error' = 'Success') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 3000)
  }, [setTipText, setTipType, setShowTip])

  return (
    <div className={styles.homeBody}>
      <div className={styles.wrp}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <div>ADMETA ADS</div>
          </div>
          <div className={styles.slogan}>
            <div>Trustworthy</div>
            <div>Innovative</div>
            <div>Humanistic</div>
          </div>
          <div className={styles.dec}>A creative advertising agency that lead and inspire</div>
          <div
            className={styles.btn}
            onClick={() => {
              if (connected) {
                router.push('/dashboard')
              } else {
                handleShowDomainModal()
              }
            }}
          >
            <p>{connected ? 'Go Dashboard' : 'Connect wallet'}</p>
          </div>
        </div>
      </div>
      <div className={styles.clude}>
      </div>
    </div>
  )
}

export default HomeBody;