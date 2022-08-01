import { FC, useContext, Context, useState, useEffect } from "react";
import Image from "next/image";
import LogoTextSvg from "../../svg/logo-text";
import BaseButton from "../../ui/base-button";
import ConnectWallet from "../connect-wallet";
import Link from "next/link";
import Identicon from '@polkadot/react-identicon';
import * as C from '../../../utils'

import styles from './index.module.scss';

type Prop = {
  content: Context<any>
}

const Header: FC<Prop> = ({ content }) => {

  const { setShowModal, setModalTitle, setModalBody } = useContext(content)
  const [selectAddress, setSelectAddress] = useState<string>('')

  useEffect(() => {
    const s = localStorage.getItem('_select_account')
    if (s) {
      setSelectAddress(s)
    }
  }, [selectAddress])

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href='/'>
          <a href=""><LogoTextSvg /></a>
        </Link>
      </div>
      <div className={styles.right}>
        {
          selectAddress
            ?
            <div className={styles.accountWrp}>
              <div className={styles.account}>
                <p>{C.formatAddress(selectAddress)}</p>
              </div>
              <Identicon
                value={selectAddress}
                size={40}
                theme={'polkadot'}
                onCopy={(e) => {
                  console.log(e)
                }}
              />
            </div>
            :
            <BaseButton
              btnText="Connect with Polkadot.js"
              btnClick={() => {
                setShowModal(true)
                setModalTitle('Connect with Polkadot.js')
                setModalBody(<ConnectWallet addressList={[]} />)
                C.connectWallet(w => {
                  console.log(w)
                  let a: C.AddressMap[] = []
                  w.forEach((item) => {
                    a.push({
                      label: item.meta.name,
                      value: item.address
                    })
                  })
                  a.unshift({ label: 'Select', value: 'Select' })
                  setModalBody(<ConnectWallet addressList={a} />)
                })
              }}
            />
        }


      </div>
    </div>
  )
}

export default Header;