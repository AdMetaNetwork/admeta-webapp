import { FC, useState } from "react";
import styles from './index.module.scss';

type Prop = {
  open?: boolean,
  handleSwitch: (v: boolean) => void
}

const BaseSwitch: FC<Prop> = ({ open = false, handleSwitch }) => {

  return (
    <div
      className={`${styles.switchCube} ${open ? styles.cubeOpen : styles.cubeClose}`}
      onClick={() => {
        handleSwitch(!open)
      }}
    >
      <div className={`${styles.switchCir} ${open ? styles.cirOpen : styles.cirClose}`}></div>
    </div>
  )
}

export default BaseSwitch;