import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import PublishBody from '../components/publish';
import AdPublishCtx from '../hooks/use-ad-publish-content';
import BaseTip from '../components/ui/base-tip';
import BaseLoading from '../components/ui/base-loading';

import { SEO } from '../config';

const AdPublish: NextPage = () => {
  const [tipType, setTipType] = useState<'Success' | 'Error'>('Success')
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tipText, setTipText] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [isLoading, setLoading] = useState<boolean>(false)

  return (
    <AdPublishCtx.Provider value={{ showTip, setShowTip, tipType, setTipType, tipText, setTipText, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, isLoading, setLoading }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
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
      {
        isLoading
        &&
        <BaseLoading />
      }

    </AdPublishCtx.Provider >
  )
}

export default AdPublish
