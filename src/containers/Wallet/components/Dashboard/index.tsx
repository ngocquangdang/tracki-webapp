import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  makeSelectAccesoryProduct,
  makeSelectAdv,
  makeSelectPointHistory,
  makeSelectSMSPlan,
  makeSelectSubscriptionPlan,
  makeSelectTrackerProduct,
  makeSelectWallet,
} from '@Containers/Wallet/store/selectors';
import MyWallet from './components/MyWallet';

import { useStyles } from './styles';
import ClaimCoin from './components/ClaimCoin';
import InviteFriend from './components/InviteFriend';
import EarnPoint from './components/EarnPoint';
import PointHistory from './components/PointHistory';
import GiftToday from './components/GiftToday';
import PurchaseUsePoint from './components/PurchaseUsePoint';

interface IT {
  t(key: string, format?: object): string;
}
interface Props {
  t(key: string, format?: object): string;
  myWallet: {
    point?: number | string;
    my_wallet?: number | string;
    referral_code?: string;
  };
  adv: {
    advs?: object;
    advIds?: number[];
  };
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
  trackerProduct: {
    trackers: object;
    trackerIds: number[];
  };
  accesoryProduct: {
    accesories: object;
    accesoryIds: number[];
  };
  subscriptionPlan: object[];
  smsPlan: object[];
}

function Dashboard(props: Props) {
  const classes = useStyles();

  const {
    t,
    myWallet,
    adv,
    pointHistory,
    accesoryProduct,
    trackerProduct,
    subscriptionPlan,
    smsPlan,
  } = props;
  return (
    <>
      <div className={classes.row1}>
        <MyWallet myWallet={myWallet} t={t} />
        <ClaimCoin myWallet={myWallet} t={t} />
        <InviteFriend myWallet={myWallet} t={t} />
      </div>
      <div className={classes.row1}>
        <EarnPoint t={t} adv={adv} />
        <PointHistory t={t} pointHistory={pointHistory} />
        <GiftToday t={t} />
      </div>
      <div>
        <PurchaseUsePoint
          t={t}
          trackerProduct={trackerProduct}
          accesoryProduct={accesoryProduct}
          subscriptionPlan={subscriptionPlan}
          smsPlan={smsPlan}
        />
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  myWallet: makeSelectWallet(),
  adv: makeSelectAdv(),
  pointHistory: makeSelectPointHistory(),
  trackerProduct: makeSelectTrackerProduct(),
  accesoryProduct: makeSelectAccesoryProduct(),
  subscriptionPlan: makeSelectSubscriptionPlan(),
  smsPlan: makeSelectSMSPlan(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect, memo)(Dashboard) as React.ComponentType<IT>;
