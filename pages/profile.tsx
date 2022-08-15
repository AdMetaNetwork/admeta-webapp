import type { NextPage } from 'next';
import { useState, useMemo, useEffect, ReactNode } from 'react'
import Base from '../components/common/base';
import ProfileBody from '../components/profile/profile-body';
import BaseCtx from '../hooks/use-base-content';
import useApi from '../hooks/use-api';
import { polkadot_network } from '../config/constant';
import BaseTip from '../components/ui/base-tip';
import BaseModal from '../components/ui/base-modal';
import BaseLoading from '../components/ui/base-loading';

import { SEO } from '../config';
import CallPolkadot from '../utils/call-polkadot';

const Profile: NextPage = () => {
  const [profile, setProfile] = useState<{ age: string, tag: string, display: boolean }>({ age: '', tag: '', display: false })
  const [tipType, setTipType] = useState<'Success' | 'Error'>('Success')
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tipText, setTipText] = useState<string>('')

  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [isLoading, setLoading] = useState<boolean>(true)

  const { api } = useApi(polkadot_network)
  const _api = useMemo(() => api, [api])

  useEffect(() => {
    if (!api) {
      return;
    }
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }
    const pk = new CallPolkadot(sender, _api!)
    pk.getUserProfile().then((d: any) => {
      setLoading(false)
      if (!d.err) {
        setProfile({ age: d.info.age, tag: d.info.tag, display: d.info.adDisplay })
      } else {
        setProfile({ age: '', tag: '-1', display: false })
      }
    })
  }, [_api, api]);

  return (
    <BaseCtx.Provider value={{ profile, showTip, setShowTip, tipType, setTipType, tipText, setTipText, showModal, setShowModal, modalTitle, setModalTitle, modalBody, setModalBody, isLoading, setLoading }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
        page='profile'
      >
        {profile.age || profile.tag === '-1' ? <ProfileBody /> : null}
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

export default Profile
