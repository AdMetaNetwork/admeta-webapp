import { FC, useState, useContext, useMemo } from "react";
import BaseSelect from "../../ui/base-select";
import BaseButton from "../../ui/base-button";
import { useRouter } from 'next/router'
import * as C from '../../../utils'
import BaseCtx from "../../../hooks/use-base-content";
import axios from "axios";
import { HTTP_SERVER, ADMETA_MSG_ACCOUNT } from "../../../config/constant";

import styles from './index.module.scss';

type Prop = {
  addressList: C.AddressMap[]
}

const ConnectWallet: FC<Prop> = ({ addressList }) => {
  const router = useRouter()
  const [selectAddress, setSelectAddress] = useState<string>('')
  const { setShowTip, setTipText, setTipType, setLoading } = useContext(BaseCtx)

  const handleShowTip = (tipText: string, tipType: 'Success' | 'Error' = 'Success') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 2000)
  }

  const addUser = (walletAddress: string) => {
    axios.post(`${HTTP_SERVER}admeta/addUser`, {
      walletAddress
    }).then(() => {
      setLoading!(false)
      if (router.pathname === '/') {
        router.push('/dashboard')
      } else {
        router.reload();
      }
    })
  }

  const checkUser = (walletAddress: string) => {
    axios.post(`${HTTP_SERVER}admeta/getUser`, {
      walletAddress
    }).then((v) => {
      if (!v.data) {
        addUser(walletAddress)
      } else {
        setLoading!(false)
        if (router.pathname === '/') {
          router.push('/dashboard')
        } else {
          router.reload();
        }
      }
    }).catch((err) => {
      console.error(err)

    })
  }

  return (
    <div className={styles.modalBody}>
      <div
        className={styles.modalBodytitle}
      >Select your account in Polkadot.js</div>
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
          setLoading!(true)
          checkUser(selectAddress)
        }}
      />
    </div>
  )
}

export default ConnectWallet;