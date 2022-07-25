import type { NextPage } from 'next';
import Base from '../components/common/base';
import Header from '../components/common/header'
import SideNav from '../components/common/side-nav';
import LogoSvg from '../components/svg/logo';
import PoldadotIcon from '../components/svg/polkadot-icon';
import CircleSvg from '../components/svg/circle'
import CloudSvg from '../components/svg/cloud';
import { SEO } from '../config';
import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <Base
      tdk={{ title: SEO.seo_default_title }}
    >
      <Header />
      {/* <SideNav /> */}

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
    </Base>
  )
}

export default Home
