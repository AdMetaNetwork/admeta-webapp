import { FC, useMemo, useEffect, useState, useContext, useCallback } from "react";
import BaseButton from "../ui/base-button";
import ImgItem from "./img-item";
import PlusSvg from "../svg/plus";
import { useRouter } from 'next/router'
import CallContract from "../../utils/call-contract";
import { useAccount, useNetwork } from "wagmi";
import BaseCtx from "../../hooks/use-base-content";

import styles from './index.module.scss';

const ManagementBody: FC = () => {

  const [list, setList] = useState<any[]>([])
  const {setLoading, setTipText, setShowTip, setTipType} = useContext(BaseCtx)
  const {address} = useAccount()

  const router = useRouter()

  useEffect(() => {
    setLoading!(true)
    if (!address) {
      return
    }

    const c = new CallContract()
    c.init().then(() => {
      c.findAdsByPublisher(address).then((v) => {
        const ads = [];
        for (const ad of v) {
          const adStruct = {
            adUrl: ad[4],
            approve: ad[7],
            title: ad[6]
          };
          ads.push(adStruct);
        }
        setList([...ads])
        if (!ads.length) {
          setList([])
          setLoading!(false)
          return
        }
        setLoading!(false)
      })
    })

  }, [setLoading, address])

  const handleShowTip = (tipText: string, tipType: 'Success' | 'Error') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 2000)
  }

  return (
    <div className={styles.managementBody}>
      <div className={styles.pushBtn}>
        <BaseButton
          btnClick={() => {
            router.push('/ad-publish')
          }}
          btnText='Publish new ad'
          leftIcon={<PlusSvg/>}
        />
      </div>
      <div className={styles.list}>
        <div className={styles.listWrp}>
          {
            list?.map((item, index) => (
              <ImgItem
                key={index}
                img={item.adUrl || "https://storage.fleek.zone/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/AdMeta_Poster.png"}
                badge={item.approve ? 'APPROVED' : 'PENDING'}
                title={item.title}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ManagementBody;
