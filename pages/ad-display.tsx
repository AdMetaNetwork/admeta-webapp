import type { NextPage } from 'next';
import { ReactNode, useState, useMemo, useEffect } from 'react'
import Base from '../components/common/base';
import AdDisplayCtx from '../hooks/use-ad-display-content';
import AdDisplayBody from '../components/ad-display/ad-display-body';
import BaseModal from '../components/ui/base-modal';
import useApi from '../hooks/use-api';
import * as C from '../utils'

import { SEO } from '../config';
import { polkadot_network } from '../config/constant';

const AdDisplay: NextPage = () => {
  const [showTip, setShowTip] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [adMap, setAd] = useState<{ adimg: string, adurl: string }>({adimg: '', adurl: ''})

  const { api } = useApi(polkadot_network)

  const tx = useMemo(() => {
    if (!api) return null;

    return api.query.ad;
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }
    tx?.impressionAds
      .entries(sender)
      .subscribe((c: any[]) => {
        const { adimg, adurl } = C.formatAdData(c)
        setAd({ adimg, adurl })
      })
  }, [api, tx]);

  return (
    <AdDisplayCtx.Provider value={{ showTip, setShowTip, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, adMap }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
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
    </AdDisplayCtx.Provider>
  )
}

export default AdDisplay
