import { FC, useState, useContext, useMemo } from "react";
import BaseSelect from "../../ui/base-select";
import BaseButton from "../../ui/base-button";
import { useRouter } from 'next/router'
import * as C from '../../../utils'
import BaseCtx from "../../../hooks/use-base-content";
import useApi from '../../../hooks/use-api';

import styles from './index.module.scss';

type Prop = {
  addressList: C.AddressMap[]
}

const ConnectWallet: FC<Prop> = ({ addressList }) => {
  const router = useRouter()
  const [selectAddress, setSelectAddress] = useState<string>('')
  const { setShowTip, setTipText, setTipType } = useContext(BaseCtx)

  const handleShowTip = (tipText: string, tipType: 'Success' | 'Error' = 'Success') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 2000)
  }

  return (
    <div className={styles.modalBody}>
      <div className={styles.modalBodytitle}>Select your account in Polkadot.js</div>
      <div className={styles.modalBodySelect}>
        <BaseSelect
          handleChangeSelect={(v) => {
            setSelectAddress(v)
          }}
          opt={addressList}
        />
      </div>
      <BaseButton
        btnText="Sign in"
        btnClick={async () => {
          if (!selectAddress || selectAddress === 'Select') {
            handleShowTip('Please select a address', 'Error')
            return
          }
          C.selectWallet(selectAddress)

          if (router.pathname === '/') {
            router.push('/dashboard')
          } else {
            router.reload();
          }
        }}
      />
    </div>
  )
}

export default ConnectWallet;