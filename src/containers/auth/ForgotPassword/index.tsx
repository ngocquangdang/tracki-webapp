import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { PayloadType } from '@Interfaces';

import saga from './store/sagas';
import reducer from './store/reducers';
import {
  forgotRequestAction,
  confirmCodeRequestAction,
  resetErrorMessage,
  resetPasswordRequestAction,
  resetStore,
} from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectCode,
} from './store/selectors';
import IForgotPage from './interfaces';

import View from './views';

function ForgotPassword(props: IForgotPage.IProps) {
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer });

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  code: makeSelectCode(),
});

const mapDispatchToProps = (dispatch: any) => ({
  forgotRequestAction: (data: PayloadType) =>
    dispatch(forgotRequestAction(data)),
  confirmCodeRequestAction: (data: PayloadType) =>
    dispatch(confirmCodeRequestAction(data)),
  confirmPasswordRequestAction: (data: PayloadType) =>
    dispatch(resetPasswordRequestAction(data)),
  resetErrorAction: () => dispatch(resetErrorMessage()),
  resetStore: () => dispatch(resetStore()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(ForgotPassword) as React.ComponentType;
