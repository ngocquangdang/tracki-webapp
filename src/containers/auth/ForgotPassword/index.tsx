import React, { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { PayloadType } from '@Interfaces';

import View from './view';
import saga from './store/sagas';
import reducer from './store/reducers';
import { forgotRequestAction, confirmCodeRequestAction } from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectEmail,
} from './store/selectors';
import IForgotPage from './interfaces';

function ForgotPassword(props: IForgotPage.IProps) {
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer });

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  email: makeSelectEmail(),
});

const mapDispatchToProps = (dispatch: any) => ({
  forgotRequestAction: (data: PayloadType) =>
    dispatch(forgotRequestAction(data)),
  confirmCodeRequestAction: (data: PayloadType) =>
    dispatch(confirmCodeRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(ForgotPassword) as React.ComponentType;
