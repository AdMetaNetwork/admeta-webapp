import { FC, useContext, useState, useEffect } from "react";
import LogoTextSvg from "../../svg/logo-text";
import BaseButton from "../../ui/base-button";
import ConnectWallet from "../connect-wallet";
import Link from "next/link";
import Identicon from '@polkadot/react-identicon';
import * as C from '../../../utils'
import BaseCtx from "../../../hooks/use-base-content";
import AuthDomain from "../auth-domain/inde";

import styles from './index.module.scss';

type Prop = {
  page?: string
}

const Header: FC<Prop> = ({ page = 'home' }) => {

  const { setShowModal, setModalTitle, setModalBody, setShowTip, setTipText, setTipType } = useContext(BaseCtx)
  const [selectAddress, setSelectAddress] = useState<string>('')

  useEffect(() => {
    const s = localStorage.getItem('_select_account')
    if (s) {
      setSelectAddress(s)
    }
  }, [selectAddress])

  const handleShowTip = (tipText: string, tipType: 'Success' | 'Error' = 'Success') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 2000)
  }

  const handleShowWalletModal = () => {
    setShowModal!(true)
    setModalTitle!('Connect with Polkadot.js')
    setModalBody!(<ConnectWallet addressList={[]} />)
    C.connectWallet(w => {
      let a: C.AddressMap[] = []
      w.forEach((item) => {
        a.push({
          label: item.meta.name,
          value: item.address
        })
      })
      a.unshift({ label: 'Select', value: 'Select' })
      setModalBody!(<ConnectWallet addressList={a} />)
    })
  }

  const handleShowWallet = () => {
    setModalBody!(<ConnectWallet addressList={[]} />)
    C.connectWallet(w => {
      let a: C.AddressMap[] = []
      w.forEach((item) => {
        a.push({
          label: item.meta.name,
          value: item.address
        })
      })
      a.unshift({ label: 'Select', value: 'Select' })
      setModalBody!(<ConnectWallet addressList={a} />)
    })
  }

  const handleShowDomainModal = () => {
    setShowModal!(true)
    setModalTitle!('Auth domain list')
    setModalBody!(<AuthDomain handleShowWallet={handleShowWallet} />)
  }

  const getPageShowName = (page: string) => {
    switch (page) {
      case 'ad-publish':
        return 'Ad management'
        break;
      case 'dashboard':
        return 'Dashboard'
        break;
      case 'display':
        return 'Ad display'
        break;
      case 'management':
        return 'Ad management'
        break;
      case 'profile':
        return 'Profile'
        break;
      case 'settings':
        return 'Settings'
        break;

      default:
        return ''
        break;
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
          selectAddress
            ?
            <div
              className={styles.accountWrp}
            >
              <div
                className={styles.account}
                onClick={() => handleShowWalletModal()}
              >
                <p>{C.formatAddress(selectAddress)}</p>
              </div>
              <Identicon
                value={selectAddress}
                size={40}
                theme={'polkadot'}
                onCopy={() => {
                  handleShowTip('Copied your address')
                }}
              />
            </div>
            :
            <BaseButton
              btnText="Connect with Polkadot.js"
              btnClick={() => handleShowDomainModal()}
            />
        }
      </div>
    </div>
  )
}

export default Header;