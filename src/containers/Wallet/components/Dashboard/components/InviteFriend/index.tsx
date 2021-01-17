import React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import { ImQrcode } from 'react-icons/im';
import { IconButton, Tooltip } from '@material-ui/core';

import Card from '../Card';

import { useStyles } from './styles';

interface Props {
  t(key: string, format?: object): string;
  myWallet: {
    referral_code?: string;
  };
}

export default function InviteFriend(props: Props) {
  const classes = useStyles();
  const { t, myWallet } = props;

  const { referral_code = 'XXXXXXXXXX' } = myWallet;

  return (
    <Card
      t={t}
      isHeader={true}
      title={t('wallet:invite_friend_earn_cash')}
      isPadding={true}
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
              <IconButton>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('wallet:share')} placement="top">
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('wallet:qrcode')} placement="top">
              <IconButton>
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
  );
}
