import { FC } from "react";
import CheckOutlinedSvg from "../svg/check-outlined";

import styles from './index.module.scss';

type Prop = {
  current?: 1 | 2 | 3
}

const Step: FC<Prop> = ({ current = 1 }) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepItem}>
        <div className={`${styles.itemLeft}`}>
          <CheckOutlinedSvg />
        </div>
        <div className={styles.right}>Upload a cover picture</div>
      </div>
      <div className={styles.stepItem}>
        <div className={styles.itemLeft}>
          <p>2</p>
        </div>
        <div className={styles.right}>Fill up description</div>
      </div>
      <div className={styles.stepItem}>
        <div className={styles.itemLeft}>
          <p>3</p>
        </div>
        <div className={styles.right}>You’re done</div>
      </div>
    </div>
  )
}

export default Step;