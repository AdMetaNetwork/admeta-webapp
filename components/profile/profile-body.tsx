import { FC, useState, useContext, useMemo } from "react";
import BaseInput from "../ui/base-input";
import WarnSvg from "../svg/warn";
import BaseButton from "../ui/base-button";
import EditSvg from "../svg/edit";
import BaseSwitch from "../ui/base-switch";
import ProfileCtx from "../../hooks/use-profile-content";
import useApi from '../../hooks/use-api';
import * as C from '../../utils'
import { polkadot_network } from '../../config/constant';

import styles from './index.module.scss';

export enum PreferencesEnum {
  DeFi = 1,
  GameFi = 2,
  Metaverse = 3
}

const ProfileBody: FC = () => {

  const { profileMap: { age, display, tag } } = useContext(ProfileCtx)
  const [isShowEdit, setShowEdit] = useState<boolean>(!!age)
  const [profileAge, setProfileAge] = useState<number>()
  const [profileDisplay, setProfileDisplay] = useState<boolean>(false)
  const [profileTag, setProfileTag] = useState<number>()
  const [showAgeTip, setShowAgetip] = useState<boolean>(false)
  const [showAdDisplayTip, setShowAdDisplayTip] = useState<boolean>(true)
  const [showTagTip, setShowTagtip] = useState<boolean>(false)

  const { api } = useApi(polkadot_network)

  const tx = useMemo(() => {
    if (!api) return null;

    return api.tx.user;
  }, [api]);

  const handerUpdateProfile = async () => {
    if (!profileAge) {
      setShowAgetip(true)
      return
    }
    if (!profileTag) {
      setShowTagtip(true)
      return
    }

    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }
    const { web3FromAddress, web3Enable } = await import(
      '@polkadot/extension-dapp'
    )

    await web3Enable('admeta-app')
    const injector = await web3FromAddress(sender);
    tx?.addProfile(age, PreferencesEnum[profileTag])
      .signAndSend(sender, { signer: injector.signer })
      .subscribe((result) => { 
        console.log(result) 
      })

  }

  const handerOpenAdDisplay = async (d: boolean) => {
    const sender = localStorage.getItem('_select_account')
    if (!sender) {
      return
    }
    const { web3FromAddress, web3Enable } = await import(
      '@polkadot/extension-dapp'
    )

    await web3Enable('admeta-app')
    const injector = await web3FromAddress(sender);

    tx?.setAdDisplay(d)
      .signAndSend(sender, { signer: injector.signer })
      .subscribe((result) => { 
        console.log(result) 
        if (result.isInBlock) {
          console.log(999999)
        }
      })

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
            ><p>GameFi</p></div>
            <div
              className={`${styles.tag} ${profileTag === 2 && styles.tagActive}`}
              onClick={() => {
                setProfileTag(2)
              }}
            ><p>DeFi</p></div>
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
                handleSwitch={(e) => {
                  setProfileDisplay(e)
                  if (!e) {
                    setShowAdDisplayTip(true)
                  } else {
                    setShowAdDisplayTip(false)
                  }
                  handerOpenAdDisplay(e)
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
        <div className={styles.age}>{age}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>PREFERENCE</div>
        <div className={styles.tagList}>
          <div className={styles.tag}><p>{tag}</p></div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>ADDISPLAY</div>
        <div className={styles.swith}>{display ? 'YES' : 'NO'}</div>
      </div>
      <div
        className={styles.editPro}
        onClick={() => {
          setShowEdit(false)
        }}
      >
        <EditSvg />
        <div className={styles.eLabel}>Edit</div>
      </div>
    </div>
  )

  return (
    <div className={styles.profileBody}>
      {isShowEdit ? showDom() : editDom()}
    </div>
  )
}

export default ProfileBody;