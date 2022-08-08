import { FC } from "react";
import BaseButton from "../ui/base-button";
import ImgItem from "./img-item";
import PlusSvg from "../svg/plus";
import { useRouter } from 'next/router'

import styles from './index.module.scss';

const ManagementBody: FC = () => {
  const router = useRouter()
  return (
    <div className={styles.managementBody}>
      <div className={styles.pushBtn}>
        <BaseButton
          btnClick={() => { 
            router.push('/ad-publish')
          }}
          btnText='Publish new ad'
          leftIcon={<PlusSvg />}
        />
      </div>
      <div className={styles.list}>
        <div className={styles.listWrp}>
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'APPROVED'}
          />
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'PENDING'}
          />
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'REJECTED'}
          />
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'APPROVED'}
          />
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'APPROVED'}
          />
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'APPROVED'}
          />
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'APPROVED'}
          />
          <ImgItem
            img="https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/IMG_8446.JPG"
            badge={'APPROVED'}
          />
        </div>
      </div>
    </div>
  )
}

export default ManagementBody;