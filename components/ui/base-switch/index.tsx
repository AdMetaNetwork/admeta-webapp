import { FC, useState } from "react";
import styles from './index.module.scss';

type Prop = {
  open?: boolean,
  handleSwitch: (v: boolean) => void
}

const BaseSwitch: FC<Prop> = ({ open = false, handleSwitch }) => {

  const [o, setO] = useState(open)

  return (
    <div
      className={`${styles.switchCube} ${o ? styles.cubeOpen : styles.cubeClose}`}
      onClick={() => {
        setO(!o)
        handleSwitch(!o)
      }}
    >
      <div className={`${styles.switchCir} ${o ? styles.cirOpen : styles.cirClose}`}></div>
    </div>
  )
}

export default BaseSwitch;