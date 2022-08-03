import { FC, useState, useContext } from "react";
import Image from "next/image";
import SuccessSvg from "../svg/success";
import BaseTip from "../ui/base-tip";
import AdDisplayCtx from "../../hooks/use-ad-display-content";
import { useRouter } from 'next/router'
import useApi from '../../hooks/use-api';
import { polkadot_network } from '../../config/constant';

import styles from './index.module.scss';
import BaseButton from "../ui/base-button";
import CallPolkadot from "../../utils/call-polkadot";
import { message } from 'antd'

const AdDisplayBody: FC = () => {

  const [isShowM, setShowM] = useState(false)
  const { adMap: { adimg, adurl, adIdx, adTitle, adDec, adDisplay } } = useContext(AdDisplayCtx)
  const router = useRouter()
  const { rd } = router.query

  const { api } = useApi(polkadot_network)

  const handlerClaimReward = async () => {
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }

    const pk = new CallPolkadot(sender, api!)
    const f = await pk.getAddressBanlance() as number
    if (f <= 0) {
      message.info('account balance too low')
      return
    }
    pk.claimReward(adIdx).then(() => {
      setShowM(true)
    })
  }

  const normalDom = () => (
    <div className={styles.normal}>
      <div className={styles.normalBody}>
        {
          adimg && adDisplay
            ?
            <div className={styles.normalImg}>
              <Image
                src={adimg}
                alt="ss"
                width={460}
                height={259}
                objectFit={'cover'}
              ></Image>
            </div>
            :
            <div className={styles.emptyImg}></div>
        }
        <div className={styles.normalTitle}>{adTitle}</div>
        <div className={styles.normalDec}>{adDec}</div>
        {
          adDisplay && adimg
            ?
            <div className={styles.normalBtn}>
              <BaseButton
                btnClick={() => {
                  window.open(adurl)
                }}
                btnText='View ad and claim rewards'
              />
            </div>
            :
            null
        }

      </div>
    </div>
  )

  const claimDom = () => (
    <div className={styles.claim}>
      <div className={styles.claimBody}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Image
              src={adimg}
              alt="ss"
              width={150}
              height={85}
              objectFit={'cover'}
            ></Image>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{adTitle}</div>
            <div className={styles.dec}>{adDec}</div>
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
              <div className={styles.left}>Project name1</div>
              <div className={styles.right}>Web3 projectX</div>
            </div>
            <div className={styles.claimItem}>
              <div className={styles.left}>Project name2</div>
              <div className={styles.right}>Web3 projectX</div>
            </div>
            <div className={styles.claimItem}>
              <div className={styles.left}>Project name3</div>
              <div className={styles.right}>Web3 projectX</div>
            </div>
          </div>
          <BaseButton
            btnClick={() => {
              handlerClaimReward()
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
      {rd ? claimDom() : normalDom()}
    </div>
  )
}

export default AdDisplayBody;