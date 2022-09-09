import { FC, ReactNode, Context } from "react";
import Head from 'next/head';
import SideNav from "../side-nav";
import Header from "../header";

import { SEO } from '../../../config'

import styles from './index.module.scss';

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
  page?: 'home' | 'display' | 'profile' | 'management' | 'dashboard' | 'settings' | 'ad-publish'
};

const Base: FC<Props> = ({ tdk, children, isShowSide, isShowHeader, isShowTabBar, page = 'home' }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>{tdk.title}</title>
        <meta name="keywords" content={tdk.keywords || SEO.seo_default_keywords} />
        <meta name="description" content={tdk.description || SEO.seo_default_description} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          isShowSide
            ?
            <div className={styles.left}>
              <SideNav
                page={page}
              />
            </div>
            :
            null
        }
        <div className={styles.right}>
          {
            isShowHeader
              ?
              <Header
                page={page}
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