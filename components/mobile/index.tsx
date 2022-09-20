import { FC } from "react";
import Head from 'next/head';
import styles from './index.module.scss';
import LogoTextSvg from "../svg/logo-text";
import TwitterSvg from "../svg/twitter";
import DiscordSvg from "../svg/discord";
import YoutobeSvg from "../svg/youtube";
import TelegramSvg from "../svg/telegram";
import { useRouter } from "next/router";

const Mobile: FC = () => {

  const router = useRouter()

  const handleGoLink = (url: string) => {
    router.push(url)
  }

  return (
    <div className={styles.mobileWrp}>
      <Head>
        <title>AdMeta | A privacy-preserving Ad Platform in Metaverse</title>
        <meta name="keywords" content='AdMeta, Metaverse advertisement, advertising platform, web3, web3 advertising' />
        <meta name="description" content={`AdMeta is a Metaverse ad platform that focuses on privacy preserving. We use a Trusted Execution Environment (TEE) to store and process user's private data for privacy protection.`} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mian}>
        <div className={styles.logo}>
          <LogoTextSvg />
        </div>
        <div className={styles.slogan}>
          <div>Trustworthy</div>
          <div>Innovative</div>
          <div>Humanistic</div>
        </div>
        <div className={styles.img}></div>
        <div className={styles.pc}>Please open the webpage on your PC</div>
        <div className={styles.footer}>
          <div
            onClick={() => handleGoLink('https://discord.gg/TSSVZZVAM2')}
          >
            <DiscordSvg />
          </div>
          <div
            style={{ margin: '0 10px' }}
            onClick={() => handleGoLink('https://twitter.com/AdMetaNetwork')}
          >
            <TwitterSvg />
          </div>
          <div
            style={{ marginRight: '10px' }}
            onClick={() => handleGoLink('https://t.me/admetanetwork')}
          >
            <TelegramSvg />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleGoLink('https://www.youtube.com/')}
          >
            <YoutobeSvg />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Mobile;