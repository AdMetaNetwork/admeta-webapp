import { FC, useState, useContext } from "react";
import BaseInput from "../ui/base-input";
import WarnSvg from "../svg/warn";
import BaseButton from "../ui/base-button";
import EditSvg from "../svg/edit";
import BaseSwitch from "../ui/base-switch";

import styles from './index.module.scss';


const ProfileBody: FC = () => {

  const warnTipDom = (text: string) => (
    <div className={styles.errTip}>
      <WarnSvg />
      <p>{text}</p>
    </div>
  )

  const editDom = () => (
    <div className={styles.edit}>
      <div className={styles.bar}>Complete your profile to view ads</div>
      <div className={styles.fromWrp}>
        <div className={styles.item}>
          <div className={styles.label}>AGE</div>
          <BaseInput
            placeholder="AGE"
            handleChangeInput={() => { }}
          />
          {warnTipDom('This field is required.')}
        </div>
        <div className={styles.item}>
          <div className={styles.label}>PREFERENCE</div>
          <div className={styles.tagList}>
            <div className={styles.tag}><p>GameFi</p></div>
            <div className={`${styles.tag} ${styles.tagActive}`}><p>DeFi</p></div>
            <div className={styles.tag}><p>Metaverse</p></div>
          </div>
          {warnTipDom('This field is required.')}
        </div>
        <div className={styles.item}>
          <div className={styles.switch}>
            <div className={styles.left}>ADDISPLAY</div>
            <div className={styles.right}>
              <BaseSwitch
                open={true}
                handleSwitch={(e) => {
                  console.log(e)
                }}
              />
            </div>
          </div>
          {warnTipDom('Ads will not be shown if you turn off the switch')}
        </div>
        <div className={styles.btn}>
          <BaseButton
            btnClick={() => { }}
            btnText='Submit'
          />
        </div>
      </div>
    </div>
  )

  const showDom = () => (
    <div className={styles.show}>
      <div className={styles.item}>
        <div className={styles.label}>AGE</div>
        <div className={styles.age}>28</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>PREFERENCE</div>
        <div className={styles.tagList}>
          <div className={styles.tag}><p>DeFi</p></div>
          <div className={styles.tag}><p>Metaverse</p></div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>ADDISPLAY</div>
        <div className={styles.swith}>NO</div>
      </div>
      <div className={styles.editPro}>
        <EditSvg />
        <div className={styles.eLabel}>Edit</div>
      </div>
    </div>
  )

  return (
    <div className={styles.profileBody}>
      {editDom()}
    </div>
  )
}

export default ProfileBody;