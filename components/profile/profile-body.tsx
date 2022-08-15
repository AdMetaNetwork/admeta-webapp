import { FC, useState, useContext, useMemo, useEffect } from "react";
import BaseInput from "../ui/base-input";
import WarnSvg from "../svg/warn";
import BaseButton from "../ui/base-button";
import EditSvg from "../svg/edit";
import BaseSwitch from "../ui/base-switch";
import BaseCtx from "../../hooks/use-base-content";
import useApi from '../../hooks/use-api';
import { polkadot_network } from '../../config/constant';
import CallPolkadot from "../../utils/call-polkadot";

import styles from './index.module.scss';

export enum PreferencesEnum {
  DeFi = 1,
  GameFi = 2,
  Metaverse = 3
}

const ProfileBody: FC = () => {

  const getTag = (tag: string) => {
    if (PreferencesEnum[1] === tag) {
      return PreferencesEnum.DeFi
    }
    if (PreferencesEnum[2] === tag) {
      return PreferencesEnum.GameFi
    }
    if (PreferencesEnum[3] === tag) {
      return PreferencesEnum.Metaverse
    }

    return 0
  }

  const { profile, setTipText, setTipType, setShowTip, setLoading } = useContext(BaseCtx)
  const { age, display, tag } = profile!
  const [isShowEdit, setShowEdit] = useState<boolean>(!!!age)
  const [profileAge, setProfileAge] = useState<number>(+age)
  const [profileDisplay, setProfileDisplay] = useState<boolean>(display)
  const [profileTag, setProfileTag] = useState<number>(getTag(tag))
  const [showAgeTip, setShowAgetip] = useState<boolean>(false)
  const [showAdDisplayTip, setShowAdDisplayTip] = useState<boolean>(!display)
  const [showTagTip, setShowTagtip] = useState<boolean>(false)

  const { api } = useApi(polkadot_network)
  const _api = useMemo(() => api, [api])

  const handerUpdateProfile = async () => {
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      handleShowTip('You should connect wallet first!', 'Error')
      return
    }

    if (!profileAge) {
      setShowAgetip(true)
      return
    }
    if (!profileTag) {
      setShowTagtip(true)
      return
    }

    

    const pk = new CallPolkadot(sender, _api!)
    const f = await pk.getAddressBanlance() as number
    if (f <= 0) {
      handleShowTip('Account balance too low', 'Error')
      return
    }
    setLoading!(true)
    pk.updateUserProfile(+profileAge, PreferencesEnum[profileTag], profileDisplay).then(() => {
      setShowEdit(false)
      setLoading!(false)
      handleShowTip('Update profile ok!')
    })

  }

  const handleShowTip = (tipText: string, tipType: 'Success' | 'Error' = 'Success') => {
    setTipText!(tipText)
    setTipType!(tipType)
    setShowTip!(true)
    setTimeout(() => {
      setShowTip!(false)
    }, 2000)
  }

  const handerOpenAdDisplay = async (p: boolean) => {
    setProfileDisplay(p)
    if (!p) {
      setShowAdDisplayTip(true)
    } else {
      setShowAdDisplayTip(false)
    }
  }


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
            value={profileAge + ''}
            handleChangeInput={(e) => {
              setProfileAge(+e)
            }}
          />
          {showAgeTip ? warnTipDom('This field is required.') : null}
        </div>
        <div className={styles.item}>
          <div className={styles.label}>PREFERENCE</div>
          <div className={styles.tagList}>
            <div
              className={`${styles.tag} ${profileTag === 1 && styles.tagActive}`}
              onClick={() => {
                setProfileTag(1)
              }}
            ><p>DeFi</p></div>
            <div
              className={`${styles.tag} ${profileTag === 2 && styles.tagActive}`}
              onClick={() => {
                setProfileTag(2)
              }}
            ><p>GameFi</p></div>
            <div
              className={`${styles.tag} ${profileTag === 3 && styles.tagActive}`}
              onClick={() => {
                setProfileTag(3)
              }}
            ><p>Metaverse</p></div>
          </div>
          {showTagTip ? warnTipDom('This field is required.') : null}
        </div>
        <div className={styles.item}>
          <div className={styles.switch}>
            <div className={styles.left}>ADDISPLAY</div>
            <div className={styles.right}>
              <BaseSwitch
                open={profileDisplay}
                handleSwitch={(p) => {
                  handerOpenAdDisplay(p)
                }}
              />
            </div>
          </div>
          {showAdDisplayTip ? warnTipDom('Ads will not be shown if you turn off the switch') : null}
        </div>
        <div className={styles.btn}>
          <BaseButton
            btnClick={() => {
              handerUpdateProfile()
            }}
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
        <div className={styles.age}>{profileAge}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>PREFERENCE</div>
        <div className={styles.tagList}>
          <div className={styles.tag}><p>{PreferencesEnum[profileTag]}</p></div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>ADDISPLAY</div>
        <div className={styles.swith}>{profileDisplay ? 'YES' : 'NO'}</div>
      </div>
      <div
        className={styles.editPro}
        onClick={() => {
          setShowEdit(true)
        }}
      >
        <EditSvg />
        <div className={styles.eLabel}>Edit</div>
      </div>
    </div>
  )

  return (
    <div className={styles.profileBody}>
      {isShowEdit ? editDom() : showDom()}
    </div>
  )
}

export default ProfileBody;