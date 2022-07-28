import { FC } from "react";
import Image from "next/image";

import styles from './index.module.scss';
import BaseButton from "../ui/base-button";

const AdDisplayBody: FC = () => {

  const normalDom = () => (
    <div className={styles.normal}>
      <div className={styles.normalBody}>
        {/* <div className={styles.normalImg}>
          <Image
            src={'https://fenglin-1256754106.cos.ap-nanjing.myqcloud.com/bike7.2/IMG_8355.JPG'}
            alt="ss"
            width={460}
            height={259}
            objectFit={'cover'}
          ></Image>
        </div> */}
        <div className={styles.emptyImg}></div>
        <div className={styles.normalTitle}>Web/project name</div>
        <div className={styles.normalDec}>Ad description Lörem ipsum lygisk diar nidobelt vengar, ett treskapet. Vess resade duligt cynpod. Parkera bussen rearad hädolurar för sår. Teraliga pogöska lur trakrobelt syl. </div>
        <div className={styles.normalBtn}>
          <BaseButton
            btnClick={() => { }}
            btnText='View ad and claim rewards'
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.adDisplay}>
      {normalDom()}
    </div>
  )
}

export default AdDisplayBody;