import { FC, useState, useContext } from "react";
import PoldadotIcon from '../svg/polkadot-icon';
import HomeCtx from '../../hooks/use-home-content';
import ConnectWallet from "../common/connect-wallet";

import styles from './index.module.scss';

const HomeBody: FC = () => {

  const { setShowModal, setModalTitle, setModalBody } = useContext(HomeCtx)

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
              setModalBody(<ConnectWallet />)
            }}
          >
            <PoldadotIcon />
            <p>Connect with Polkadot.js</p>
          </div>
        </div>
      </div>
      <div className={styles.clude}>
      </div>
    </div>
  )
}

export default HomeBody;