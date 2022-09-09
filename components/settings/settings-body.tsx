import { FC, useContext, useEffect, useState } from "react";
import LinkSvg from "../svg/link";
import Warn2Svg from "../svg/warn2";
import ExtSvg from "../svg/ext";
import BaseSwitch from "../ui/base-switch";
import RemoveSvg from "../svg/remove";
import BaseButton from "../ui/base-button";
import BaseCheckBox from "../ui/base-check-box";
import { DataConfig } from '../../utils/type'
import { getConfig } from "../../utils/tools";
import Messager from "../../utils/messager";
import { ADMETA_MSG_DOMAIN, ADMETA_MSG_SWITCH } from '../../config/constant'

import styles from './index.module.scss';

const SettingsBody: FC = () => {

  const [config, setConfig] = useState<DataConfig>({ categories: [], searching_engines: [], products: [] })
  const [checks, setChecks] = useState<boolean[]>([])
  const [disable, setDisable] = useState(false)
  const [openExt, setOpenExt] = useState(false)

  useEffect(() => {
    if (!config.categories.length) {
      getConfig().then((v) => {
        let arr: boolean[] = []
        v.products.forEach((item: any, index: number) => {
          arr[index] = true
        })
        setChecks(arr)
        setConfig(v)
      })
    }
  }, [config])

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
    Messager.sendMessageToContent(ADMETA_MSG_DOMAIN, { domain } )
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
          <div className={styles.domainsBox}>
            <div className={styles.list}>
              {
                config.products.map((item, index) => (
                  <div
                    key={index}
                    className={styles.item}>
                    <BaseCheckBox
                      handleCheck={() => {
                        let arr = [...checks]
                        arr[index] = !arr[index]
                        setChecks(arr)
                        console.log(arr)

                        getChecksDomains(arr)
                      }}
                      label={item.domain}
                      scale={0.7}
                      labelColor='#E6E7F0'
                      labelFontSize="12px"
                      check={checks[index]}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div
          className={styles.disable}
          style={{ marginBottom: disable ? 0 : 40 }}
        >
          <BaseCheckBox
            handleCheck={() => {
              setDisable(!disable)
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
            <div className={styles.sl}>{openExt ? 'Trun off' : 'Trun on'}</div>
            <BaseSwitch
              open={openExt}
              handleSwitch={(p) => {
                setOpenExt(p)
                Messager.sendMessageToContent(ADMETA_MSG_SWITCH, { extStatus: p } )
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