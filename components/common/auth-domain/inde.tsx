import { FC, useState, useContext, useMemo } from "react";
import { useRouter } from 'next/router'
import * as C from '../../../utils'
import BaseCtx from "../../../hooks/use-base-content";
import axios from "axios";
import TipSvg from "../../svg/tip";
import BaseCheckBox from "../../ui/base-check-box";
import BaseButton from "../../ui/base-button";

import styles from './index.module.scss';

type Prop = {
  handleShowWallet: () => void
}

const AuthDomain: FC<Prop> = ({ handleShowWallet }) => {

  const [isAgree, setAgree] = useState<boolean>(false)

  return (
    <div className={styles.authDomainBody}>
      <div className={styles.domainWrp}>
        <div className={styles.tip}>
          <TipSvg
            handlerOpenTip={() => { }}
            size={24}
            color='#6E879B'
          />
          <div className={styles.right}>
            <div className={styles.tipTitle}>By clicking Agree, you agree to our collection and storage of your browsing history for the following Web3 domains</div>
            <div className={styles.dec}>
              You can change it, or exclude certain domains at any time in <i>Settings</i>
            </div>
            <div className={styles.dec}>
              Source of AdMeta Web3 domain list can be found here <i>here</i>
            </div>
            <ul className={styles.list}>
              <li>uniswip</li>
              <li>Sushiswap(sushi.com) </li>
              <li>Sushiswap(sushi.com) </li>
              <li>Sushiswap(sushi.com) </li>
              <li>Sushiswap(sushi.com) </li>
              <li>Sushiswap(sushi.com) </li>
              <li>Sushiswap(sushi.com) </li>
              <li>Sushiswap(sushi.com) </li>
              <li>Sushiswap(sushi.com) </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.checkWrp}>
        <BaseCheckBox
          handleCheck={() => {
            setAgree(!isAgree)
          }}
          label=''
        />
        <div className={styles.checkLabel}>I agree to allow AdMeta to anonymously store my usage data of above websites for AdMeta advertising matching purpose only. </div>
      </div>

      <BaseButton
        btnClick={() => {
          if (!isAgree) {
            return
          }
          handleShowWallet()
        }}
        btnText='Agree'
        disable={!isAgree}
      />
    </div>
  )
}

export default AuthDomain;