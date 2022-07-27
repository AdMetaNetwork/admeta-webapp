import { FC, useState } from "react";
import WarnSvg from "../../svg/warn";
import styles from './index.module.scss';

type Prop = {
  handleChangeInput: (val: string) => void,
  type?: string,
  placeholder: string,
  isRequire?: boolean
}

const BaseInput: FC<Prop> = ({ handleChangeInput, type = 'text', placeholder, isRequire = false }) => {
  const [isFocus, setFocus] = useState<boolean>(false)
  const [require, setRequire] = useState<boolean>(isRequire)

  return (
    <div className={`${styles.baseInput} ${isFocus ? styles.activeFocus : null} ${isFocus && require ? styles.activeRequire : null}`}>
      <input
        type={type}
        placeholder={placeholder}
        className={styles.mInput}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
        onChange={(e) => {
          if (e.target.value === '' && isRequire) {
            setRequire(true)
          } else {
            setRequire(false)
            handleChangeInput(e.target.value)
          }
        }}
      />
      {
        require && isFocus
          ?
          <div className={styles.errTip}>
            <WarnSvg />
            <p>This field is required.</p>
          </div>
          :
          null
      }
    </div>
  )
}

export default BaseInput;