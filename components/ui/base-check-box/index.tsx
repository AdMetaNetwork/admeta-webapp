import { FC, useState } from "react";
import CheckSvg from "../../svg/check";
import styles from './index.module.scss';

type Prop = {
  handleCheck: (val?: boolean) => void,
  label: string,
  scale?: number,
  labelColor?: string,
  labelFontSize?: string,
  check?: boolean
}

const BaseCheckBox: FC<Prop> = ({ handleCheck, label, scale = 1, labelFontSize, labelColor, check = false }) => {
  return (
    <div
      className={`${styles.baseCheckBox}`}
      onClick={() => handleCheck()}
    >
      {
        check
          ?
          <CheckSvg
            scale={scale}
          />
          :
          <div style={{ zoom: scale }} className={styles.box}></div>
      }
      <div className={styles.label} style={{ fontSize: labelFontSize, color: labelColor }}>{label}</div>
    </div>
  )
}

export default BaseCheckBox;