import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { changeStoreView } from '@Containers/Store/store/actions';
import { useInjectReducer } from '@Utils/injectReducer';
import storeReducer from './store/reducers';
import { makeSelectViewMode, makeIsLoading } from './store/selectors';
import { firebaseLogEventRequest } from '@Utils/firebase';
import View from './view';

interface Props {
  viewMode: string;
  isMobile: boolean;
  changeStoreView(mode: string): void;
  isLoading: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function StoreContainer(props: Props) {
  useInjectReducer({ key: 'store', reducer: storeReducer });

  useEffect(() => firebaseLogEventRequest('stores_page', ''), []);
  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  viewMode: makeSelectViewMode(),
  isLoading: makeIsLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStoreView: (mode: string) => dispatch(changeStoreView(mode)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(StoreContainer) as React.ComponentType;
