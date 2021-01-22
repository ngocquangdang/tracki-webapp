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
import { setHiddenHeader } from '@Containers/Wallet/store/actions';

interface IT {
  t(key: string, format?: object): string;
  onChangeTab: (id: number) => void;
  isMobile?: boolean;
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
  onChangeTab: (id: number) => void;
  isMobile?: boolean;
  setHiddenHeader: (type: boolean) => void;
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
    onChangeTab,
    isMobile,
    setHiddenHeader,
  } = props;
  return (
    <>
      <div className={`${classes.row1} ${isMobile && classes.isMobile}`}>
        <MyWallet
          myWallet={myWallet}
          t={t}
          onChangeTab={onChangeTab}
          isMobile={isMobile}
          setHiddenHeader={setHiddenHeader}
        />
        <ClaimCoin myWallet={myWallet} t={t} isMobile={isMobile} />
        <InviteFriend
          myWallet={myWallet}
          t={t}
          onChangeTab={onChangeTab}
          isMobile={isMobile}
        />
      </div>
      <div className={`${classes.row1} ${isMobile && classes.isMobile}`}>
        <EarnPoint t={t} adv={adv} isMobile={isMobile} />
        <PointHistory t={t} pointHistory={pointHistory} isMobile={isMobile} />
        {!isMobile && <GiftToday t={t} />}
      </div>
      <div>
        <PurchaseUsePoint
          t={t}
          trackerProduct={trackerProduct}
          accesoryProduct={accesoryProduct}
          subscriptionPlan={subscriptionPlan}
          smsPlan={smsPlan}
          isMobile={isMobile}
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

const mapDispatchToProps = dispatch => {
  return {
    setHiddenHeader: (type: boolean) => dispatch(setHiddenHeader(type)),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Dashboard) as React.ComponentType<IT>;
