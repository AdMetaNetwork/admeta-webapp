import type { NextPage } from 'next';
import Base from '../components/common/base';
import Header from '../components/common/header'
import HomeBody from '../components/home/home-body';
import { SEO } from '../config';

const Home: NextPage = () => {
  return (
    <Base
      tdk={{ title: SEO.seo_default_title }}
      isShowHeader
    >
      <HomeBody />
    </Base>
  )
}

export default Home
