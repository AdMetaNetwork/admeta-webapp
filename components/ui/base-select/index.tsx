import { FC, useState } from "react";
import UpSvg from "../../svg/up";
import DownSvg from "../../svg/down";
import styles from './index.module.scss';

type Options = {
  value: string,
  label: string
}

type Prop = {
  opt: Options[],
  handleChangeSelect: (val: string) => void,
}

const BaseSelect: FC<Prop> = ({ opt, handleChangeSelect }) => {
  const [isShowOption, setShowOption] = useState<boolean>(false)
  const [selectLabel, setSelectLabel] = useState<string>('Select')
  const [currentSelect, setCurrentSelect] = useState<number>(0)

  return (
    <div className={`${styles.baseSelect} ${isShowOption ? styles.activeClick : null}`}>
      <div
        className={styles.activeSelect}
        onClick={() => {
          setShowOption(!isShowOption)
        }}>
        <div>{selectLabel}</div>
        <div>
          {!isShowOption ? <DownSvg /> : <UpSvg />}
        </div>
      </div>
      {
        isShowOption
          ?
          <div className={styles.optionList}>
            {
              opt.map((item, index) => (
                <div
                  className={`${styles.optionItem} ${currentSelect === index ? styles.activityItem : null}`}
                  key={index}
                  onClick={() => {
                    setSelectLabel(item.label)
                    setShowOption(false)
                    setCurrentSelect(index)
                    handleChangeSelect(item.value)
                  }}
                >
                  {item.label}
                </div>
              ))
            }
          </div>
          :
          null
      }

    </div>
  )
}

export default BaseSelect;