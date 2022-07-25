import { FC } from "react";
import styles from './index.module.scss';

type Prop = {
  btnText: string,
  btnClick: () => void
}

const BaseButton: FC<Prop> = ({btnText, btnClick}) => {
  return (
    <div className={styles.btn} onClick={btnClick}>
      <p>{btnText}</p>
    </div>
  )
}

export default BaseButton;