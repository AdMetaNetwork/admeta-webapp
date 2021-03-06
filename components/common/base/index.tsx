import { FC, ReactNode, Context } from "react";
import Head from 'next/head';
import SideNav from "../side-nav";
import Header from "../header";
import TabBar from "../tab-bar";

import { SEO } from '../../../config'

import styles from './index.module.scss';
import HomeCtx from "../../../hooks/use-home-content";
import AdDisplayCtx from "../../../hooks/use-ad-display-content";

type TDK = {
  title: string,
  keywords?: string,
  description?: string
}

type Props = {
  tdk: TDK,
  children: ReactNode,
  isShowSide?: boolean,
  isShowHeader?: boolean,
  isShowTabBar?: boolean,
  page?: 'home' | 'display' | 'profile' | 'management'
};

const Base: FC<Props> = ({ tdk, children, isShowSide, isShowHeader, isShowTabBar, page = 'home' }) => {

  const getCtx = (): Context<any> => {
    if (page === 'home') {
      return HomeCtx
    }
    if (page === 'display') {
      return AdDisplayCtx
    }

    return HomeCtx
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{tdk.title}</title>
        <meta name="keywords" content={tdk.keywords || SEO.seo_default_keywords} />
        <meta name="description" content={tdk.description || SEO.seo_default_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          isShowSide
            ?
            <div className={styles.left}><SideNav /></div>
            :
            null
        }
        <div className={styles.right}>
          {
            isShowHeader
              ?
              <Header 
                content={getCtx()}
              />
              :
              null
          }
          {
            isShowTabBar
              ?
              <TabBar
                activePage={page}
                handleOpenLink={() => { }}
              />
              :
              null
          }
          {children}
        </div>

      </main>
    </div>
  )
}

export default Base;