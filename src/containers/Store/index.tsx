import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';

import {
  changeStoreView,
  fetchDataProductsRequestAction,
} from '@Containers/Store/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import storeReducer from './store/reducers';
import storeSaga from './store/sagas';
import {
  makeSelectViewMode,
  makeSelectProducts,
  makeSelectProductIds,
} from './store/selectors';
import View from './view';

interface Props {
  viewMode: string;
  isMobile: boolean;
  changeStoreView(mode: string): void;
  fetchDataProducts(): void;
  products: object;
  productIds: Array<number | string> | null;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function TrackingContainer(props: Props) {
  const { fetchDataProducts, ...rest } = props;
  useInjectSaga({ key: 'store', saga: storeSaga });
  useInjectReducer({ key: 'store', reducer: storeReducer });

  useEffect(() => {
    fetchDataProducts();
  }, [fetchDataProducts]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  viewMode: makeSelectViewMode(),
  products: makeSelectProducts(),
  productIds: makeSelectProductIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStoreView: (mode: string) => dispatch(changeStoreView(mode)),
  fetchDataProducts: () => dispatch(fetchDataProductsRequestAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(TrackingContainer) as React.ComponentType;
