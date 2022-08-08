import { FC } from "react";
import Image from "next/image";
import DeleteSvg from "../svg/delete";

import styles from './index.module.scss';

type Prop = {
  current?: 1 | 2 | 3
}

const Upload: FC<Prop> = ({ current = 1 }) => {
  return (
    <div className={styles.upload}>
      <div className={styles.title}>UPLOAD A COVER IMAGE</div>
      <div className={styles.upImg}>
        <Image
          src={'https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG'}
          alt=''
          width={695}
          height={393}
          objectFit={'cover'}
        />
        <div className={styles.delete}>
          <DeleteSvg />
        </div>
      </div>
      {/* <div className={styles.uploadBox}>
        <div className={styles.upBtn}>
          <input type="file" className={styles.upInput} id="file" onChange={(e) => {
            console.log(e)
          }} />
          <p className={styles.btnLabel}>Select</p>
        </div>
        <div className={styles.dec}>1500x900 or higher recommended. Max 10MB.</div>
      </div> */}
    </div>
  )
}

export default Upload;