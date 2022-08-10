import { FC } from "react";
import styles from './index.module.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

const BaseLoading: FC = () => {

  return (
    <div className={styles.baseLoading}>
      <Spin
        size='large'
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
    </div>
  )
}

export default BaseLoading;