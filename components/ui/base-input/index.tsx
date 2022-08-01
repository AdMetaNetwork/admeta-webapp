import { FC, useState } from "react";
import WarnSvg from "../../svg/warn";
import styles from './index.module.scss';

type Prop = {
  handleChangeInput: (val: string) => void,
  type?: string,
  placeholder: string
}

const BaseInput: FC<Prop> = ({ handleChangeInput, type = 'text', placeholder }) => {
  const [isFocus, setFocus] = useState<boolean>(false)

  return (
    <div className={`${styles.baseInput} ${isFocus ? styles.activeFocus : null}`}>
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
          handleChangeInput(e.target.value)
        }}
      />
    </div>
  )
}

export default BaseInput;