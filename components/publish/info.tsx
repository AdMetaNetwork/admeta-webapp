import { FC, useRef, useState } from "react";
import TipSvg from "../svg/tip";
import BaseInput from "../ui/base-input";

import styles from './index.module.scss';

type Prop = {
  current?: 1 | 2 | 3
}

const Info: FC<Prop> = ({ current = 1 }) => {
  const tipEl = useRef(null);
  const [showTip, setShowTip] = useState(false)
  const [tw, setTW] = useState(0)

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
          handleChangeInput={() => { }}
          placeholder='URL'
        />
      </div>
      <div className={styles.infoItemI}>
        <div className={styles.h}>
          {labelDom('CPI', true, 'this is a tip ppp aaasas')}
          <BaseInput
            handleChangeInput={() => { }}
            placeholder=''
            type="number"
          />
        </div>
        <div className={styles.h}>
          {labelDom('AMOUNT')}
          <BaseInput
            handleChangeInput={() => { }}
            placeholder=''
            type="number"
          />
        </div>
      </div>
      <div className={styles.infoItemI}>
        <div className={styles.h}>
          {labelDom('AGE MAX')}
          <BaseInput
            handleChangeInput={() => { }}
            placeholder=''
            type="number"
          />
        </div>
        <div className={styles.h}>
          {labelDom('AGE MIN')}
          <BaseInput
            handleChangeInput={() => { }}
            placeholder=''
            type="number"
          />
        </div>
      </div>
      <div className={styles.infoItem}>
        {labelDom('TAG')}
        <div className={styles.tags}>
          <div className={styles.t}>
            <p>GameFi</p>
          </div>
          <div className={styles.t}>
            <p>DeFi</p>
          </div>
          <div className={styles.t}>
            <p>Metaverse</p>
          </div>
        </div>
      </div><div className={styles.infoItem}>
        {labelDom('DESCRIPTION')}
        <textarea className={styles.textarea} placeholder="Say something" maxLength={50}></textarea>
      </div>
    </div>
  )
}

export default Info;