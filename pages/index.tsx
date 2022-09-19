import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import HomeBody from '../components/home/home-body';
import BaseCtx from '../hooks/use-base-content';
import BaseModal from '../components/ui/base-modal';
import BaseTip from '../components/ui/base-tip';
import BaseLoading from '../components/ui/base-loading';

import { SEO } from '../config';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  
  const [tipType, setTipType] = useState<'Success' | 'Error'>('Success')
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tipText, setTipText] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  return (
    <BaseCtx.Provider value={{ showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, showTip, setShowTip, tipType, setTipType, tipText, setTipText, setLoading, isLoading }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
      >
        <HomeBody />
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

export default Home
