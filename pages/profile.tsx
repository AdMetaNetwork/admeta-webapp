import type { NextPage } from 'next';
import { useState, useMemo, useEffect } from 'react'
import Base from '../components/common/base';
import ProfileBody from '../components/profile/profile-body';
import ProfileCtx from '../hooks/use-profile-content';
import useApi from '../hooks/use-api';
import * as C from '../utils'
import { polkadot_network } from '../config/constant';


import { SEO } from '../config';

const Profile: NextPage = () => {
  const [profile, setProfile] = useState<{ age: string, tag: string, display: boolean }>({ age: '', tag: '', display: false })

  const { api } = useApi(polkadot_network)

  const tx = useMemo(() => {
    if (!api) return null;

    return api.query.user;
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }
    tx?.users(sender)
      .subscribe((c: any) => {
        try {
          const d = JSON.parse(c.toString()) as { age: string, tag: string, adDisplay: boolean }
          setProfile({ age: d.age, tag: d.tag, display: d.adDisplay })
        } catch {
          throw('data parse fail')
        }
      })
  }, [api, tx]);

  return (
    <ProfileCtx.Provider value={{ profileMap: profile }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
        page='profile'
      >
        <ProfileBody />
      </Base>
    </ProfileCtx.Provider>

  )
}

export default Profile
