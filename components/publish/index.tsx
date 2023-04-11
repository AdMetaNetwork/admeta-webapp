import { FC, useState, ChangeEvent, useEffect, useMemo, useContext } from "react";
import Step from './step'
import Upload from "./upload";
import Info from "./info";
import Propose from "./propose";
import BackSvg from "../svg/back";
import BaseButton from "../ui/base-button";
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseCtx from "../../hooks/use-base-content";
import { BigNumber } from "ethers";
import { useWeb3 } from '@3rdweb/hooks'

import styles from './index.module.scss';
import CallContract from "../../utils/call-contract";

const PublishBody: FC = () => {

  const [progress, setProgress] = useState<0 | 30 | 60 | 100>(0)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [img, setImg] = useState('')
  const [imgKey, setImgKey] = useState('')
  const [target, setTarget] = useState('')
  const [title, setTitle] = useState('')
  const [cpi, setCpi] = useState(0)
  const [amount, setAmount] = useState(0)
  const [tag, setTag] = useState(0)
  const [adIpfs, setAdIpfs] = useState('')
  const [imgIpfs, setImgIpfs] = useState('')

  const {address} = useWeb3()


  const {setShowTip, setTipType, setTipText, setLoading} = useContext(BaseCtx)

  const router = useRouter()

  const handleUpLoadImg = (url: string, key: string) => {
    if (!url) {
      handleShowTip('Please select a img', 'Error')
      return
    }
    setLoading!(true)
    axios({
      method: 'post',
      url: '/api/upload',
      data: {
        url,
        key,
      },
    }).then((e) => {
      if (e.data.name === 'ok') {
        setProgress(30)
        setStep(2)
        getFile(key)
        setLoading!(false)
      }
    })
  }

  const getFile = (key: string) => {
    axios({
      method: 'get',
      url: `/api/getIPFS?key=${key}`
    }).then((e) => {
      setImgIpfs(e.data.url)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading!(true)
    var reader = new FileReader();
    const file = e.target.files![0];

    if (file) {
      setLoading!(false)
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        //将转换结果赋值给img标签
        const key = file.name
        const url = reader.result
        setImg(url as string)
        setImgKey(key)
      }

    }
  };

  const handleShowTip = (tipText: string, tipType: 'Success' | 'Error') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 2000)
  }

  useEffect(() => {

  }, [])

  const handleProposeAd = async () => {
    setLoading!(true)
    // upload ad info to IPFS
    // const {data: {ipfsHash}} = await axios.post('/api/upload-json-to-ipfs', {
    //   key: `ad-${title}.json`,
    //   jsonContent: {
    //     "address": address,
    //     "adUrl": imgIpfs,
    //     "targetUrl": target,
    //     "title": title,
    //     "cpi": cpi,
    //     "amount": amount,
    //     "tag": tag
    //   }
    // })
    // setAdIpfs(ipfsHash)
    // call contract publish ad
    const c = new CallContract()
    try {
      await c.init()
    } catch (err: any) {
      handleShowTip(err.message, 'Error')
    }

    const inventory = BigNumber.from(amount)
    const reward = BigNumber.from(cpi)
    const category = BigNumber.from(tag)
    await c.createAd({inventory, reward, category, title, metadata: imgIpfs, target})
    c.contract?.once('CreateAd', (a, b) => {
      console.log(a, b, 'complete publish')
      setLoading!(false)
      handleShowTip('Propose ad ok', 'Success')
      router.back()
    })
  }

  const handleSaveAdInfo = async () => {
    if (!target) {
      handleShowTip('Url cannot be empty!', 'Error')
      return
    }
    if (!cpi) {
      handleShowTip('Cpi cannot be empty!', 'Error')
      return
    }
    if (!amount) {
      handleShowTip('Amount cannot be empty!', 'Error')
      return
    }
    if (!title) {
      handleShowTip('Description cannot be empty!', 'Error')
      return
    }

    setStep(3)
    setProgress(60)

  }

  const handleGetStatusLabel = () => {
    if (step === 1) {
      return {
        nav: 'Upload',
        btn: 'Upload and continue'
      }
    }
    if (step === 2) {
      return {
        nav: 'Description',
        btn: 'Submit'
      }
    }
    if (step === 3) {
      return {
        nav: 'Preview',
        btn: 'Publish'
      }
    }

    return {
      nav: 'Upload',
      btn: 'Upload and continue'
    }
  }

  const handleNavBack = () => {
    if (step === 1) {
      return
    }
    if (step === 2) {
      setStep(1)
      setImg('')
    }
    if (step === 3) {
      setStep(2)
    }
  }

  return (
    <div className={styles.publishBody}>
      <Step current={step}/>
      <div className={styles.content}>
        <div
          className={styles.nav}
          onClick={handleNavBack}
        >
          <BackSvg/>
          <div className={styles.navlabel}>{handleGetStatusLabel().nav}</div>
        </div>
        {/* step one upload img */}
        {
          step === 1
          &&
          <Upload
            handleChange={(e) => {
              handleChange(e)
            }}
            img={img}
            handleDelImage={() => {
              setImg('')
            }}
          />
        }
        {/* step two upload ad info */}
        {
          step === 2
          &&
          <Info
            handleGetAmount={(v) => {
              setAmount(v)
            }}
            handleGetCpi={(v) => {
              setCpi(v)
            }}
            handleGetTag={(v) => {
              setTag(v)
            }}
            handleGetTarget={(v) => {
              setTarget(v)
            }}
            handleGetTitle={(v) => {
              setTitle(v)
            }}
          />
        }
        {/* step three publish ad */}
        {
          step === 3
          &&
          <Propose
            img={img}
            title={title}
          />
        }
        <div className={styles.bottomBtn}>
          <BaseButton
            btnClick={() => {
              router.back()
            }}
            btnText='Cancel'
            isLine
          />
          <BaseButton
            btnClick={() => {
              switch (step) {
                case 1:
                  handleUpLoadImg(img, imgKey)
                  break;

                case 2:
                  handleSaveAdInfo()
                  break;

                case 3:
                  handleProposeAd()
                  break;

                default:
                  break;
              }
            }}
            btnText={handleGetStatusLabel().btn}
          />
        </div>
      </div>
    </div>
  )
}

export default PublishBody;
