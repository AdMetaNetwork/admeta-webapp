import { FC } from "react";
import LogoTextSvg from "../../svg/logo-text";
import Link from "next/link";
import Menu1Svg from "../../svg/menu-1";
import Meun2Svg from "../../svg/menu-2";
import Meun3Svg from "../../svg/meun-3";
import Meun4Svg from "../../svg/meun-4";
import Meun5Svg from "../../svg/meun-5";

import { useRouter } from 'next/router'

import styles from './index.module.scss';

type Prop = {
  page?: string
}

const SideNav: FC<Prop> = ({ page = 'dashboard' }) => {
  const router = useRouter()

  return (
    <div className={styles.sideNav}>
      <div className={styles.logo}>
        <Link href='/'>
          <a href=""><LogoTextSvg /></a>
        </Link>
      </div>
      <div className={styles.list}>
        <div className={styles.label}>USER</div>
        <div
          className={`${styles.item} ${page === 'dashboard' ? styles.active : null}`}
          onClick={() => {
            router.push('/dashboard')
          }}
        >
          <Menu1Svg color={page === 'dashboard' ? '#E6E7F0' : '#777E90'} />
          <div className={styles.right}>Dashboard</div>
        </div>
        <div
          className={`${styles.item} ${page === 'profile' ? styles.active : null}`}
          onClick={() => {
            router.push('/profile')
          }}
        >
          <Meun2Svg color={page === 'profile' ? '#E6E7F0' : '#777E90'} />
          <div className={styles.right}>Profile</div>
        </div>
        <div
          className={`${styles.item} ${page === 'display' ? styles.active : null}`}
          onClick={() => {
            router.push('/ad-display')
          }}
        >
          <Meun3Svg color={page === 'display' ? '#E6E7F0' : '#777E90'} />
          <div className={styles.right}>Ad Display</div>
        </div>
        <div
          className={`${styles.item} ${page === 'settings' ? styles.active : null}`}
          onClick={() => {
            router.push('/settings')
          }}
        >
          <Meun4Svg color={page === 'settings' ? '#E6E7F0' : '#777E90'} />
          <div className={styles.right}>Settings</div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list}>
        <div className={styles.label}>ADVERTISER</div>
        <div
          className={`${styles.item} ${page === 'management' ? styles.active : null}`}
          onClick={() => {
            router.push('/ad-management')
          }}
        >
          <Meun5Svg color={page === 'management' ? '#E6E7F0' : '#777E90'} />
          <div className={styles.right}>Ad Management</div>
        </div>
      </div>
    </div>
  )
}

export default SideNav;