import { FC } from "react";
import Step from './step'
import Upload from "./upload";
import Info from "./info";
import Propose from "./propose";
import BackSvg from "../svg/back";
import BaseButton from "../ui/base-button";
import { Progress } from 'antd';
import styles from './index.module.scss';

const PublishBody: FC = () => {

  return (
    <div className={styles.publishBody}>
      <div className={styles.progress}>
        <Progress
          percent={30}
          showInfo={false}
          strokeColor={'#00875A'}
          trailColor={'#1D1F26'}
          strokeWidth={6}
        />
      </div>
      <div className={styles.left}>
        <Step />
      </div>
      <div className={styles.content}>
        <div className={styles.nav}>
          <BackSvg />
          <div className={styles.navlabel}>Upload</div>
        </div>
        {/* step one upload img */}
        <Upload />
        {/* step two upload ad info */}
        {/* <Info /> */}
        {/* step three publish ad */}
        {/* <Propose /> */}
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