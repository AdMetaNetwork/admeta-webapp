import { FC } from "react";

import styles from './index.module.scss';

type Prop = {
  activePage: 'display' | 'profile' | 'management',
  handleOpenLink: () => void
}

enum page {
  'display',
  'profile',
  'management'
}

const TabBar: FC<Prop> = ({ activePage, handleOpenLink }) => {

  return (
    <div className={styles.tabBar}>
      <div
        className={activePage === page[0] ? styles.activeShow : ''}
        onClick={handleOpenLink}
      ><p>Ad Display</p></div>
      <div
        className={`${styles.tabMiddle} ${activePage === page[1] ? styles.activeShow : ''}`}
        onClick={handleOpenLink}
      ><p>Profile</p></div>
      <div
        className={activePage === page[2] ? styles.activeShow : ''}
        onClick={handleOpenLink}
      ><p>Ad Management</p></div>
    </div>
  )
}

export default TabBar;