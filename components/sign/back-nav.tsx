import { FC } from "react";

import styles from './index.module.scss';

type Prop = {
  handleNavClick: () => void,
  navText: string
}

const BackNav: FC<Prop> = ({ handleNavClick, navText }) => {
  return (
    <div
      className={styles.backNav}
      onClick={handleNavClick}
    >
      {navText}
    </div>
  )
}

export default BackNav;