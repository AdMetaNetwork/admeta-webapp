import { FC, useState, useContext } from "react";
import BaseSelect from "../../ui/base-select";
import BaseButton from "../../ui/base-button";
import { useRouter } from 'next/router'
import * as C from '../../../utils'

import styles from './index.module.scss';

type Prop = {
  addressList: C.AddressMap[]
}

const ConnectWallet: FC<Prop> = ({ addressList }) => {
  const router = useRouter()
  const [selectAddress, setSelectAddress] = useState<string>('')

  return (
    <div className={styles.modalBody}>
      <div className={styles.modalBodytitle}>Select your account in Polkadot.js</div>
      <div className={styles.modalBodySelect}>
        <BaseSelect
          handleChangeSelect={(v) => {
            console.log(v)
            setSelectAddress(v)
          }}
          opt={addressList}
        />
      </div>
      <BaseButton
        btnText="Sign in"
        btnClick={() => {
          if (!selectAddress || selectAddress === 'Select') {
            return
          }
          C.selectWallet(selectAddress)

          router.push('/ad-display')
        }}
      />
    </div>
  )
}

export default ConnectWallet;