import { FC } from "react";
import styles from './index.module.scss';

type Prop = {
  text: string,
  bgColor?: string,
  color?: string,
}

const BaseBadge: FC<Prop> = ({ text, bgColor, color }) => {
  return (
    <div
      className={styles.badge}
      style={{background: bgColor}}
    >
      <p style={{color: color}}>{text}</p>
    </div>
  )
}

export default BaseBadge;