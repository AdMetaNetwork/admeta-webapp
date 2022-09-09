import { FC } from "react";

import styles from './index.module.scss';

type Prop = {
  current?: 1 | 2 | 3
}

const Step: FC<Prop> = ({ current = 1 }) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepItem}>
        <div className={`${styles.dot} ${current <= 3 ? styles.active : null}`}>
          <div className={styles.line}></div>
        </div>
        <div className={styles.label}>User Info</div>
      </div>
      <div className={styles.stepItem}>
        <div className={`${styles.dot} ${current <= 3 && current > 1 ? styles.active : null}`}>
        </div>
        <div className={styles.label}>Address</div>
      </div>
      <div className={styles.stepItem}>
        <div className={`${styles.dot} ${ current >= 3 ? styles.active : null}`}>
        </div>
        <div className={styles.label}>Profile</div>
      </div>
    </div>
  )
}

export default Step;