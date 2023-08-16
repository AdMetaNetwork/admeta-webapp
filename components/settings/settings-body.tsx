import { FC, useCallback, useEffect, useState, useContext } from "react";
import LinkSvg from "../svg/link";
import Warn2Svg from "../svg/warn2";
import ExtSvg from "../svg/ext";
import BaseSwitch from "../ui/base-switch";
import RemoveSvg from "../svg/remove";
import BaseButton from "../ui/base-button";
import BaseCheckBox from "../ui/base-check-box";
import { DataConfig } from '../../utils/type'
import Messager from "../../utils/messager";
import { ADMETA_MSG_DOMAIN, ADMETA_MSG_SWITCH } from '../../config/constant'
import axios from "axios";
import * as C from '../../config/constant'
import BaseCtx from "../../hooks/use-base-content";
import { useAccount, useNetwork } from "wagmi";
import styles from './index.module.scss';


const SettingsBody: FC = () => {

  const [config, setConfig] = useState<DataConfig>({ categories: [], searching_engines: [], products: [] })
  const [checks, setChecks] = useState<boolean[]>([])
  const [disable, setDisable] = useState(false)
  const [openExt, setOpenExt] = useState(false)
  const [domainList, setDomainLiat] = useState<{ [key: string]: boolean }>({
    "uniswap.org": false,
    "sushi.com": false,
    "decentraland.org": false,
    "nansen.ai": false,
    "opensea.io": false
  })
  const { setLoading } = useContext(BaseCtx)

  const { address, isConnected } = useAccount()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(isConnected)
  }, [isConnected])

  const getUserSetting = useCallback((address: string | undefined) => {
    if (!address) return
    setLoading!(true)
    axios.post(`${C.HTTP_SERVER}admeta/getUserWeb3DomainList`, {
      walletAddress: address
    }).then((e) => {
      setLoading!(false)
      if (e.data) {
        setDomainLiat(obj => ({ ...obj, ...e.data }))
      } else {
        const o = {
          "uniswap.org": false,
          "sushi.com": false,
          "decentraland.org": false,
          "nansen.ai": false,
          "opensea.io": false
        }
        setDomainLiat(obj => ({ ...obj, ...o }))
      }
    })
  }, [setLoading])

  const setUserDomain = useCallback((address: string, domainList: { [key: string]: boolean }) => {
    axios.post(`${C.HTTP_SERVER}admeta/overwriteUserWeb3DomainList`, {
      walletAddress: address,
      newWeb3DomainList: domainList
    })
  }, [])

  useEffect(() => {
    if (connected) {
      getUserSetting(address)
    }
  }, [connected, address, getUserSetting])

  const getChecksDomains = (arr: boolean[]) => {
    let t: string[] = []
    arr.forEach((item, index) => {
      if (item) {
        t.push(config.products[index].domain)
      }
    })
    sendDomainMessageToExt(t)
  }

  const sendDomainMessageToExt = (domain: string[]) => {
    Messager.sendMessageToContent(ADMETA_MSG_DOMAIN, { domain })
  }

  return (
    <div className={styles.settingsBody}>
      <div className={styles.content}>
        <div className={styles.title}>Extension Settings</div>
        <div className={styles.domains}>
          <div className={styles.t}>
            <LinkSvg />
            <div className={styles.l}>Edit My Web3 Domain List</div>
          </div>
          {
            disable
              ?
              null
              :
              <div className={styles.domainsBox}>
                <div className={styles.list}>
                  {
                    Object.keys(domainList).map((key, index) => (
                      <div
                        key={index}
                        className={styles.item}
                      >
                        <BaseCheckBox
                          handleCheck={() => {
                            console.log(domainList[key])
                            const obj = domainList
                            obj[key] = !obj[key]
                            setDomainLiat(o => ({ ...o, ...obj }))
                            setUserDomain(address!, obj)
                          }}
                          label={key}
                          scale={0.7}
                          labelColor='#E6E7F0'
                          labelFontSize="12px"
                          check={domainList[key]}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
          }

        </div>
        <div
          className={styles.disable}
          style={{ marginBottom: disable ? 0 : 40 }}
        >
          <BaseCheckBox
            handleCheck={() => {
              setDisable(!disable)
              let arr: boolean[] = []
              checks.forEach(() => {
                arr.push(false)
              })
              setChecks(arr)
              getChecksDomains(arr)
            }}
            label='Disable all domain trackings'
            scale={0.7}
            labelColor='#E6E7F0'
            labelFontSize="12px"
          />
        </div>
        {
          disable
            ?
            <div className={styles.disableTip}>
              <Warn2Svg />
              <div className={styles.warnTip}>By doing this, you will not receive any record-based ads any more</div>
            </div>
            :
            null
        }

        <div className={styles.bar}>
          <div className={styles.left}>
            <ExtSvg />
            <div className={styles.leftl}>AdMeta Extension</div>
          </div>
          <div className={styles.right}>
            <div className={styles.sl}>{openExt ? 'Trun on' : 'Trun off'}</div>
            <BaseSwitch
              open={openExt}
              handleSwitch={(p) => {
                setOpenExt(p)
                Messager.sendMessageToContent(ADMETA_MSG_SWITCH, { extStatus: p })
              }}
            />
          </div>
        </div>
        <div className={styles.bar}>
          <div className={styles.left}>
            <RemoveSvg />
            <div className={styles.leftl}>Remove all records</div>
          </div>
          <div className="right">
            <BaseButton
              btnClick={() => { }}
              btnText='Remove'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsBody;