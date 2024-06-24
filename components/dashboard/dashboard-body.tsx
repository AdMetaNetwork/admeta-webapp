import { FC, useContext, useEffect, useState, useCallback } from "react";
import DataFileSvg from "../svg/data-file";
import UnitSvg from "../svg/unit";
import BadgeEmptySvg from "../svg/badge-empty";
import axios from "axios";
import * as C from "../../config/constant";
import BaseCtx from "../../hooks/use-base-content";
import { DataConfig } from '../../utils/type'
import { calculationSingleLevel, getConfig } from "../../utils/tools";
import Messager from "../../utils/messager";
import * as T from '../../utils'
import { useAccount } from "wagmi";
import { useRouter } from 'next/router'
import { BigNumber } from "ethers";

import styles from './index.module.scss';
import BaseButton from "../ui/base-button";
import CallContract from "../../utils/call-contract";

const DashboardBody: FC = () => {

  const { setLoading } = useContext(BaseCtx)
  const router = useRouter()
  const { address, isConnected } = useAccount()

  const [dashboard, setDashboard] = useState<Record<string, any>>({})
  const [config, setConfig] = useState<DataConfig>({ categories: [], searching_engines: [], products: [] })
  const [score, setScore] = useState<any>()

  const randomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const [task] = useState<number>(randomRange(1, 50))

  const getUserScore = useCallback(() => {
    axios.post(`${C.HTTP_SERVER}admeta/getUserTagScore`, {
      walletAddress: address
    }).then((v) => {
      setScore(v.data)
      console.log(v.data)
    }).catch((err) => {
      console.error(err)
    })
  }, [address])

  const getUserDashboard = useCallback(() => {
    axios.post(`${C.HTTP_SERVER}admeta/getUser`, {
      walletAddress: address
    }).then((v) => {
      setDashboard(v.data)
      setLoading!(false)
      // send message to extension
      Messager.sendMessageToContent(C.ADMETA_MSG_ACCOUNT, { account: address, balance: v.data.unclaimedRewards || 0 })
      getUserScore()
    }).catch((err) => {
      console.error(err)
      setLoading!(false)
    })
  }, [address, getUserScore, setLoading])

  const addUser = useCallback((walletAddress: string) => {
    axios.post(`${C.HTTP_SERVER}admeta/addUser`, {
      walletAddress
    }).then(() => {
      setLoading!(false)
      getConfig().then((v) => {
        setConfig(v)
      })
      getUserDashboard()
    })
  }, [setLoading, getUserDashboard])

  const checkUser = useCallback((walletAddress: string | undefined) => {
    if (!walletAddress) return
    axios.post(`${C.HTTP_SERVER}admeta/getUser`, {
      walletAddress
    }).then((v) => {
      if (!v.data) {
        addUser(walletAddress)
      } else {
        setLoading!(false)
        getConfig().then((v) => {
          setConfig(v)
        })
        setDashboard(v.data)
        setLoading!(false)
        // send message to extension
        Messager.sendMessageToContent(C.ADMETA_MSG_ACCOUNT, { account: address, balance: v.data.unclaimedRewards || 0 })
        getUserScore()
      }
    }).catch((err) => {
      console.error(err)

    })
  }, [setLoading, addUser, address, getUserScore])

  // useEffect(() => {
  //   if (isConnected) {
  //     checkUser(address)
  //   } else {
  //     router.replace('/')
  //   }
  // }, [address, isConnected, checkUser, router])

  const syncData = async () => {
    let score = localStorage.getItem('sync_data')
    if (!score) {
      score = JSON.stringify({
        DeFi: 0,
        GameFi: 0,
        NFT: 0,
        Metaverse: 0,
        OnChainData: 0,
        DID: 0,
        AI: 0
      })
    }
    console.log(JSON.parse(score))
    const c = new CallContract()
    setScore(JSON.parse(score))
    try {
      await c.init()
    } catch (err: any) {
      console.log(err.message, 'Error')
    }
    try {
      const r = await c.getUserLevel(address!)
      console.log(r, '00099')
      const o = JSON.parse(r[3])
      if (!score) return
      const s = JSON.parse(score)
      Object.keys(o).map((key) => {
        o[key] += s[key]
      })

      setScore(o)

      const level = BigNumber.from(0)
      const allScore = BigNumber.from(0)
      const categoryScore = JSON.stringify(o)
      console.log(level, allScore, categoryScore)
      c.setUserLevel(level, allScore, categoryScore, address!).then()
      localStorage.removeItem('sync_data')
    } catch (error) {
      const level = BigNumber.from(0)
      const allScore = BigNumber.from(0)
      const categoryScore = score
      console.log(level, allScore, categoryScore)
      c.setUserLevel(level, allScore, categoryScore, address!).then()
    }

  }

  const clearData = async () => {
    const c = new CallContract()
    try {
      await c.init()
      const level = BigNumber.from(0)
      const allScore = BigNumber.from(0)
      const categoryScore = JSON.stringify({
        DeFi: 0,
        GameFi: 0,
        NFT: 0,
        Metaverse: 0,
        OnChainData: 0,
        DID: 0,
        AI: 0
      })
      console.log(level, allScore, categoryScore)
      c.setUserLevel(level, allScore, categoryScore, address!).then()
      setScore({
        DeFi: 0,
        GameFi: 0,
        NFT: 0,
        Metaverse: 0,
        OnChainData: 0,
        DID: 0,
        AI: 0
      })
    } catch (err: any) {
      console.log(err.message, 'Error')
    }
  }

  const step = (index: number, arr: number[]) => {
    if (index === 0) {
      return [0, 100]
    }
    let s = parseInt(((arr[index] - arr[index - 1]) / arr[index] * 100) + '')
    let e = 100 - s
    return [s, e]
  }

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
        <div className="flex">
          <div className={styles.t}>Current Web3 score:</div>
          <div className="w-2"></div>
          <BaseButton
            btnClick={syncData}
            btnText="Sync On Chain Data"
          />
          <div className="w-2"></div>
          <BaseButton
            btnClick={clearData}
            btnText="Clear On Chain Data"
            color="red"
          />
        </div>
        {
          score
          &&
          Object.keys(score)?.map((key, index) => (
            <div
              className={styles.recordItem}
              key={index}
            >
              <div className={styles.icon}></div>
              <div className={styles.score}>{key} Score</div>
              <div className={styles.number}>{score[key]}</div>
              <div className={styles.level}>Lv.{calculationSingleLevel(score[key])}</div>
              <div className={styles.progress}>
                <div className={styles.s} style={{ width: `${step(calculationSingleLevel(score[key]), C.SCORE_LEVEL)[0]}%` }}></div>
                <div className={styles.e} style={{ width: `${step(calculationSingleLevel(score[key]), C.SCORE_LEVEL)[1]}%` }}></div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DashboardBody;