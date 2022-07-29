import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import AdDisplayCtx from '../hooks/use-ad-display-content';
import AdDisplayBody from '../components/ad-display/ad-display-body';
import BaseModal from '../components/ui/base-modal';


import { SEO } from '../config';

const AdDisplay: NextPage = () => {
  const [showTip, setShowTip] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  return (
    <AdDisplayCtx.Provider value={{ showTip, setShowTip, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody }}>
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
