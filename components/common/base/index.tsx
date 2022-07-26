import { FC, ReactNode } from "react";
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
  isShowHeader?: boolean
};

const Base: FC<Props> = ({ tdk, children, isShowSide, isShowHeader }) => {
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
              <Header />
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