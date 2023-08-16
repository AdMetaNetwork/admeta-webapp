import { FC, useState } from "react";
import TipSvg from "../../svg/tip";
import BaseCheckBox from "../../ui/base-check-box";
import BaseButton from "../../ui/base-button";
import * as U from '../../../utils'
import styles from './index.module.scss';

type Props = {
  handleClick: () => void
}

const AuthDomain: FC<Props> = ({ handleClick }) => {

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
              {
                U.WHITE_LIST.products.map((item, index) => (
                  <li key={index}>{item.name}(item.domain) </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.checkWrp}>
        <BaseCheckBox
          handleCheck={() => {
            setAgree(!isAgree)
          }}
          check={isAgree}
          label=''
        />
        <div className={styles.checkLabel}>I agree to allow AdMeta to anonymously store my usage data of above websites for AdMeta advertising matching purpose only. </div>
      </div>
      <BaseButton
        btnText='Connect wallet'
        btnClick={handleClick}
      />
    </div>
  )
}

export default AuthDomain;