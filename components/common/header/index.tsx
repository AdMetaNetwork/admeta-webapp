import { FC } from "react";
import Image from "next/image";
import BaseButton from "../../ui/base-button";

import styles from './index.module.scss';


const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.top}>Explore</div>
        <div className={styles.bottom}>AdMeta</div>
      </div>
      <div className={styles.right}>
        <BaseButton 
          btnText="Connect with Polkadot.js"
          btnClick={() => {
            console.log(999)
          }}
        />
        {/* <div className={styles.accountWrp}>
          <div className={styles.account}>
            <p>14nuyNGvua55...</p>
          </div>
          <Image
            className={styles.img}
            width={40}
            height={40}
            src={'https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/touxiang.jpeg'}
            alt='account avator'
          />
        </div> */}
      </div>
    </div>
  )
}

export default Header;