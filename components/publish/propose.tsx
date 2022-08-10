import { FC } from "react";
import { Image } from 'antd'

import styles from './index.module.scss';

type Prop = {
  img: string,
  title: string
}

const Propose: FC<Prop> = ({ img, title }) => {
  return (
    <div className={styles.propose}>
      <div className={styles.proposeBody}>
        <div className={styles.coverImg}>
          <Image
            src={img}
            alt=''
            width={'100%'}
          />
        </div>
        <div className={styles.title}>{title}</div>
      </div>

    </div>
  )
}

export default Propose;