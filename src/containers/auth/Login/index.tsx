import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { withTranslation } from '@Server/i18n';
import saga from './store/sagas';
import reducer from './store/reducers';
import {
  loginRequestAction,
  loginSocialNetworkRequestAction,
  resetErrorMessage,
} from './store/actions';
import {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
} from './store/selectors';
import ILoginPage from './interfaces';

import View from './views';

function Login(props: ILoginPage.IProps) {
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
  loginRequestAction: (data: ILoginPage.IStateLogin) =>
    dispatch(loginRequestAction(data)),
  resetErrorAction: () => dispatch(resetErrorMessage()),
  loginSocialNetworkRequestAction: (socialType: string, bodyData) =>
    dispatch(loginSocialNetworkRequestAction(socialType, bodyData)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth', 'tracker'])
)(Login) as React.ComponentType;
