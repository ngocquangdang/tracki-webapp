import React, { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';


import View from './view'

import saga from './store/sagas';
import reducer from './store/reducers';
import { forgotRequestAction } from './store/actions';

export function ForgotPassword(props: any) {
  useInjectSaga({ key: 'forgot', saga });
  useInjectReducer({ key: 'forgot', reducer });

  return <View {...props}/>;
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch: any) {
  return { getShowcases: () => dispatch(forgotRequestAction()) };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ForgotPassword);
