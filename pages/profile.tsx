import type { NextPage } from 'next';
import { useState, useMemo, useEffect } from 'react'
import Base from '../components/common/base';
import ProfileBody from '../components/profile/profile-body';
import ProfileCtx from '../hooks/use-profile-content';
import useApi from '../hooks/use-api';
import { Spin } from 'antd'
import { polkadot_network } from '../config/constant';
import { LoadingOutlined } from '@ant-design/icons'

import { SEO } from '../config';
import CallPolkadot from '../utils/call-polkadot';

const Profile: NextPage = () => {
  const [profile, setProfile] = useState<{ age: string, tag: string, display: boolean }>({ age: '', tag: '', display: false })

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
      if (!d.err) {
        setProfile({ age: d.info.age, tag: d.info.tag, display: d.info.adDisplay })
      } else {
        setProfile({ age: '', tag: '-1', display: false })
      }
    })
  }, [_api, api]);

  const loadingDom = () => (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '60px 0' }}
    >
      <Spin
        size='large'
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
    </div>
  )

  return (
    <ProfileCtx.Provider value={{ profile }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
        page='profile'
      >
        {profile.age || profile.tag === '-1' ? <ProfileBody /> : loadingDom()}
      </Base>
    </ProfileCtx.Provider>

  )
}

export default Profile
