import { FC, useContext, useEffect, useState } from "react";
import DataFileSvg from "../svg/data-file";
import UnitSvg from "../svg/unit";
import BadgeEmptySvg from "../svg/badge-empty";
import axios from "axios";
import { HTTP_SERVER, ADMETA_MSG_ACCOUNT } from "../../config/constant";
import BaseCtx from "../../hooks/use-base-content";
import { DataConfig } from '../../utils/type'
import { getConfig } from "../../utils/tools";
import Messager from "../../utils/messager";
import * as C from '../../utils'

import { useRouter } from 'next/router'

import styles from './index.module.scss';

const DashboardBody: FC = () => {

  const { setLoading } = useContext(BaseCtx)
  const router = useRouter()

  const [dashboard, setDashboard] = useState<Record<string, any>>({})
  const [config, setConfig] = useState<DataConfig>({ categories: [], searching_engines: [], products: [] })
  const [score, setScore] = useState<C.UserScore>({
    "defi": 0,
    "gamefi": 0,
    "nft": 0,
    "metaverse": 0,
    "onchaindata": 0
  })

  const randomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const [task] = useState<number>(randomRange(1, 50))

  useEffect(() => {
    const sender = localStorage.getItem('_select_account')

    const getUserScore = (sender: string) => {
      if (!sender) {
        router.replace('/')
        return
      }
      axios.post(`${HTTP_SERVER}admeta/getUserTagScore`, {
        walletAddress: sender
      }).then((v) => {
        setScore(v.data)
        console.log(v.data)
      }).catch((err) => {
        console.error(err)
      })
    }

    const getUserDashboard = () => {
      if (!sender) {
        router.replace('/')
        return
      }
      axios.post(`${HTTP_SERVER}admeta/getUser`, {
        walletAddress: sender
      }).then((v) => {
        setDashboard(v.data)
        setLoading!(false)
        // send message to extension
        Messager.sendMessageToContent(ADMETA_MSG_ACCOUNT, { account: sender, balance: v.data.unclaimedRewards || 0 })
        getUserScore(sender)
      }).catch((err) => {
        console.error(err)
        setLoading!(false)
      })
    }

    if (!config.categories.length) {
      getConfig().then((v) => {
        setConfig(v)
      })
    }
    if (!dashboard.walletAddress) {
      getUserDashboard()
    }
  }, [config, dashboard.walletAddress, setLoading, router])

  const getItemLevel = (v: number) => {
    const t = Math.pow(10, v.toString().length - 2)
    const p = v / t + ''
    return parseInt(p, 10)
  }

  return (
    <div className={styles.dashboardBody}>
      <div className={styles.dataList}>
        <div className={styles.dataItem}>
          <div className={styles.top}>
            <DataFileSvg />
            <div className={styles.label}>Total earnings</div>
          </div>
          <div className={styles.mid}>
            <div className={styles.free}>{dashboard.totalEarnedRewards || 0}</div>
            <UnitSvg />
          </div>
          <div className={styles.bot}>
            <div className={styles.usd}>${(dashboard.totalEarnedRewards || 0) * 0.2}</div>
          </div>
        </div>
        <div className={styles.dataItem}>
          <div className={styles.top}>
            <DataFileSvg />
            <div className={styles.label}>Unclaimed rewards</div>
          </div>
          <div className={styles.mid}>
            <div className={styles.free}>{dashboard.unclaimedRewards || 0}</div>
            <UnitSvg />
          </div>
          <div className={styles.bot}>
            <div className={styles.usd}>${(dashboard.unclaimedRewards || 0) * 0.2}</div>
          </div>
        </div>
        <div className={styles.dataItem}>
          <div className={styles.top}>
            <DataFileSvg color="#3772FF" />
            <div className={styles.label}>Completed ad tasks</div>
          </div>
          <div className={styles.mid}>
            <div className={styles.free}>{task}</div>
          </div>
          <div className={styles.bot}>
            <div className={styles.line}>
              <div className={styles.start} style={{ width: `${task}%` }}></div>
              <div className={styles.end} style={{ width: `${100 - task}%` }}></div>
            </div>
          </div>
        </div>
        <div className={styles.dataItem}>
          <div className={styles.top}>
            <DataFileSvg color="#FFA2C0" />
            <div className={styles.label}>Collected NFT badges</div>
          </div>
          <div className={`${styles.mid} ${styles.midS}`}>
            <div className={styles.badge}>
              <BadgeEmptySvg />
              <div className={styles.badgeLabel}>Crypto Trader Beginner xxx</div>
            </div>
            <div className={styles.badge}>
              <BadgeEmptySvg />
              <div className={styles.badgeLabel}>Crypto Trader Beginner  x</div>
            </div>
            <div className={styles.badge}>
              <BadgeEmptySvg />
              <div className={styles.badgeLabel}>Crypto Trader Beginner</div>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.records}>
        <div className={styles.t}>Current Web3 score:</div>
        {
          Object.keys(score).map((key, index) => (
            <div
              className={styles.recordItem}
              key={index}
            >
              <div className={styles.icon}></div>
              <div className={styles.score}>{key} Score</div>
              <div className={styles.number}>{score[key]}</div>
              <div className={styles.level}>Lv.{getItemLevel(score[key]) || 0}</div>
              <div className={styles.progress}>
                <div className={styles.s} style={{ width: `${getItemLevel(score[key])}%` }}></div>
                <div className={styles.e} style={{ width: `${100 - getItemLevel(score[key])}%` }}></div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DashboardBody;