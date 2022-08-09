import { FC } from "react";
import { Image } from 'antd'

import styles from './index.module.scss';

type Prop = {
  current?: 1 | 2 | 3
}

const Propose: FC<Prop> = ({ current = 1 }) => {
  return (
    <div className={styles.propose}>
      <div className={styles.proposeBody}>
        <div className={styles.coverImg}>
          <Image
            src={'https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG'}
            alt=''
            width={'100%'}
          />
        </div>
        <div className={styles.title}>Web/project name</div>
      </div>

    </div>
  )
}

export default Propose;