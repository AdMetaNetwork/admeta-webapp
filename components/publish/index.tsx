import { FC, useState, ChangeEvent, useEffect, useMemo, useContext } from "react";
import Step from './step'
import Upload from "./upload";
import Info from "./info";
import Propose from "./propose";
import BackSvg from "../svg/back";
import BaseButton from "../ui/base-button";
import axios from 'axios'
import { useRouter } from 'next/router'
import useApi from "../../hooks/use-api";
import { polkadot_network } from "../../config/constant";
import CallPolkadot from "../../utils/call-polkadot";
import BaseCtx from "../../hooks/use-base-content";


import styles from './index.module.scss';
import * as C from "../../utils";

const PublishBody: FC = () => {

  const [progress, setProgress] = useState<0 | 30 | 60 | 100>(0)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [img, setImg] = useState('')
  const [imgKey, setImgKey] = useState('')
  const [currentBlock, setCurrentBlock] = useState(0)
  const [endBlock, setEndBlock] = useState(0)
  const [target, setTarget] = useState('')
  const [title, setTitle] = useState('')
  const [cpi, setCpi] = useState(0)
  const [amount, setAmount] = useState(0)
  const [tag, setTag] = useState('')
  const [ageMax, setAgeMax] = useState(0)
  const [ageMin, setAgeMin] = useState(0)


  const { setShowTip, setTipType, setTipText, setLoading } = useContext(BaseCtx)


  const router = useRouter()
  const { api } = useApi(polkadot_network)
  const _api = useMemo(() => api, [api])

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
      setImg(e.data.url)
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
    if (!_api) {
      return;
    }
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }

    const pk = new CallPolkadot(sender, _api!)
    pk.getCurrentBlock().then((v) => {
      setCurrentBlock(v)
    })

  }, [_api])

  const handerProposeAd = () => {
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }
    setLoading!(true)
    const pk = new CallPolkadot(sender, _api!)
    let ad: C.AdInfo = {
      metadata: img,
      target: target,
      title: title,
      cpi: cpi,
      amount: amount,
      endBlock: endBlock,
      preference: {
        age: {
          max: ageMax,
          min: ageMin
        },
        tags: [tag]
      }
    }

    pk.porposeAd(ad).then(() => {
      setLoading!(false)
      handleShowTip('Propose ad ok', 'Success')
      router.back()
    })

  }

  const handleSaveAdInfo = () => {
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
    if (!ageMax) {
      handleShowTip('Age max cannot be empty!', 'Error')
      return
    }
    if (!ageMin) {
      handleShowTip('Age min cannot be empty!', 'Error')
      return
    }
    if (!tag) {
      handleShowTip('Tag cannot be empty!', 'Error')
      return
    }
    if (!endBlock) {
      handleShowTip('Takedown cannot be empty!', 'Error')
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
      <Step current={step} />
      <div className={styles.content}>
        <div
          className={styles.nav}
          onClick={handleNavBack}
        >
          <BackSvg />
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
            currentBlock={currentBlock}
            handleGetEndBlock={(v) => {
              setEndBlock(v)
            }}
            handleGetAgeMax={(v) => [
              setAgeMax(v)
            ]}
            handleGetAgeMin={(v) => {
              setAgeMin(v)
            }}
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
                  handerProposeAd()
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