import { FC } from "react";

import styles from './index.module.scss';

type Prop = {
  current?: 1 | 2 | 3 | 4
}

const Step: FC<Prop> = ({ current = 1 }) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepItem}></div>
      <div className={styles.stepItem}>
        <div className={`${styles.dot} ${current >= 1 ? styles.active : null}`}>
        </div>
        {
          current > 1 && <div className={styles.line}></div>
        }
        <div className={styles.label}>Upload Image</div>
      </div>
      <div className={styles.stepItem}>
        <div className={`${styles.dot} ${current > 2 ? styles.active : null}`}>
        </div>
        {
          current > 2 && <div className={styles.line}></div>
        }
        <div className={styles.label}>Set Ad Info</div>
      </div>
      <div className={styles.stepItem}>
        <div className={`${styles.dot} ${ current > 3 ? styles.active : null}`}>
        </div>
        {
          current > 3 && <div className={styles.line}></div>
        }
        <div className={styles.label}>Submit</div>
      </div>
      <div className={styles.stepItem}>
        <div className={`${styles.dot} ${ current > 4 ? styles.active : null}`}>
        </div>
        <div className={styles.label}>Task Info</div>
      </div>
      <div className={styles.stepItem}></div>
    </div>
  )
}

export default Step;