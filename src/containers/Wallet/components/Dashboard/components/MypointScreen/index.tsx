import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import dynamic from 'next/dynamic';

import {
  getPointHistoryRequest,
  getProductRequest,
} from '@Containers/Wallet/store/actions';
import { makeSelectPointHistory } from '@Containers/Wallet/store/selectors';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '../../../../store/reducer';
import saga from '../../../../store/sagas';

const MypointScreenSP = dynamic(() => import('./MyPointScreenSP'));
const MypointScreenPC = dynamic(() => import('./MyPointScreenPC'));

interface Props {
  t(key: string, format?: object): string;
  isMobile: boolean;
  getPointHistoryRequest: (id: number) => void;
  point?: number;
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
}

function MypointScreen(props: Props) {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });
  const { isMobile, getPointHistoryRequest } = props;

  useEffect(() => {
    getPointHistoryRequest(1);
  }, [getPointHistoryRequest]);

  return (
    <>
      {isMobile ? (
        <MypointScreenSP {...props} />
      ) : (
        <MypointScreenPC {...props} />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  pointHistory: makeSelectPointHistory(),
});

const mapDispatchToProps = dispatch => {
  return {
    getPointHistoryRequest: (id: number) =>
      dispatch(getPointHistoryRequest(id)),
    getProductRequest: () => dispatch(getProductRequest()),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(MypointScreen) as React.ComponentType;
