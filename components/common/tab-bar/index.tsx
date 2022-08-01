import { FC } from "react";
import Link from "next/link";

import styles from './index.module.scss';

type Prop = {
  activePage: 'home' | 'display' | 'profile' | 'management',
  handleOpenLink: () => void
}

enum page {
  'home',
  'display',
  'profile',
  'management'
}

const TabBar: FC<Prop> = ({ activePage, handleOpenLink }) => {

  return (
    <div className={styles.tabBar}>
      <div
        className={activePage === page[1] ? styles.activeShow : ''}
        onClick={handleOpenLink}
      >
        <Link href='/ad-display'>
          <a>Ad Display</a>
        </Link>
      </div>
      <div
        className={`${styles.tabMiddle} ${activePage === page[2] ? styles.activeShow : ''}`}
        onClick={handleOpenLink}
      >
        <Link href='/profile'>
          <a>Profile</a>
        </Link>
      </div>
      <div
        className={activePage === page[3] ? styles.activeShow : ''}
        onClick={handleOpenLink}
      >
        <Link href='/ad-management'>
          <a>Ad Management</a>
        </Link>
      </div>
    </div>
  )
}

export default TabBar;