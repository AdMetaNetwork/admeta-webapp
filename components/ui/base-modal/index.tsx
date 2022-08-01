import { FC, ReactNode, useState } from "react";
import CloseSvg from "../../svg/close";
import styles from './index.module.scss';

type Prop = {
  title: string,
  children: ReactNode,
  isShowModal: boolean,
  handleColose: () => void
}

const BaseModal: FC<Prop> = ({ title, children, isShowModal, handleColose }) => {

  return (
    <div
      className={`${styles.baseModule}`}
      style={{ visibility: isShowModal ? 'visible' : 'hidden' }}
    >
      <div
        className={styles.moduleMask}
        onClick={() => {
          handleColose()
        }}
      ></div>
      <div className={`${styles.moduleContent} ${isShowModal ? styles.animationShow : styles.animationHide}`}>
        <div className={styles.moduleHeader}>
          <div className={styles.moduleTitle}>{title}</div>
          <div
            className={styles.closeCircle}
            onClick={handleColose}
          >
            <CloseSvg />
          </div>
        </div>
        <div className={styles.moduleBody}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default BaseModal;