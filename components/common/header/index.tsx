import { FC, useContext } from "react";
import Image from "next/image";
import LogoTextSvg from "../../svg/logo-text";
import BaseButton from "../../ui/base-button";
import HomeCtx from '../../../hooks/use-home-content';
import BaseSelect from "../../ui/base-select";

import styles from './index.module.scss';

const opt = [
  {
    value: 'Select',
    label: 'Select'
  },
  {
    value: '14iyG7YpMKhJPbt4qgY26FM5gig6QNsyoFi1936eoL6E5BoA',
    label: 'kmy'
  },
  {
    value: '19KvnKoBTgPYLpRYmTG6Bj3CgZAXim7DcAVhTgZnyJES6xm',
    label: 'kmy2'
  },
  {
    value: '19KvnKoBTgPYLpRYmTG6Bj3CgZAXim7DcAVhTgZnyJES6xm',
    label: 'kmy2'
  },
  {
    value: '19KvnKoBTgPYLpRYmTG6Bj3CgZAXim7DcAVhTgZnyJES6xm',
    label: 'kmy2'
  }
]

const Header: FC = () => {

  const { setShowModal, setModalTitle, setModalBody } = useContext(HomeCtx)

  const modalBody = () => (
    <div className={styles.modalBody}>
      <div className={styles.modalBodytitle}>Select your account in Polkadot.js</div>
      <div className={styles.modalBodySelect}>
        <BaseSelect
          handleChangeSelect={(v) => {
            console.log(v)
          }}
          opt={opt}
        />
      </div>
      <BaseButton
        btnText="Sign in"
        btnClick={() => { }}
      />
    </div>
  )

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <LogoTextSvg />
      </div>
      <div className={styles.right}>
        <BaseButton
          btnText="Connect with Polkadot.js"
          btnClick={() => {
            setShowModal(true)
            setModalTitle('Connect with Polkadot.js')
            setModalBody(modalBody)
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