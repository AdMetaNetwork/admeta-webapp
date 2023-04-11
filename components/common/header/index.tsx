import { FC, useContext, useEffect, useCallback, useMemo } from "react";
import LogoTextSvg from "../../svg/logo-text";
import BaseButton from "../../ui/base-button";
import Link from "next/link";
import * as T from '../../../utils'
import BaseCtx from "../../../hooks/use-base-content";
import AuthDomain from "../auth-domain/inde";
import SelectWallet from '../select-wallet'
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks'
import Jazzicon from 'react-jazzicon'
import * as C from '../../../config/constant'

import styles from './index.module.scss';

type Prop = {
  page?: string
}

const Header: FC<Prop> = ({ page = 'home' }) => {

  const { setShowModal, setModalTitle, setModalBody, setShowTip, setTipText, setTipType } = useContext(BaseCtx)
  const { address, chainId, error } = useWeb3();
  const { switchNetwork } = useSwitchNetwork();

  const handleShowWallet = () => {
    setModalTitle!('Connect wallet')
    setModalBody!(<SelectWallet />)
  }

  const handleShowDomainModal = () => {
    setShowModal!(true)
    setModalTitle!('Auth domain list')
    setModalBody!(<AuthDomain handleShowWallet={handleShowWallet} />)
  }

  const generateAvator = useMemo(() => {
    return address && <Jazzicon diameter={40} seed={Math.round(Math.random() * 10000000)} />
  }, [address])

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

  const getPageShowName = (page: string) => {
    switch (page) {
      case 'ad-publish':
        return 'Ad management'
      case 'dashboard':
        return 'Dashboard'
      case 'display':
        return 'Ad display'
      case 'management':
        return 'Ad management'
      case 'profile':
        return 'Profile'
      case 'settings':
        return 'Settings'

      default:
        return ''
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {
          page === 'home'
            ?
            <Link href='/'>
              <a href=""><LogoTextSvg /></a>
            </Link>
            :
            <div className={styles.pageName}>
              {getPageShowName(page)}
            </div>
        }
      </div>
      <div className={styles.right}>
        {
          chainId
          &&
          <div className={styles.accountWrp}>
            <div className={styles.account}>
              <p>{C.DEFAULT_CHAIN[chainId].chainName}</p>
            </div>
          </div>
        }
        {
          address
            ?
            <div className={styles.accountWrp}>
              <div className={styles.account}>
                <p>{T.formatAddress(address)}</p>
              </div>
              {generateAvator}
            </div>
            :
            error
              ?
              <BaseButton
                btnText='Error Network'
                btnClick={() => switchNetwork(C.DEFAULT_CHAIN_ID)}
              />
              :
              <BaseButton
                btnText='Connect wallet'
                btnClick={() => handleShowDomainModal()}
              />
        }
      </div>
    </div>
  )
}

export default Header;
