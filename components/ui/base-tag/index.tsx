import { FC, useState } from "react";
import styles from './index.module.scss';

type Prop = {
  label: string,
  bgColor?: string,
  labelColor?: string,
  isStroke?: boolean,
  tagHeight: number,
  tagWidth: number
}

const BaseTag: FC<Prop> = ({ label, bgColor = '#3772ff', labelColor = '#FCFCFD', isStroke = false, tagHeight, tagWidth }) => {

  return (
    <div
      className={`${styles.baseTag}`}
      style={{ width: tagWidth, height: tagHeight, background: !isStroke ? bgColor : 'none', border: isStroke ? `2px solid ${bgColor};` : 'none' }}
    >
      <div
        className={styles.tagLabel}
        style={{ color: labelColor }}
      >
        {label}
      </div>
    </div>
  )
}

export default BaseTag;