import React, { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';


import View from './view'

import saga from './store/sagas';
import reducer from './store/reducers';
import { loginRequestAction } from './store/actions';

export function Login(props: any) {
  useInjectSaga({ key: 'login', saga });
  useInjectReducer({ key: 'login', reducer });

  return <View {...props}/>;
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch: any) {
  return { getShowcases: () => dispatch(loginRequestAction()) };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Login);
