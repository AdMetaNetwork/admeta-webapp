import { FC, useState, useContext, useMemo } from "react";
import Image from "next/image";
import SuccessSvg from "../svg/success";
import BaseTip from "../ui/base-tip";
import BaseCtx from "../../hooks/use-base-content";
import { useRouter } from 'next/router'
import useApi from '../../hooks/use-api';
import { polkadot_network } from '../../config/constant';

import styles from './index.module.scss';
import BaseButton from "../ui/base-button";
import CallPolkadot from "../../utils/call-polkadot";

const AdDisplayBody: FC = () => {

  const [isShowM, setShowM] = useState(false)
  const { adMap, setTipText, setTipType, setShowTip } = useContext(BaseCtx)
  const { adimg, adurl, adIdx, adTitle, adCpi = 0, adDisplay } = adMap!
  const router = useRouter()
  const { rd } = router.query

  const { api } = useApi(polkadot_network)
  const _api = useMemo(() => api, [api])

  const handlerClaimReward = async () => {
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      handleShowTip('You should connect wallet first!', 'Error')
      return
    }

    const pk = new CallPolkadot(sender, _api!)
    const f = await pk.getAddressBanlance() as number
    if (f <= 0) {
      handleShowTip('Account balance too low', 'Error')
      return
    }
    pk.claimReward(adIdx).then(() => {
      setShowM(true)
      setTimeout(() => {
        router.replace('/ad-display')
      }, 500)
    })
  }

  const handleShowTip = (tipText: string, tipType: 'Success' | 'Error' = 'Success') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 2000)
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
              <div className={styles.left}>Claim reward for ad</div>
              <div className={styles.right}>{adIdx}</div>
            </div>
            <div className={styles.claimItem}>
              <div className={styles.left}>Reward amount</div>
              <div className={styles.right}>{(adCpi / Math.pow(10, 12)) + ''}</div>
            </div>
            <div className={styles.claimItem}>
              <div className={styles.left}>Estimate transaction fee</div>
              <div className={styles.right}>0</div>
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