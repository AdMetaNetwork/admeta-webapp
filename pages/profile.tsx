import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import ProfileBody from '../components/profile/profile-body';


import { SEO } from '../config';

const Profile: NextPage = () => {
  return (
    <Base
      tdk={{ title: SEO.seo_default_title }}
      isShowHeader
      isShowTabBar
      page='profile'
    >
      <ProfileBody />
    </Base>
  )
}

export default Profile
