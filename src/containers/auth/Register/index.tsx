import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dynamic from 'next/dynamic';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import saga from './store/sagas';
import reducer from './store/reducers';
import { registerRequestAction } from './store/actions';

import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
} from './store/selectors';
import IRegisterPage from './interfaces';

const View = dynamic(() => import('./view'));

function Register(props: IRegisterPage.IProps) {
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer });

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  errorMessage: makeSelectErrorMessage(),
});

const mapDispatchToProps = (dispatch: any) => ({
  registerRequestAction: (data: IRegisterPage.RegisterState) =>
    dispatch(registerRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Register) as React.ComponentType;