import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  makeSelectAdv,
  makeSelectWallet,
} from '@Containers/Wallet/store/selectors';
import MyWallet from './components/MyWallet';

import { useStyles } from './styles';
import ClaimCoin from './components/ClaimCoin';
import InviteFriend from './components/InviteFriend';
import { WalletDataType } from '@Interfaces';
import EarnPoint from './components/EarnPoint';
import PointHistory from './components/PointHistory';
import GiftToday from './components/GiftToday';

interface Props {
  t(key: string, format?: object): string;
  myWallet: WalletDataType;
  adv: WalletDataType;
}

function Dashboard(props: Props) {
  const classes = useStyles();

  const { t, myWallet, adv } = props;
  return (
    <>
      <div className={classes.row1}>
        <MyWallet myWallet={myWallet} t={t} />
        <ClaimCoin myWallet={myWallet} t={t} />
        <InviteFriend myWallet={myWallet} t={t} />
      </div>
      <div className={classes.row1}>
        <EarnPoint t={t} adv={adv} />
        <PointHistory t={t} />
        <GiftToday t={t} />
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  myWallet: makeSelectWallet(),
  adv: makeSelectAdv(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect, memo)(Dashboard) as React.ComponentType;
