import { FC, useContext, useEffect, useCallback, useMemo, useState } from "react";
import LogoTextSvg from "../../svg/logo-text";
import BaseButton from "../../ui/base-button";
import * as T from '../../../utils'
import BaseCtx from "../../../hooks/use-base-content";
import { ChainIcon, ConnectKitButton, useModal } from 'connectkit';
import { useAccount, useNetwork } from "wagmi";
import Jazzicon from 'react-jazzicon'
import { sepolia } from 'wagmi/chains'

import styles from './index.module.scss';
import Messager from "../../../utils/messager";
import { ADMETA_MSG_ACCOUNT } from "../../../config/constant";

type Prop = {
  page?: string
}

const Header: FC<Prop> = ({ page = 'home' }) => {

  const { setShowModal, setModalTitle, setModalBody, setShowTip, setTipText, setTipType } = useContext(BaseCtx)
  const { address, isConnected } = useAccount()
  const network = useNetwork()
  const [connected, setConnected] = useState(false)
  const [chainid, setChainId] = useState<number | undefined>()
  const { setOpen } = useModal()

  useEffect(() => {
    setConnected(isConnected)
  }, [isConnected])

  useEffect(() => {
    setChainId(network.chain?.id)
    if (network.chain?.id === sepolia.id) {
      setOpen(false)
    }
  }, [network.chain?.id, setOpen])

  useEffect(() => {
    if (address) {
      Messager.sendMessageToContent(ADMETA_MSG_ACCOUNT, { account: address, balance: 0 })
    }
  })

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
            <LogoTextSvg />
            :
            <div className={styles.pageName}>
              {getPageShowName(page)}
            </div>
        }
      </div>
      <div className={styles.right}>
        {
          connected
            ?
            chainid === sepolia.id
              ?
              <>
                <div className={styles.accountWrp}>
                  <div className={styles.account}>
                    <ChainIcon size={20} id={network.chain?.id} />
                    <p>{network.chain?.name}</p>
                  </div>
                </div>
                <div className={styles.accountWrp}>
                  <div className={styles.account}>
                    <p>{T.formatAddress(address)}</p>
                  </div>
                  {generateAvator}
                </div>
              </>
              :
              <div className={styles.accountWrp}>
                <div className={styles.account}>
                  <p>Error Network</p>
                </div>
              </div>
            :
            <ConnectKitButton.Custom >
              {({ show }) => {
                return (
                  <BaseButton
                    btnText='Connect wallet'
                    btnClick={() => show!()}
                  />
                );
              }}
            </ConnectKitButton.Custom>
        }
      </div>
    </div>
  )
}

export default Header;
