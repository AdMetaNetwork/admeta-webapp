import { FC } from "react";
import LogoSvg from '../svg/logo';
import PoldadotIcon from '../svg/polkadot-icon';
import CircleSvg from '../svg/circle'
import CloudSvg from '../svg/cloud';

import styles from './index.module.scss';


const HomeBody: FC = () => {
  return (
    <div className={styles.homeBody}>
      <div className={styles.wrp}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <LogoSvg />
            <div>AdMeta</div>
          </div>
          <div className={styles.slogan}>
            <div>Trustworthy</div>
            <div>Innovative</div>
            <div>Humanistic</div>
          </div>
          <div className={styles.dec}>A creative advertising agency that lead and inspire</div>
          <div className={styles.btn}>
            <PoldadotIcon />
            <p>Connect with Polkadot.js</p>
          </div>
        </div>
        <div className={styles.right}>
          <CircleSvg />
        </div>
      </div>
      <div className={styles.clude}>
        <CloudSvg />
      </div>
    </div>
  )
}

export default HomeBody;