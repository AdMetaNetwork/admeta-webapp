import { FC, ChangeEvent } from "react";
import { Image } from "antd";
import DeleteSvg from "../svg/delete";

import styles from './index.module.scss';

type Prop = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  img: string
}

const Upload: FC<Prop> = ({ handleChange, img }) => {
  return (
    <div className={styles.upload}>
      <div className={styles.title}>UPLOAD A COVER IMAGE</div>
      {
        !img
          ?
          <div className={styles.uploadBox}>
            <div className={styles.upBtn}>
              <input
                type="file"
                className={styles.upInput}
                id="file"
                onChange={handleChange}
                accept='image/jpg,image/png'
              />
              <p className={styles.btnLabel}>Select</p>
            </div>
            <div className={styles.dec}>1500x900 or higher recommended. Max 10MB.</div>
          </div>
          :
          <div className={styles.upImg}>
            <Image
              src={img}
              alt=''
              width={695}
              preview={false}
            />
            <div className={styles.delete}>
              <DeleteSvg />
            </div>
          </div>
      }


    </div>
  )
}

export default Upload;