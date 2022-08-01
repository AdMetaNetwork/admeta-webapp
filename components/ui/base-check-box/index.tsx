import { FC, useState } from "react";
import CheckSvg from "../../svg/check";
import styles from './index.module.scss';

type Prop = {
  handleCheck: (val: boolean) => void,
  label: string,
}

const BaseCheckBox: FC<Prop> = ({ handleCheck, label }) => {
  const [isCheck, setCheck] = useState<boolean>(false)

  return (
    <div
      className={`${styles.baseCheckBox}`}
      onClick={() => {
        setCheck(!isCheck)
        handleCheck(!isCheck)
      }}
    >
      {
        isCheck
          ?
          <CheckSvg />
          :
          <div className={styles.box}></div>
      }
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default BaseCheckBox;