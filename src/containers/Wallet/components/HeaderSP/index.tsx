import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Router from 'next/router';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FlagIcon from '@material-ui/icons/Flag';
import { FaGift } from 'react-icons/fa';
import { Spin } from '@Components/Icon';

import { useStyles } from './styles';

export default function WalletHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.back} onClick={Router.back}>
        <ArrowBackIosIcon className={classes.backIcon} />
        <p className={classes.title}>Wallet</p>
      </div>
      <div className={classes.iconGroup}>
        <NotificationsIcon className={classes.icon} />
        <FlagIcon className={classes.flagIcon} />
        <Spin className={classes.icon} />
        <FaGift className={classes.icon} />
      </div>
    </div>
  );
}
