import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';

import {
  changeStoreView,
  fetchDataProductsRequestAction,
  fetchDataCouponsRequestAction,
} from '@Containers/Store/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import storeReducer from './store/reducers';
import storeSaga from './store/sagas';
import {
  makeSelectViewMode,
  makeSelectProducts,
  makeSelectProductIds,
  makeIsLoading,
  makeSelectTotalProducts,
  makeSelectCoupons,
  makeSelectCouponIds,
} from './store/selectors';
import View from './view';

interface Props {
  viewMode: string;
  isMobile: boolean;
  changeStoreView(mode: string): void;
  fetchDataProducts(data: object): void;
  fetchDataCoupons(data: object): void;
  products: object;
  productIds: Array<number | string>;
  coupons: object;
  couponIds: Array<number | string>;
  isLoading: boolean;
  totalProducts: number;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function TrackingContainer(props: Props) {
  useInjectSaga({ key: 'store', saga: storeSaga });
  useInjectReducer({ key: 'store', reducer: storeReducer });

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  viewMode: makeSelectViewMode(),
  products: makeSelectProducts(),
  productIds: makeSelectProductIds(),
  isLoading: makeIsLoading(),
  totalProducts: makeSelectTotalProducts(),
  coupons: makeSelectCoupons(),
  couponIds: makeSelectCouponIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStoreView: (mode: string) => dispatch(changeStoreView(mode)),
  fetchDataProducts: (data: object) =>
    dispatch(fetchDataProductsRequestAction(data)),
  fetchDataCoupons: (data: object) =>
    dispatch(fetchDataCouponsRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(TrackingContainer) as React.ComponentType;
