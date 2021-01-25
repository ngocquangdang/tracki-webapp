import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';

// wallet store
import reducer from './store/reducer';
import saga from './store/sagas';

// tracker store
import trackersSaga from '@Containers/Trackers/store/sagas';
import trackersReducer from '@Containers/Trackers/store/reducers';

import View from './views';
import {
  getAdvertimentRequest,
  getMyWallletRequest,
  getPointHistoryRequest,
  getProductRequest,
  getSMSPlanRequest,
  getSubscriptionPlanRequest,
  setHiddenHeader,
  setViewPage,
} from './store/actions';
import {
  makeSelectIsHiddenHeader,
  makeSelectPage,
  makeSelectPointHistory,
  makeSelectWallet,
} from './store/selectors';

interface Props {
  getMyWallletRequest: (id: number) => void;
  getPointHistoryRequest: (id: number) => void;
  getAdvertimentRequest: () => void;
  getProductRequest: () => void;
  t(key: string): string;
  getSMSPlanRequest: () => void;
  getSubscriptionPlanRequest: () => void;
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
  setHiddenHeader: (type: string) => void;
  setViewPage: (page: string) => void;
}

function WalletContainer(props: Props) {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'tracker', saga: trackersSaga });

  const {
    getMyWallletRequest,
    getAdvertimentRequest,
    getPointHistoryRequest,
    getProductRequest,
    getSMSPlanRequest,
    getSubscriptionPlanRequest,
  } = props;

  useEffect(() => {
    getMyWallletRequest(1);
    getAdvertimentRequest();
    getPointHistoryRequest(1);
    getProductRequest();
    getSMSPlanRequest();
    getSubscriptionPlanRequest();
  }, [
    getMyWallletRequest,
    getAdvertimentRequest,
    getPointHistoryRequest,
    getProductRequest,
    getSMSPlanRequest,
    getSubscriptionPlanRequest,
  ]);

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  myWallet: makeSelectWallet(),
  hiddenHeader: makeSelectIsHiddenHeader(),
  page: makeSelectPage(),
  pointHistory: makeSelectPointHistory(),
});

const mapDispatchToProps = dispatch => {
  return {
    getMyWallletRequest: (id: number) => dispatch(getMyWallletRequest(id)),
    getAdvertimentRequest: () => dispatch(getAdvertimentRequest()),
    getPointHistoryRequest: (id: number) =>
      dispatch(getPointHistoryRequest(id)),
    getProductRequest: () => dispatch(getProductRequest()),
    getSubscriptionPlanRequest: () => dispatch(getSubscriptionPlanRequest()),
    getSMSPlanRequest: () => dispatch(getSMSPlanRequest()),
    setHiddenHeader: (type: string) => dispatch(setHiddenHeader(type)),
    setViewPage: (page: string) => dispatch(setViewPage(page)),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(WalletContainer) as React.ComponentType;
