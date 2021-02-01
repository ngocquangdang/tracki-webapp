import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { firebaseLogEventRequest } from '@Utils/firebase';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { PayloadType } from '@Interfaces';

import saga from './store/sagas';
import reducer from './store/reducers';
import { updatePasswordRequestAction } from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectPassword,
} from './store/selections';
import IForgotPage from './interfaces';

import View from './views';

function ChangePasswordContainer(props: IForgotPage.IProps) {
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer });
  firebaseLogEventRequest('settings_page', 'change_password_page');

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
  password: makeSelectPassword(),
});

const mapDispatchToProps = (dispatch: any) => ({
  updatePasswordRequestAction: (data: PayloadType) =>
    dispatch(updatePasswordRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(ChangePasswordContainer) as React.ComponentType;
