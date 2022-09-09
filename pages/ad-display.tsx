import type { NextPage } from 'next';
import { ReactNode, useState, useMemo, useEffect, useContext } from 'react'
import Base from '../components/common/base';
import BaseCtx from '../hooks/use-base-content';
import AdDisplayBody from '../components/ad-display/ad-display-body';
import BaseModal from '../components/ui/base-modal';
import useApi from '../hooks/use-api';
import BaseTip from '../components/ui/base-tip';
import BaseLoading from '../components/ui/base-loading';


import { SEO } from '../config';
import { polkadot_network } from '../config/constant';
import { hexToString } from '@polkadot/util'
import CallPolkadot from '../utils/call-polkadot';

const AdDisplay: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [adMap, setAd] = useState<{ adimg: string, adurl: string, adIdx: number, adTitle: string, adDec: string, adDisplay: boolean, adCpi: number }>({ adimg: '', adurl: '', adIdx: 0, adTitle: '', adDec: '', adDisplay: false, adCpi: 0 })


  const [tipType, setTipType] = useState<'Success' | 'Error'>('Success')
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tipText, setTipText] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(true)

  const { api } = useApi(polkadot_network)

  const _api = useMemo(() => api, [api])

  useEffect(() => {
    if (!_api) {
      return;
    }
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }

    const pk = new CallPolkadot(sender, _api!)
    pk.getUserProfile().then((d: any) => {
      if (d.err) {
        setLoading!(false)
        setAd({
          adimg: '',
          adurl: '',
          adIdx: 0,
          adTitle: 'set your profile',
          adDec: 'set your profile and show ad',
          adDisplay: false,
          adCpi: 0,
        })
        return
      }

      if (d.info.matchedAds.length) {
        const idx = d.info.matchedAds[0][1]
        const uper = d.info.matchedAds[0][0]
        pk.getUserAd(uper, idx).then((v: any) => {
          if (d.info.adDisplay) {
            setAd({
              adimg: hexToString(v.info.metadata),
              adurl: hexToString(v.info.target),
              adIdx: idx,
              adTitle: hexToString(v.info.title),
              adDec: 'here is your ad',
              adDisplay: d.info.adDisplay,
              adCpi: v.info.cpi
            })
          } else {
            setAd({
              adimg: hexToString(v.info.metadata),
              adurl: hexToString(v.info.target),
              adIdx: idx,
              adTitle: hexToString(v.info.title),
              adDec: 'set your profile ad display open',
              adDisplay: d.info.adDisplay,
              adCpi: v.info.cpi
            })
          }
          setLoading!(false)
        })

      } else {
        setLoading!(false)
        setAd({
          adimg: '',
          adurl: '',
          adIdx: 0,
          adTitle: 'set your profile',
          adDec: 'set your profile and show ad',
          adDisplay: false,
          adCpi: 0
        })
      }
    })
  }, [_api, setLoading]);

  return (
    <BaseCtx.Provider value={{ showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, adMap, showTip, setShowTip, tipType, setTipType, tipText, setTipText, isLoading, setLoading }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowSide
        page='display'
      >
        <AdDisplayBody />
      </Base>
      <BaseModal
        title={modalTitle}
        isShowModal={showModal}
        handleColose={() => {
          setShowModal(false)
        }}
      >
        {modalBody}
      </BaseModal>
      <BaseTip
        type={tipType}
        isShowTip={showTip}
        handleColose={() => {
          setShowTip(false)
        }}
      >
        <div>{tipText}</div>
      </BaseTip>
      {
        isLoading
        &&
        <BaseLoading />
      }
    </BaseCtx.Provider>
  )
}

export default AdDisplay
