import { FC, useState } from "react";
import BackNav from "./back-nav";
import BaseButton from "../ui/base-button";
import BaseSelect from "../ui/base-select";
import BaseInput from "../ui/base-input";
import BaseCheckBox from "../ui/base-check-box";
import BaseTag from "../ui/base-tag";
import BaseModal from "../ui/base-modal";
import BaseTip from "../ui/base-tip";
import Link from "next/link";

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
  const [isShowM, setShowM] = useState(false)
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
          <BaseInput
            handleChangeInput={(v) => {
              console.log(v)
            }}
            placeholder='0.00000000 ETH'
          />
          <BaseCheckBox
            handleCheck={(v) => {
              console.log(v)
            }}
            label='value'
          />
          <BaseTag
            label="NFT"
            tagHeight={20}
            tagWidth={40}
            bgColor='#58BD7D'
            isStroke={false}
          />
          {/* <BaseModal
            title="Connect with Polkadot.js"
            isShowModal={isShowM}
            handleColose={() => {
              setShowM(false)
            }}
          >
            <div>aaa</div>
          </BaseModal> */}
          <BaseTip
            type='Success'
            isShowTip={isShowM}
            handleColose={() => {
              setShowM(false)
            }}
          >
            <div>Your profile has been created, now you can go to  <Link href="/about"><a>Ad Display</a></Link>  to view your customized ads.</div>
          </BaseTip>

        </div>
        <div className={styles.startBtn}>
          <BaseButton
            btnClick={() => {
              setShowM(true)
            }}
            btnText='Get Started'
          />
        </div>
      </div>
    </div>
  )
}

export default SignBody;