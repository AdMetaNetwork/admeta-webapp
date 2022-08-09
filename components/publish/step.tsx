import { FC } from "react";
import CheckOutlinedSvg from "../svg/check-outlined";

import styles from './index.module.scss';

type Prop = {
  current?: 1 | 2 | 3
}

const Step: FC<Prop> = ({ current = 3 }) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepItem}>
        {
          current === 3 || current === 2
            ?
            <div style={{ marginRight: 10, width: 20, height: 20 }}>
              <CheckOutlinedSvg size={20} />
            </div>
            :
            <div className={`${styles.itemLeft}`}>
              <p>1</p>
            </div>
        }
        <div className={`${styles.right} ${current === 1 ? styles.light : null}`}>Upload a cover picture</div>
        <div className={styles.dashed}>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={styles.stepItem}>
        {
          current === 3
            ?
            <div style={{ marginRight: 10, width: 20, height: 20 }}>
              <CheckOutlinedSvg size={20} />
            </div>
            :
            <div className={`${styles.itemLeft}`}>
              <p>2</p>
            </div>
        }
        <div className={`${styles.right} ${current === 2 ? styles.light : null}`}>Fill up description</div>
        <div className={styles.dashed}>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={styles.stepItem}>
        <div className={styles.itemLeft}>
          <p>3</p>
        </div>
        <div className={`${styles.right} ${current === 3 ? styles.light : null}`}>You’re done</div>
      </div>
    </div>
  )
}

export default Step;