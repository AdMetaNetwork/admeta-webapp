import { FC, useRef, useState } from "react";
import TipSvg from "../svg/tip";
import BaseInput from "../ui/base-input";
import { DatePicker } from 'antd'

import styles from './index.module.scss';

type Prop = {
  currentBlock: number,
  handleGetEndBlock: (v: number) => void,
  handleGetTarget: (v: string) => void,
  handleGetCpi: (v: number) => void,
  handleGetAmount: (v: number) => void,
  handleGetTitle: (v: string) => void,
  handleGetTag: (v: string) => void,
  handleGetAgeMax: (v: number) => void,
  handleGetAgeMin: (v: number) => void,
}

const Info: FC<Prop> = ({ currentBlock = 1, handleGetEndBlock, handleGetTarget, handleGetCpi, handleGetAmount, handleGetTitle, handleGetTag, handleGetAgeMax, handleGetAgeMin }) => {
  const tipEl = useRef(null);
  const [showTip, setShowTip] = useState(false)
  const [tw, setTW] = useState(0)
  const [tag, setTag] = useState<'GameFi' | 'DeFi' | 'Metaverse' | ''>('')

  const labelDom = (text: string, showIcon: boolean = false, tip: string = '') => {

    return (
      <div className={styles.infoLabel}>
        <p>{text}</p>
        {
          showIcon
          &&
          <div style={{ height: 18 }} className={styles.rightIcon}>
            <TipSvg
              handlerOpenTip={() => {
                setShowTip(!showTip)
                if (!showTip) {
                  setTimeout(() => {
                    const n: number = tipEl.current!['clientWidth']
                    setTW(n)
                  }, 200)
                }
              }}
            />
            {
              showTip
              &&
              <div
                className={styles.tip}
                ref={tipEl}
                style={{ left: -(tw / 2) + 9, visibility: tw ? 'visible' : 'hidden' }}
              >{tip}</div>
            }
          </div>
        }
      </div>
    )
  }

  return (
    <div className={styles.info}>
      <div className={styles.infoItem}>
        {labelDom('WHAT IS YOUR AD URL?')}
        <BaseInput
          handleChangeInput={(e) => {
            handleGetTarget(e)
          }}
          placeholder='URL'
        />
      </div>
      <div className={styles.infoItemI}>
        <div className={styles.h}>
          {labelDom('CPI', true, 'this is a tip ppp aaasas')}
          <BaseInput
            handleChangeInput={(e) => {
              handleGetCpi(+e)
            }}
            placeholder=''
            type="number"
          />
        </div>
        <div className={styles.h}>
          {labelDom('AMOUNT')}
          <BaseInput
            handleChangeInput={(e) => {
              handleGetAmount(+e)
            }}
            placeholder=''
            type="number"
          />
        </div>
      </div>
      <div className={styles.infoItemI}>
        <div className={styles.h}>
          {labelDom('AGE MAX')}
          <BaseInput
            handleChangeInput={(e) => {
              handleGetAgeMax(+e)
            }}
            placeholder=''
            type="number"
          />
        </div>
        <div className={styles.h}>
          {labelDom('AGE MIN')}
          <BaseInput
            handleChangeInput={(e) => {
              handleGetAgeMin(+e)
            }}
            placeholder=''
            type="number"
          />
        </div>
      </div>
      <div className={styles.infoItem}>
        {labelDom('TAG')}
        <div className={styles.tags}>
          <div
            className={`${styles.t} ${tag === 'GameFi' ? styles.ac : null}`}
            onClick={() => {
              handleGetTag('GameFi')
              setTag('GameFi')
            }}
          >
            <p>GameFi</p>
          </div>
          <div
            className={`${styles.t} ${tag === 'DeFi' ? styles.ac : null}`}
            onClick={() => {
              handleGetTag('DeFi')
              setTag('DeFi')
            }}
          >
            <p>DeFi</p>
          </div>
          <div
            className={`${styles.t} ${tag === 'Metaverse' ? styles.ac : null}`}
            onClick={() => {
              handleGetTag('Metaverse')
              setTag('Metaverse')
            }}
          >
            <p>Metaverse</p>
          </div>
        </div>
      </div>
      <div className={styles.infoItem}>
        {labelDom('TAKEDOWN')}
        <DatePicker className={styles.right} style={{ width: '70%' }} onChange={(date, dateString) => {
          const s = new Date().getTime() / 1000;
          const startDate = parseInt(s + '');
          const e = new Date(dateString).getTime() / 1000;
          const endDate = parseInt(e + '');

          // 计算 块数量 24秒出一个块
          const block = parseInt(((endDate - startDate) / 24) + '')
          handleGetEndBlock(currentBlock + block)

        }} />
      </div>
      <div className={styles.infoItem}>
        {labelDom('DESCRIPTION')}
        <textarea
          className={styles.textarea}
          placeholder="Say something"
          maxLength={50}
          onChange={(e) => {
            handleGetTitle(e.target.value)
          }}
        ></textarea>
      </div>
    </div>
  )
}

export default Info;