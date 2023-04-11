import { FC, useRef, useState } from "react";
import TipSvg from "../svg/tip";
import BaseInput from "../ui/base-input";
import * as C from '../../config/constant'

import styles from './index.module.scss';

type Prop = {
  handleGetTarget: (v: string) => void,
  handleGetCpi: (v: number) => void,
  handleGetAmount: (v: number) => void,
  handleGetTitle: (v: string) => void,
  handleGetTag: (v: number) => void,
}

const Info: FC<Prop> = ({handleGetTarget, handleGetCpi, handleGetAmount, handleGetTitle, handleGetTag}) => {
  const tipEl = useRef(null);
  const [showTip, setShowTip] = useState(false)
  const [tw, setTW] = useState(0)
  const [tag, setTag] = useState(0)

  const labelDom = (text: string, showIcon: boolean = false, tip: string = '') => {

    return (
      <div className={styles.infoLabel}>
        <p>{text}</p>
        {
          showIcon
          &&
          <div style={{height: 18}} className={styles.rightIcon}>
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
                style={{left: -(tw / 2) + 9, visibility: tw ? 'visible' : 'hidden'}}
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
          {labelDom('CPI', true, 'amount')}
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
      <div className={styles.infoItem}>
        {labelDom('TAG')}
        <div className={styles.tags}>
          {
            C.AD_CATEGORY.map((item, index) => (
              <div
                key={index}
                className={`${styles.t} ${tag === index ? styles.ac : null}`}
                onClick={() => {
                  handleGetTag(index)
                  setTag(index)
                }}
              >
                <p>{item.name}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className={styles.infoItem}>
        {labelDom('TITLE')}
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
