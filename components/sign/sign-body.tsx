import { FC } from "react";
import BackNav from "./back-nav";
import BaseButton from "../ui/base-button";
import BaseSelect from "../ui/base-select";

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

const SignBody: FC = () => {
  return (
    <div className={styles.signBody}>
      <BackNav
        navText={`< Go back`}
        handleNavClick={() => { }}
      />
      <div className={styles.wrp}>
        <div className={styles.title}>Sign in with Polkadot.js</div>
        <div className={styles.dec}>
          Please connect to <a href="https://polkadot.js.org/extension/" target={'_blank'} rel="noreferrer">Polkadot.js Extension</a> and select the account you want to sign in
        </div>
        <div className={styles.select}>
          <BaseSelect
            handleChangeSelect={(v) => {
              console.log(v)
            }}
            opt={opt}
          />
        </div>
        <div className={styles.startBtn}>
          <BaseButton
            btnClick={() => { }}
            btnText='Get Started'
          />
        </div>
      </div>
    </div>
  )
}

export default SignBody;