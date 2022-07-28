import type { NextPage } from 'next';
import { ReactNode, useState } from 'react'
import Base from '../components/common/base';
import AdDisplayCtx from '../hooks/use-ad-display-content';
import AdDisplayBody from '../components/ad-display/ad-display-body';


import { SEO } from '../config';

const AdDisplay: NextPage = () => {
  const [showTip, setShowTip] = useState<boolean>(false)
  return (
    <AdDisplayCtx.Provider value={{ showTip, setShowTip }}>
      <Base
        tdk={{ title: SEO.seo_default_title }}
        isShowHeader
        isShowTabBar
        page='display'
      >
        <AdDisplayBody />
      </Base>
    </AdDisplayCtx.Provider>
  )
}

export default AdDisplay
