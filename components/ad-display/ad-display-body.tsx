import { FC, useState } from "react";
import Image from "next/image";
import SuccessSvg from "../svg/success";
import BaseTip from "../ui/base-tip";

import styles from './index.module.scss';
import BaseButton from "../ui/base-button";

const AdDisplayBody: FC = () => {

  const [isShowM, setShowM] = useState(false)

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

  const claimDom = () => (
    <div className={styles.claim}>
      <div className={styles.claimBody}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Image
              src={'https://fenglin-1256754106.cos.ap-nanjing.myqcloud.com/bike7.2/IMG_8355.JPG'}
              alt="ss"
              width={150}
              height={85}
              objectFit={'cover'}
            ></Image>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>Web/project name</div>
            <div className={styles.dec}>Ad description Lörem ipsum lygisk diar nidobelt vengar, ett treskapet. Vess resade duligt cynpod. Parkera bussen rearad hädolurar för sår. Teraliga pogöska lur trakrobelt syl. </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.icon}>
            <SuccessSvg
              color="#58bd7d"
            />
          </div>
          <div className={styles.statusText}>Task completed</div>
          <div style={{ width: '100%' }}>
            <div className={styles.claimItem}>
              <div className={styles.left}>Project name</div>
              <div className={styles.right}>Web3 projectX</div>
            </div>
            <div className={styles.claimItem}>
              <div className={styles.left}>Project name</div>
              <div className={styles.right}>Web3 projectX</div>
            </div>
            <div className={styles.claimItem}>
              <div className={styles.left}>Project name</div>
              <div className={styles.right}>Web3 projectX</div>
            </div>
          </div>
          <BaseButton
            btnClick={() => {
              setShowM(true)
            }}
            btnText='Claim Rewards'
          />
        </div>
      </div>

    </div>
  )

  return (
    <div className={styles.adDisplay}>
      <BaseTip
        type='Success'
        isShowTip={isShowM}
        handleColose={() => {
          setShowM(false)
        }}
      >
        <div>You has finshed the task, click <strong>Claim Reward</strong>to claim your rewards!</div>
      </BaseTip>
      {claimDom()}
    </div>
  )
}

export default AdDisplayBody;