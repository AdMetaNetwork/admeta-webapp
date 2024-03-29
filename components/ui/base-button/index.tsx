import { FC, SVGProps } from "react";
import styles from './index.module.scss';

type Prop = {
  btnText: string,
  btnClick: () => void,
  btnType?: string,
  color?: string,
  activeColor?: string,
  leftIcon?: any,
  rightIcon?: any,
  isLine?: boolean,
  disable?: boolean
}

const BaseButton: FC<Prop> = ({ btnText, btnClick, color = '#3772ff', leftIcon, rightIcon, isLine = false, disable = false }) => {
  return (
    <div
      className={`${styles.btn} ${isLine && styles.line}}`}
      onClick={btnClick}
      style={{ backgroundColor: !isLine ? color : 'none', opacity: disable ? .7 : 1 }}
    >
      {
        leftIcon
        &&
        <div className={styles.leftIcon}>{leftIcon}</div>
      }

      <p>{btnText}</p>

      {
        rightIcon
        &&
        <div className={styles.rightIcon}>{rightIcon}</div>
      }
    </div>
  )
}

export default BaseButton;