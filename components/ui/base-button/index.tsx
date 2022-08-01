import { FC } from "react";
import styles from './index.module.scss';

type Prop = {
  btnText: string,
  btnClick: () => void,
  btnType?: string,
  color?: string,
  activeColor?: string,
}

const BaseButton: FC<Prop> = ({ btnText, btnClick, color = '#3772ff' }) => {
  return (
    <div
      className={styles.btn}
      onClick={btnClick}
      style={{backgroundColor: color}}
    >
      <p>{btnText}</p>
    </div>
  )
}

export default BaseButton;