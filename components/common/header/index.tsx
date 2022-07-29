import { FC, useContext, Context } from "react";
import Image from "next/image";
import LogoTextSvg from "../../svg/logo-text";
import BaseButton from "../../ui/base-button";
import HomeCtx from '../../../hooks/use-home-content';
import AdDisplayCtx from "../../../hooks/use-ad-display-content";
import ConnectWallet from "../connect-wallet";
import Link from "next/link";

import styles from './index.module.scss';

type Prop = {
  content: Context<any>
}

const Header: FC<Prop> = ({ content }) => {

  const { setShowModal, setModalTitle, setModalBody } = useContext(content)

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href='/'>
          <a href=""><LogoTextSvg /></a>
        </Link>
      </div>
      <div className={styles.right}>
        <BaseButton
          btnText="Connect with Polkadot.js"
          btnClick={() => {
            setShowModal(true)
            setModalTitle('Connect with Polkadot.js')
            setModalBody(<ConnectWallet />)
          }}
        />
        {/* <div className={styles.accountWrp}>
          <div className={styles.account}>
            <p>14nuyNGvua55...</p>
          </div>
          <Image
            className={styles.img}
            width={40}
            height={40}
            src={'https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/touxiang.jpeg'}
            alt='account avator'
          />
        </div> */}
      </div>
    </div>
  )
}

export default Header;