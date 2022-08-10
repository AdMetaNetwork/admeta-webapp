import type { NextPage } from 'next';
import { ReactNode, useState, useMemo, useEffect } from 'react'
import Base from '../components/common/base';
import ManagementBody from '../components/management';
import AdManagementCtx from '../hooks/use-ad-management-content';
import BaseLoading from '../components/ui/base-loading';

import { SEO } from '../config';

const AdManagement: NextPage = () => {
  const [showTip, setShowTip] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [isLoading, setLoading] = useState<boolean>(false)

  return (
    <AdManagementCtx.Provider value={{ showTip, setShowTip, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, isLoading, setLoading }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
        page='management'
      >
        <ManagementBody />
      </Base>
      {
        isLoading
        &&
        <BaseLoading />
      }
    </AdManagementCtx.Provider>
  )
}

export default AdManagement
