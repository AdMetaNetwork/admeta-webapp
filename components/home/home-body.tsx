import { FC, useCallback, useContext, useEffect, useMemo } from "react";
import BaseCtx from "../../hooks/use-base-content";
import SelectWallet from "../common/select-wallet";
import { useRouter } from "next/router";
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks'
import AuthDomain from "../common/auth-domain/inde";
import * as C from '../../config/constant'

import styles from './index.module.scss';

const HomeBody: FC = () => {

  const { setShowModal, setModalTitle, setModalBody, setShowTip, setTipText, setTipType } = useContext(BaseCtx)
  const router = useRouter()
  const { address, error } = useWeb3();
  const { switchNetwork } = useSwitchNetwork()

  const handleShowWallet = () => {
    setModalTitle!('Connect wallet')
    setModalBody!(<SelectWallet />)
  }

  const handleShowDomainModal = () => {
    setShowModal!(true)
    setModalTitle!('Auth domain list')
    setModalBody!(<AuthDomain handleShowWallet={handleShowWallet} />)
  }

  const handleShowTip = useCallback((tipText: string, tipType: 'Success' | 'Error' = 'Success') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 3000)
  }, [setTipText, setTipType, setShowTip])

  useEffect(() => {
    if (error?.message === 'The user rejected the request.') {
      handleShowTip('You rejected the request', 'Error')
    }
  }, [handleShowTip, error?.message])

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
              if (address) {
                router.push('/dashboard')
              } else {
                if (error) {
                  switchNetwork(C.DEFAULT_CHAIN_ID)
                } else {
                  handleShowDomainModal()
                }
              }
            }}
          >
            <p>{address ? 'Go Dashboard' : error ? 'Error Network' : 'Connect wallet'}</p>
          </div>
        </div>
      </div>
      <div className={styles.clude}>
      </div>
    </div>
  )
}

export default HomeBody;