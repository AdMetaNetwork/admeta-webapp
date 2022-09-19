import type { NextPage } from 'next';
import { useState, useMemo, useEffect, ReactNode } from 'react'
import Base from '../components/common/base';
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router';
import axios from 'axios';
import { HTTP_SERVER } from "../config/constant";

import { SEO } from '../config';

const Play: NextPage = () => {

  const router = useRouter()
  const { video } = router.query
  const [playUrl, setPlayUrl] = useState<any>('https://www.youtube.com/watch?v=nWPv2bv-HiI')
  const { add, id } = router.query

  useEffect(() => {
    if (video) {
      setPlayUrl(decodeURIComponent(video as string))
    }
  }, [video])

  const completedAd = () => {
    axios.post(`${HTTP_SERVER}admeta/recordAdCompleted`, {
      walletAddress: add,
      advertisementId: id
    }).then(() => {
      router.push('/ad-display?rd=23nqw343')
    })
  }

  return (
    <Base
      tdk={{ title: SEO.seo_default_title }}
      isShowHeader={false}
      isShowSide={false}
      page='profile'
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <ReactPlayer
          url={playUrl}
          controls
          onEnded={() => {
            completedAd()
          }}
        />
      </div>
    </Base>

  )
}

export default Play
