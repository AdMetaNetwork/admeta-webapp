import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import HomeBody from '../components/home/home-body';
import HomeCtx from '../hooks/use-home-content';
import BaseModal from '../components/ui/base-modal';


import { SEO } from '../config';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  return (
    <HomeCtx.Provider value={{ showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody }}>
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
    </HomeCtx.Provider>
  )
}

export default Home
