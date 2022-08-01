import type { NextPage } from 'next';
import Base from '../components/common/base';

import { SEO } from '../config';

const AdManagement: NextPage = () => {
  return (
    <Base
      tdk={{ title: SEO.seo_default_title }}
      isShowHeader
      isShowTabBar
      page='management'
    >
      <div style={{color: 'white'}}>AdManagement</div>
    </Base>
  )
}

export default AdManagement
