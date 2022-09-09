import { FC } from "react";
import styles from './index.module.scss';

type Prop = {
  label?: string
}

const BaseLoading: FC<Prop> = ({ label = 'loading...' }) => {

  return (
    <div className={styles.baseLoading}>
      <div className={styles.loading}>
        <div>
          <div className={styles.c1}></div>
          <div className={styles.c2}></div>
          <div className={styles.c3}></div>
          <div className={styles.c4}></div>
        </div>
        <span>{label}</span>
      </div>
    </div>
  )
}

export default BaseLoading;