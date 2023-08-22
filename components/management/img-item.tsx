import { FC } from "react";
import Image from "next/image";
import BaseBadge from "../ui/base-badge";

import styles from './index.module.scss';
import { CASE_NETWORK } from "../../config/constant";
import { useAccount } from "wagmi";

type Prop = {
  img: string,
  badge: 'PENDING' | 'APPROVED' | 'REJECTED',
  title: string
}

const ImgItem: FC<Prop> = ({ img, badge, title }) => {
  const { address } = useAccount()

  return (
    <div
      className={styles.imgItem}
    >
      <Image
        src={img}
        width={357}
        height={215}
        objectFit={'cover'}
        alt=''
      />
      <div className={styles.bottom}>
        <div className={styles.title}>{title}</div>
        <BaseBadge
          text={badge}
          color={badge === 'APPROVED' ? '#58BD7D' : badge === 'PENDING' ? '#E38C4D' : '#CA3009'}
          bgColor={badge === 'APPROVED' ? 'rgba(88, 189, 125, 0.16)' : badge === 'PENDING' ? 'rgba(255, 225, 120, 0.16)' : 'rgba(202, 48, 9, 0.16)'}
        />
      </div>
    </div>
  )
}

export default ImgItem;