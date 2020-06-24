import React, { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

// import Layout from 'components/Layout';
// import Features from 'components/Features';
// import Showcases from 'components/Showcases';

import saga from './store/sagas';
import reducer from './store/reducers';
import { loginRequestAction } from './store/actions';

export function Login({}) {
  useInjectSaga({ key: 'login', saga });
  useInjectReducer({ key: 'login', reducer });

  return <>Hihihihihi</>;
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch: any) {
  return { getShowcases: () => dispatch(loginRequestAction()) };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Login);
