import { FC, useState, useContext } from "react";
import PoldadotIcon from '../svg/polkadot-icon';
import CloudSvg from '../svg/cloud';
import HomeCtx from '../../hooks/use-home-content';
import BaseSelect from "../ui/base-select";
import BaseButton from "../ui/base-button";

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

const HomeBody: FC = () => {

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
              setShowModal(true)
              setModalTitle('Connect with Polkadot.js')
              setModalBody(modalBody)
            }}
          >
            <PoldadotIcon />
            <p>Connect with Polkadot.js</p>
          </div>
        </div>
      </div>
      <div className={styles.clude}>
        <CloudSvg />
      </div>
    </div>
  )
}

export default HomeBody;