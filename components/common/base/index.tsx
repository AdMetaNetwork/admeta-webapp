import { FC, ReactNode } from "react";
import Head from 'next/head';
import { SEO } from '../../../config'

import styles from './index.module.scss';

type TDK = {
  title: string,
  keywords?: string,
  description?: string
}

type Props = {
  tdk: TDK,
  children: ReactNode
};

const Base: FC<Props> = ({ tdk, children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{tdk.title}</title>
        <meta name="keywords" content={tdk.keywords || SEO.seo_default_keywords} />
        <meta name="description" content={tdk.description || SEO.seo_default_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default Base;