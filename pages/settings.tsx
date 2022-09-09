import type { NextPage } from 'next';
import { ReactNode, useState, useMemo, useEffect, useContext } from 'react'
import Base from '../components/common/base';
import BaseCtx from '../hooks/use-base-content';
import SettingBody from '../components/settings/settings-body'

import BaseModal from '../components/ui/base-modal';
import useApi from '../hooks/use-api';
import BaseTip from '../components/ui/base-tip';
import BaseLoading from '../components/ui/base-loading';

import { SEO } from '../config';
import { polkadot_network } from '../config/constant';

const Settings: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()


  const [tipType, setTipType] = useState<'Success' | 'Error'>('Success')
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tipText, setTipText] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const { api } = useApi(polkadot_network)

  return (
    <BaseCtx.Provider value={{ showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, showTip, setShowTip, tipType, setTipType, tipText, setTipText, isLoading, setLoading }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowSide
        page='settings'
      >
        <SettingBody />
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

export default Settings
