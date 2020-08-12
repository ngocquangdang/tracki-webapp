import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'next-auth/client';
import cookie from 'cookie';
import Header from 'next/head';

import { theme } from '@Definitions/styled';
import { appWithTranslation } from '@Server/i18n';
import {
  AppWithStore,
  CookieMessage,
  AppInitialPropsWithAuth,
} from '@Interfaces';
import { wrapper } from '@Store';
import axiosClient from '@Utils/axios';
import cookieClient from '@Utils/cookie';

import { AuthProvider } from '../../providers/Auth';
import Snackbar from '@Containers/Snackbar';

import '@Static/scss/main.scss';

class WebApp extends App<AppWithStore, { isMobile: boolean }> {
  state = {
    isMobile: false,
  };

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
      authenticated = !!request.cookies[process.env.COOKIE_NAME || 'token'];
    }
    return { pageProps, authenticated };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    const { authenticated } = this.props;

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (authenticated) {
      if (cookieClient.checkCookie(process.env.COOKIE_NAME || 'token')) {
        axiosClient.setHeader(
          cookieClient.getCookie(process.env.COOKIE_NAME || 'token')
        );
      }
    }
    // detect size of mobile view
    if (window.innerWidth < 1023) {
      this.setState({ isMobile: true });
    }
  }

  render() {
    const { Component, pageProps, authenticated } = this.props;
    const { isMobile } = this.state;

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
            <Header>
              <title>
                GPS Tracker for Vehicles - Tracki GPS Tracking Device for Car,
                Kids
              </title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <link
                rel="shortcut icon"
                href="//cdn.shopify.com/s/files/1/0075/3677/1145/files/FAV-32X32_32x32.png?v=1555668978"
                type="image/png"
              />
            </Header>
            <Snackbar />
            <Component {...pageProps} isMobile={isMobile} />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    );
  }
}

export default wrapper.withRedux(appWithTranslation(WebApp));
