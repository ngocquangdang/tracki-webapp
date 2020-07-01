import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dynamic from 'next/dynamic';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';
import { withTranslation } from '@Server/i18n';
import saga from './store/sagas';
import reducer from './store/reducers';
import { loginRequestAction } from './store/actions';
import { makeSelectErrors, makeSelectIsRequesting } from './store/selectors';
import ILoginPage from './interfaces';

const WebView = dynamic(() => import('./views/web'));
const MobileView = dynamic(() => import('./views/mobile'));

function Login(props: ILoginPage.IProps) {
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer });
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const { width } = window.screen;
    setWidth(width);
  }, []);

  if (width > 959.95) {
    return <WebView {...props} />;
  }
  return <MobileView {...props} />;
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
});

const mapDispatchToProps = (dispatch: any) => ({
  loginRequestAction: (data: ILoginPage.IStateLogin) => dispatch(loginRequestAction(data))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(Login) as React.ComponentType;
