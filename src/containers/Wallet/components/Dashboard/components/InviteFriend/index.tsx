import React, { useState } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import { ImGooglePlus3, ImHangouts, ImQrcode } from 'react-icons/im';
import { IconButton, Tooltip } from '@material-ui/core';
import { MdContentCopy, MdMail, MdSms } from 'react-icons/md';

// component
import Card from '../Card';
import Modal from '@Components/modals';
import {
  CopyCheck,
  EmailIcon,
  Facebook,
  FacebookMessenger,
  Skype,
} from '@Components/Icon';
import { Button } from '@Components/buttons';

// style
import { useStyles } from './styles';
import { firebaseLogEventRequest } from '@Utils/firebase';

// interface
interface Props {
  t(key: string, format?: object): string;
  myWallet: {
    referral_code?: string;
  };
  onChangeTab: (id: number) => void;
  isMobile?: boolean;
}

export default function InviteFriend(props: Props) {
  const classes = useStyles();
  const { t, myWallet, onChangeTab, isMobile } = props;

  const { referral_code = 'XXXXXXXXXX' } = myWallet;
  const [modalType, setModalType] = useState('');

  const onInviteFriend = () => {
    onChangeTab(2);
    firebaseLogEventRequest('dashboard_screen', 'see_more_invite_friend');
  };

  const getFirebaseLogEvent = (type: string) => {
    switch (type) {
      case 'share':
        firebaseLogEventRequest('dashboard_screen', 'share_referal_code');
        break;
      case 'qrCode':
        firebaseLogEventRequest('dashboard_screen', 'new_qr_referal_code');
        break;
      default:
        firebaseLogEventRequest('dashboard_screen', 'copy_referal_code');
        break;
    }
  };

  const onShowModal = (type: string) => () => {
    setModalType(type);
    getFirebaseLogEvent(type);
  };

  const onCloseModal = () => setModalType('');

  return (
    <>
      <Card
        t={t}
        isHeader={true}
        title={t('wallet:invite_friend_earn_cash')}
        isPadding={true}
        onClick={onInviteFriend}
        isMobile={isMobile}
      >
        <div className={classes.content}>
          <p className={`${classes.mr0} ${classes.title}`}>
            {t('wallet:your_referral_code')}
          </p>
          <div
            className={`${classes.flexBox} ${classes.betweenJustify} ${classes.codeField}`}
          >
            <p className={`${classes.mr0} ${classes.code}`}>{referral_code}</p>
            <div className={classes.flexBox}>
              <Tooltip title={t('wallet:copy')} placement="top">
                <IconButton onClick={onShowModal('copy')}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('wallet:share')} placement="top">
                <IconButton onClick={onShowModal('share')}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('wallet:qrcode')} placement="top">
                <IconButton onClick={onShowModal('qrCode')}>
                  <ImQrcode />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <p className={`${classes.mr0} ${classes.description}`}>
            {t('wallet:invite_description', { money: '10' })}
          </p>
        </div>
      </Card>
      <Modal open={modalType === 'copy'} handleClose={onCloseModal}>
        <div className={classes.copyContainer}>
          <CopyCheck />
          <p className={classes.copyCompleted}>
            {t('wallet:invite_url_copied')}
          </p>
          <p className={classes.copyDescription}>
            {t('wallet:send_it_to_friend')}
          </p>
          <Button
            text="OK"
            classes={classes.normalBtn}
            color="primary"
            type="submit"
          ></Button>
        </div>
      </Modal>
      <Modal open={modalType === 'qrCode'} handleClose={onCloseModal}>
        <div className={classes.copyContainer}>
          <div className={classes.userInfo}>
            <img
              src="./images/tracki-device.png"
              alt=""
              className={classes.img}
            />
            <p className={classes.name}>Steve Rodgers</p>
          </div>
          <div className={classes.qrCode}></div>
          <p className={classes.qrCodeDevcription}>
            {t('wallet:qr_code_description')}
          </p>
        </div>
      </Modal>
      <Modal open={modalType === 'share'} handleClose={onCloseModal}>
        <div className={classes.copyContainer}>
          <p>{t('wallet:share_code_using')}</p>
          <div className={classes.iconList}>
            <div className={classes.iconGroup}>
              <EmailIcon />
              <p className={classes.itemTitle}>Email</p>
            </div>
            <div className={classes.iconGroup}>
              <ImHangouts className={classes.hangoutIcon} />
              <p className={classes.itemTitle}>Hangout</p>
            </div>
            <div className={classes.iconGroup}>
              <ImGooglePlus3 className={classes.googlePlus} />
              <p className={classes.itemTitle}>Google+</p>
            </div>
            <div className={classes.iconGroup}>
              <FacebookMessenger />
              <p className={classes.itemTitle}>Messenger</p>
            </div>
            <div className={classes.iconGroup}>
              <Facebook />
              <p className={classes.itemTitle}>Facebook</p>
            </div>
            <div className={classes.iconGroup}>
              <Skype />
              <p className={classes.itemTitle}>skype</p>
            </div>
            <div className={classes.iconGroup}>
              <MdMail className={classes.normalIcon} />
              <p className={classes.itemTitle}>Mail</p>
            </div>
            <div className={classes.iconGroup}>
              <MdSms className={classes.normalIcon} />
              <p className={classes.itemTitle}>SMS</p>
            </div>
            <div className={classes.iconGroup}>
              <MdContentCopy className={classes.normalIcon} />
              <p className={classes.itemTitle}>copy</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
