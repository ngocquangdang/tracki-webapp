import React, { memo, useState, useEffect } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import WebView from './view/web';
import MobileView from './view/mobile';

import saga from './store/sagas';
import reducer from './store/reducers';
import { loginRequestAction } from './store/actions';
import { withTranslation } from '@Server/i18n';

export function Login(props: any) {
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer });

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const {width} = window.screen
    setWidth(width);
  }, []);

  if (width > 959.95) {
    return <WebView {...props} />;
  }
  return <MobileView {...props} />;
 
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch: any) {
  return { getShowcases: () => dispatch(loginRequestAction()) };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, withTranslation(['auth']))(Login) as React.ComponentType;