import { FC } from "react";
import Step from './step'
import Upload from "./upload";
import Info from "./info";
import BackSvg from "../svg/back";
import BaseButton from "../ui/base-button";
import styles from './index.module.scss';

const PublishBody: FC = () => {

  return (
    <div className={styles.publishBody}>
      <div className={styles.left}>
        <Step />
      </div>
      <div className={styles.content}>
        <div className={styles.nav}>
          <BackSvg />
          <div className={styles.navlabel}>Upload</div>
        </div>
        {/* step one upload img */}
        {/* <Upload /> */}
        {/* step two upload ad info */}
        <Info />
        {/* step three publish ad */}
        <div className={styles.bottomBtn}>
          <BaseButton
            btnClick={() => { }}
            btnText='Cancel'
            isLine
          />
          <BaseButton
            btnClick={() => { }}
            btnText='Upload and continue'
          />
        </div>
      </div>
    </div>
  )
}

export default PublishBody;