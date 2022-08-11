import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import ManagementBody from '../components/management';
import BaseCtx from '../hooks/use-base-content';
import BaseLoading from '../components/ui/base-loading';
import BaseModal from '../components/ui/base-modal';
import BaseTip from '../components/ui/base-tip';

import { SEO } from '../config';

const AdManagement: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [isLoading, setLoading] = useState<boolean>(false)

  const [tipType, setTipType] = useState<'Success' | 'Error'>('Success')
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tipText, setTipText] = useState<string>('')

  return (
    <BaseCtx.Provider value={{ showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, isLoading, setLoading, showTip, setShowTip, tipType, setTipType, tipText, setTipText }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
        page='management'
      >
        <ManagementBody />
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

export default AdManagement
