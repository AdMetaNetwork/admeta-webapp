import { FC, ReactNode, useState } from "react";
import SuccessSvg from "../../svg/success";
import FailSvg from "../../svg/fail";
import CloseSvg from "../../svg/close";
import styles from './index.module.scss';

type Prop = {
  type: 'Success' | 'Error',
  children: ReactNode,
  isShowTip: boolean,
  handleColose: () => void
}

enum icon {
  'Success',
  'Error'
}

const BaseTip: FC<Prop> = ({ type, children, isShowTip, handleColose }) => {

  const getBg = () => {
    if (type === icon[0]) {
      return '#58bd7d'
    }
    if (type === icon[1]) {
      return '#DE350B'
    }
  }

  return (
    <div
      className={`${styles.baseTip} ${isShowTip ? styles.animationShow : ''}`}
      style={{ visibility: isShowTip ? 'visible' : 'hidden', background: getBg() }}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        {
          type === icon[0]
            ?
            <SuccessSvg />
            :
            null
        }
        {
          type === icon[1]
            ?
            <FailSvg />
            :
            null
        }
      </div>
      <div className={styles.middle}>
        <div className={styles.status}>{type}</div>
        {children}
      </div>
      <div style={{ cursor: 'pointer' }} onClick={handleColose}>
        <CloseSvg />
      </div>
    </div>
  )
}

export default BaseTip;