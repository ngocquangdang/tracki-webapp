import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';

import { fetchDataProductsRequestAction } from '@Containers/ProductsStore/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import reducer from './store/reducers';
import saga from './store/sagas';
import {
  makeSelectProducts,
  makeSelectProductIds,
  makeIsLoading,
  makeSelectTotalProducts,
} from './store/selectors';

import { ViewMobile, ViewPC } from './views';

interface Props {
  isMobile: boolean;
  fetchDataProducts(data: object): void;
  products: object;
  productIds: Array<number | string>;
  totalProducts: number;
  isLoading: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function ProductsContainer(props: Props) {
  useInjectSaga({ key: 'product', saga });
  useInjectReducer({ key: 'product', reducer });

  if (props.isMobile) return <ViewMobile />;

  return <ViewPC {...props} />;
}

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  productIds: makeSelectProductIds(),
  isLoading: makeIsLoading(),
  totalProducts: makeSelectTotalProducts(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchDataProducts: (data: object) =>
    dispatch(fetchDataProductsRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(ProductsContainer) as React.ComponentType;
