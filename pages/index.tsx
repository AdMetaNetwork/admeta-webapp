import type { NextPage } from 'next';
import Head from 'next/head';
// import * as nextImage from 'next/image';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import * as React from "react";
import {PolkadotChainConnector} from './api/polkadotApi';


function LittleButton() {
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

function testMetadataButton() {
  let p : PolkadotChainConnector = new PolkadotChainConnector;
  return (
    <>
      <button onClick={() => p.getTargetMetadata()}>Test metadata</button>
    </>
  )
}

function showUserImage() {
  // downloadImage("https://ipfs.fleek.co/ipfs/bafybeihb4adk45udjpnymx55msypjuxptcraokavywzxm5ouc5h4phvn2i", "my_picture")
  // downloadFile("https://storageapi.fleek.co/78cc9f61-d521-4f93-95ae-3409d641ebc4-bucket/sample-image.jpg", "my_picture.jpg")
  return (
    <>
        <Image
          src="https://ipfs.fleek.co/ipfs/bafybeihb4adk45udjpnymx55msypjuxptcraokavywzxm5ouc5h4phvn2i"
          alt="sample-image"
          width={1920}
          height={1080}
        />
    </>
  )
}

// function downloadImage(imageSrc :string, name :string) {
//   let image = new Image();

//   image.setAttribute("crossOrigin", "anonymous");
//   image.onload = function() {
//     var canvas = document.createElement("canvas");
//     canvas.width = image.width;
//     canvas.height = image.height;
//     var context = canvas.getContext("2d");
//     context?.drawImage(image, 0,0, image.width, image.height);
//     let url = canvas.toDataURL("image/png");

//     let a = document.createElement("a");
//     let event = new MouseEvent("click");
//     a.download = name || "picture";
//     a.href = url;
//     a.dispatchEvent(event);
//   };
//   image.src = imageSrc;
// }

// function downloadFile(url :string, name :string) {
//   name = name || url;
//   fetch(url).then(response => {
//     if (response.status == 200) 
//       return response.blob();
//     throw new Error(`status: ${response.status}.`);
//   }).then(blob => {
//     // downloadFile(name, blob);
//     let a = document.createElement("a");
//     let event = new MouseEvent("click");
//     const src = URL.createObjectURL(blob);
//     a.download = name || "picture.jpg";
//     a.href = src;
//     a.dispatchEvent(event);
//   }).catch(error => {
//     console.error("Failed. cause: ", error);
//   })
// }

// function downloadFile(fileName, blob) {
//   const anchor = document.createElement("a");
//   const src = URL.createObjectURL(blob);
//   anchor.download(fileName);

// }

function myLoader() {
  return `http://localhost:3000/_next/image/my_ad.jpg`
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
          {LittleButton()}
        </div>

        <div>
          {testMetadataButton()}
        </div>

        <div className={styles.user_image}>
          {showUserImage()}
        </div>
        {/* <div>
          <img src="https://ipfs.fleek.co/ipfs/bafybeihb4adk45udjpnymx55msypjuxptcraokavywzxm5ouc5h4phvn2i"  />
        </div> */}
      </main>

      <footer className={styles.footer}>
          Created by AdMeta
      </footer>
    </div>
  )
}

export default Home
