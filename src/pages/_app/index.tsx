import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'next-auth/client';
import cookie from 'cookie';

import { theme } from '@Definitions/styled';
import { appWithTranslation } from '@Server/i18n';
import {
  AppWithStore,
  CookieMessage,
  AppInitialPropsWithAuth,
} from '@Interfaces';
import { wrapper } from '@Store';
import { AuthProvider } from '../../providers/Auth';

import '@Static/scss/main.scss';

class WebApp extends App<AppWithStore> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps & AppInitialPropsWithAuth> {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    let authenticated = false;
    const request = ctx.req as CookieMessage;
    if (request) {
      request.cookies = cookie.parse(request.headers.cookie || '');
      authenticated = !!request.cookies['token'];
    }
    return { pageProps, authenticated };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps, authenticated } = this.props;

    return (
      <Provider
        options={{
          clientMaxAge: 0,
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
        <AuthProvider authenticated={authenticated}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    );
  }
}

export default wrapper.withRedux(appWithTranslation(WebApp));
