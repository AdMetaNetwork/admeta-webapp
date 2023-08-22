import { FC, useState, useContext, ChangeEvent, useEffect } from "react";
import BaseInput from "../ui/base-input";
import Image from "next/image";
import { useAccount } from 'wagmi'
import BaseCtx from "../../hooks/use-base-content";
import axios from "axios";
import { IPFS_HTTPS } from "../../config/constant";
import BaseSwitch from "../ui/base-switch";

type Prop = {
  handleSetLogo: (v: string) => void
  handleSetVerify: (v: string) => void
  handleSetPlatform: (v: string) => void
  handleSetDescription: (v: string) => void
}

const Task: FC<Prop> = ({ handleSetLogo, handleSetVerify, handleSetPlatform, handleSetDescription }) => {
  const { address } = useAccount()
  const [logoBase64, setLogoBase64] = useState('')
  const [logo, setLogo] = useState('')
  const [logoName, setLogoName] = useState('')
  const [verify, setVerify] = useState('')
  const [platform, setPlatform] = useState('')
  const [description, setDescription] = useState('')
  const { setLoading } = useContext(BaseCtx)
  const [add, setAdd] = useState('')

  useEffect(() => {
    if (address) {
      setAdd(address)
    }
  }, [address])

  const handleUpLoadImg = (url: any, key: string) => {
    if (!url) {
      return
    }
    axios({
      method: 'post',
      url: '/api/upload',
      data: {
        url,
        key,
      },
    }).then((e) => {
      setLoading!(false)
      setLogo(IPFS_HTTPS + key)
      handleSetLogo(IPFS_HTTPS + key)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading!(true)
    var reader = new FileReader();
    const file = e.target.files![0];

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        //将转换结果赋值给img标签
        const key = file.name
        const url = reader.result
        setLogoBase64(url as string)
        setLogoName(key)
        handleUpLoadImg(url, key)
      }

    }
  };

  return (
    <div className="">
      <div className="mb-[24px]">
        <div className="text-[12px] font-bold text-[#B1B5C3] mb-[12px]">YOUR ADDRESS</div>
        <div className="text-[14px] text-[#777E90] font-bold">{add}</div>
      </div>
      <div className="mb-[24px]">
        <div className="text-[12px] font-bold text-[#B1B5C3] mb-[12px]">YOUR LOGO</div>
        {
          logoBase64
            ?
            <Image
              src={logoBase64}
              alt=""
              width={100}
              height={100}
            />
            :
            <div>
              <input
                type="file"
                className=""
                id="file"
                onChange={(e) => {
                  handleChange(e)
                }}
                accept='image/jpg,image/png'
              />
            </div>
        }
      </div>
      <div className="mb-[24px]">
        <div className="text-[12px] font-bold text-[#B1B5C3] mb-[12px]">CAMPAIGN URL (GALXE)</div>
        <BaseInput
          handleChangeInput={(v) => {
            setVerify(v)
            handleSetVerify(v)
          }}
          placeholder="campaign url also support third verify link such as galex"
          value={verify}
        />
      </div>

      <div className="mb-[24px]">
        <div className="text-[12px] font-bold text-[#B1B5C3] mb-[12px]">YOUR PLATFORM</div>
        <BaseInput
          handleChangeInput={(v) => {
            setPlatform(v)
            handleSetPlatform(v)
          }}
          placeholder="platform for you"
          value={platform}
        />
      </div>

      <div className="mb-[24px]">
        <div className="text-[12px] font-bold text-[#B1B5C3] mb-[12px]">YOUR DESCRIPTION</div>
        <BaseInput
          handleChangeInput={(v) => {
            setDescription(v)
            handleSetDescription(v)
          }}
          placeholder="your task page description"
          value={description}
        />
      </div>

    </div>
  )
}

export default Task;
