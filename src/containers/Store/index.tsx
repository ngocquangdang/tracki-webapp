import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';

import { changeStoreView } from '@Containers/Store/store/actions';
// import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import storeReducer from './store/reducers';
import { makeSelectViewMode } from './store/selectors';
import View from './view';

interface Props {
  viewMode: string;
  isMobile: boolean;
  changeStoreView(mode: string): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function TrackingContainer(props: Props) {
  // useInjectSaga({ key: 'store', saga: storeSaga });
  useInjectReducer({ key: 'store', reducer: storeReducer });

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  viewMode: makeSelectViewMode(),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStoreView: (mode: string) => dispatch(changeStoreView(mode)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(TrackingContainer) as React.ComponentType;
