import { FC, useState, useContext } from "react";
import BaseSelect from "../../ui/base-select";
import BaseButton from "../../ui/base-button";
import { useRouter } from 'next/router'

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

const ConnectWallet: FC = () => {
  const router = useRouter()

  return (
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
        btnClick={() => {
          router.push('/ad-display')
        }}
      />
    </div>
  )
}

export default ConnectWallet;