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
// import LocalStorage from '@Utils/localStorage';
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
      console.log('request', request.cookies['next-i18next']);
      authenticated = !!request.cookies['next-i18next'];
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

    // const localStorage = new LocalStorage();
    // const authenticated = localStorage.checkItem('token');

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

// WebApp.getInitialProps = async (
//   appContext
// ): Promise<AppInitialProps & AppWithStore> => {
//   const localStorage = new LocalStorage();
//   const authenticated = localStorage.checkItem('token');

//   // Call the page's `getInitialProps` and fill `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps, authenticated };
// };

export default wrapper.withRedux(appWithTranslation(WebApp));
