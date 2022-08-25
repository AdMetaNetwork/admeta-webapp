import { FC, useContext, useEffect, useState } from "react";
import PoldadotIcon from '../svg/polkadot-icon';
import BaseCtx from "../../hooks/use-base-content";
import ConnectWallet from "../common/connect-wallet";
import * as C from '../../utils'
import { useRouter } from "next/router";
import browser from 'webextension-polyfill'

import styles from './index.module.scss';

const HomeBody: FC = () => {

  const { setShowModal, setModalTitle, setModalBody } = useContext(BaseCtx)
  const [isConnect, setConnect] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const sender = localStorage.getItem('_select_account')
    if (sender) {
      setConnect(true)
    } else {
      setConnect(false)
    }
  }, [])

  return (
    <div className={styles.homeBody}>
      <div className={styles.wrp}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <div>ADMETA ADS</div>
          </div>
          <div className={styles.slogan}>
            <div
              onClick={() => {
                // The ID of the extension we want to talk to.
                var editorExtensionId = "gldfcokcakpdonomfeimbegiojoledgj";
                console.log('start')
                // // Make a simple request:
                browser.runtime.sendMessage(editorExtensionId, { openUrlInEditor: 'xxssss-msg' })
              }}
            >Trustworthy</div>
            <div>Innovative</div>
            <div>Humanistic</div>
          </div>
          <div className={styles.dec}>A creative advertising agency that lead and inspire</div>
          <div
            className={styles.btn}
            onClick={() => {
              if (isConnect) {
                router.push('/ad-display')
              } else {
                setShowModal!(true)
                setModalTitle!('Connect with Polkadot.js')
                setModalBody!(<ConnectWallet addressList={[]} />)
                C.connectWallet(w => {
                  let a: C.AddressMap[] = []
                  w.forEach((item) => {
                    a.push({
                      label: item.meta.name,
                      value: item.address
                    })
                  })
                  a.unshift({ label: 'Select', value: 'Select' })
                  setModalBody!(<ConnectWallet addressList={a} />)
                })
              }
            }}
          >
            {!isConnect && <PoldadotIcon />}
            <p>{isConnect ? 'Go Ad display' : 'Connect with Polkadot.js'}</p>
          </div>
        </div>
      </div>
      <div className={styles.clude}>
      </div>
    </div>
  )
}

export default HomeBody;