import type { NextPage } from 'next';
import { ReactNode, useState, useMemo, useEffect } from 'react'
import Base from '../components/common/base';
import PublishBody from '../components/publish';
import AdPublishCtx from '../hooks/use-ad-publish-content';

import { SEO } from '../config';

const AdPublish: NextPage = () => {
  const [showTip, setShowTip] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()

  return (
    <AdPublishCtx.Provider value={{ showTip, setShowTip, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
      >
        <PublishBody />
      </Base>
    </AdPublishCtx.Provider>
  )
}

export default AdPublish
