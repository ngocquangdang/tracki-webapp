import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchDataCouponsRequestAction } from '@Containers/CouponsStore/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import saga from './store/reducers';
import reducer from './store/sagas';
import {
  makeIsLoading,
  makeSelectCoupons,
  makeSelectCouponIds,
} from './store/selectors';
import { ViewMobile, ViewPC } from './views';

interface Props {
  isMobile: boolean;
  fetchDataCoupons(data: object): void;
  coupons: object;
  couponIds: Array<number | string>;
  isLoading: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function CouponsContainer(props: Props) {
  useInjectReducer({ key: 'coupon', reducer });
  useInjectSaga({ key: 'coupon', saga });

  if (props.isMobile) return <ViewMobile />;

  return <ViewPC {...props} />;
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeIsLoading(),
  coupons: makeSelectCoupons(),
  couponIds: makeSelectCouponIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchDataCoupons: (data: object) =>
    dispatch(fetchDataCouponsRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(CouponsContainer) as React.ComponentType;
