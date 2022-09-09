import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import PublishBody from '../components/publish';
import BaseCtx from '../hooks/use-base-content';
import BaseTip from '../components/ui/base-tip';
import BaseLoading from '../components/ui/base-loading';
import BaseModal from '../components/ui/base-modal';

import { SEO } from '../config';

const AdPublish: NextPage = () => {
  const [tipType, setTipType] = useState<'Success' | 'Error'>('Success')
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tipText, setTipText] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [isLoading, setLoading] = useState<boolean>(false)

  return (
    <BaseCtx.Provider value={{ showTip, setShowTip, tipType, setTipType, tipText, setTipText, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, isLoading, setLoading }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowSide
        page='ad-publish'
      >
        <PublishBody />
      </Base>
      <BaseTip
        type={tipType}
        isShowTip={showTip}
        handleColose={() => {
          setShowTip(false)
        }}
      >
        <div>{tipText}</div>
      </BaseTip>
      <BaseModal
        title={modalTitle}
        isShowModal={showModal}
        handleColose={() => {
          setShowModal(false)
        }}
      >
        {modalBody}
      </BaseModal>
      {
        isLoading
        &&
        <BaseLoading />
      }
    </BaseCtx.Provider >
  )
}

export default AdPublish
