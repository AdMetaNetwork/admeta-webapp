import type { NextPage } from 'next';
import Base from '../components/common/base';
import SignBody from '../components/sign/sign-body';

import { SEO } from '../config';

const Sign: NextPage = () => {
  return (
    <Base
      tdk={{ title: SEO.seo_default_title }}
      isShowHeader
    >
      <SignBody />
    </Base>
  )
}

export default Sign
