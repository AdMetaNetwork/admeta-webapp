import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as React from "react";


function littleButton() {
  const [enableConnection, setEnableConnection] = React.useState(false);
  // const connectExtension = () => setEnableConnection(true);

  React.useEffect(() => {

    if (enableConnection) {
    const haveExtension = async () => {
      // window is accessible here.
      // console.log("window.innerHeight", window.innerHeight);

      const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
      const extensions = await web3Enable('my-cool-app');
      if (extensions.length === 0) {
        console.log("No extension found");
        return;
      } 
      console.log("Checking existig accounts...");

      // we are now informed that the user has at least one extension and that we
      // will be able to show and use accounts
      const allAccounts = await web3Accounts();

      // We arbitraily select the first account returned from the above snippet
      // `account` is of type InjectedAccountWithMeta 
      const account = allAccounts[0];
      console.log(account);
      setEnableConnection(false);

    }
    haveExtension();
    // return () => {
      
    // };
    }
  }, [enableConnection]);
  return (
    <>
      <button onClick={() => setEnableConnection(true)}>Connect polkadot extention</button>
    </>
  )
}

 
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | AdMeta</title>
        <meta name="description" content="AdMeta Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to AdMeta
        </h1>

        <div>
          {littleButton()}
        </div>
      </main>

      <footer className={styles.footer}>
          Created by AdMeta
      </footer>
    </div>
  )
}

export default Home
