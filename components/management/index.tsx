import { FC, useMemo, useEffect, useState, useContext, useCallback } from "react";
import BaseButton from "../ui/base-button";
import ImgItem from "./img-item";
import PlusSvg from "../svg/plus";
import { useRouter } from 'next/router'
import useApi from '../../hooks/use-api';
import { polkadot_network } from '../../config/constant';
import CallPolkadot from "../../utils/call-polkadot";
import * as T from '../../utils'
import * as C from '../../config/constant'
import BaseCtx from "../../hooks/use-base-content";
import axios from "axios";

import styles from './index.module.scss';

const ManagementBody: FC = () => {

  const [list, setList] = useState<T.AdInfo[]>([])
  const { api } = useApi(polkadot_network)
  const _api = useMemo(() => api, [api])
  const { setLoading } = useContext(BaseCtx)

  const router = useRouter()

  const getUserPublishAd = () => {
    axios.post(`${C.HTTP_SERVER}admeta/getAdvertisements`).then(() => {
      
    })
  }

  useEffect(() => {
    // setLoading!(true)
    if (!_api) {
      return;
    }
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }

    const pk = new CallPolkadot(sender, _api!)
    pk.getUserAds(sender).then((d: any) => {
      
      const list = d.info as T.AdInfo[];
      setList(list)
      if (list) {
        setLoading!(false)
      }
    })

  }, [_api, setLoading])

  return (
    <div className={styles.managementBody}>
      <div className={styles.pushBtn}>
        <BaseButton
          btnClick={() => {
            router.push('/ad-publish')
          }}
          btnText='Publish new ad'
          leftIcon={<PlusSvg />}
        />
      </div>
      <div className={styles.list}>
        <div className={styles.listWrp}>
          {
            list?.map((item, index) => (
              <ImgItem
                key={index}
                img={item.metadata}
                badge={item.approved ? 'APPROVED' : 'PENDING'}
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