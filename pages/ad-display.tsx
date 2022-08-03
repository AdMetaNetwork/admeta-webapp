import type { NextPage } from 'next';
import { ReactNode, useState, useMemo, useEffect } from 'react'
import Base from '../components/common/base';
import AdDisplayCtx from '../hooks/use-ad-display-content';
import AdDisplayBody from '../components/ad-display/ad-display-body';
import BaseModal from '../components/ui/base-modal';
import useApi from '../hooks/use-api';
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { SEO } from '../config';
import { polkadot_network } from '../config/constant';
import { hexToString } from '@polkadot/util'
import CallPolkadot from '../utils/call-polkadot';

const AdDisplay: NextPage = () => {
  const [showTip, setShowTip] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [adMap, setAd] = useState<{ adimg: string, adurl: string, adIdx: number, adTitle: string, adDec: string, adDisplay: boolean }>({ adimg: '', adurl: '', adIdx: 0, adTitle: '', adDec: '', adDisplay: false })
  const [isSpin, setSpin] = useState(true)

  const { api } = useApi(polkadot_network)

  useEffect(() => {
    if (!api) {
      return;
    }
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }

    const pk = new CallPolkadot(sender, api)
    pk.getUserProfile().then((d: any) => {
      if (d.err) {
        setSpin(false)
        setAd({
          adimg: '',
          adurl: '',
          adIdx: 0,
          adTitle: 'set your profile',
          adDec: 'set your profile and show ad',
          adDisplay: false
        })
        return
      }

      if (d.info.matchedAds.length) {
        const idx = d.info.matchedAds[0]
        pk.getUserAd(idx).then((v: any) => {
          console.log(v, '000--->>>>>')
          if (d.info.adDisplay) {
            setAd({
              adimg: hexToString(v.info.metadata),
              adurl: hexToString(v.info.target),
              adIdx: idx,
              adTitle: 'AD Name',
              adDec: 'here is your ad',
              adDisplay: d.info.adDisplay
            })
          } else {
            setAd({
              adimg: hexToString(v.info.metadata),
              adurl: hexToString(v.info.target),
              adIdx: idx,
              adTitle: 'AD Name',
              adDec: 'set your profile ad display open',
              adDisplay: d.info.adDisplay
            })
          }
          setSpin(false)
        })

      } else {
        setSpin(false)
        setAd({
          adimg: '',
          adurl: '',
          adIdx: 0,
          adTitle: 'set your profile',
          adDec: 'set your profile and show ad',
          adDisplay: d.info.adDisplay
        })
      }
    })
  }, [api]);

  const loadingDom = () => (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '60px 0' }}
    >
      <Spin
        size='large'
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
    </div>
  )

  return (
    <AdDisplayCtx.Provider value={{ showTip, setShowTip, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, adMap }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
        page='display'
      >
        {
          isSpin
            ?
            loadingDom()
            :
            <AdDisplayBody />
        }
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
    </AdDisplayCtx.Provider>
  )
}

export default AdDisplay
