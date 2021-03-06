import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { SessionProvider } from 'next-auth/react';
import cookie from 'cookie';
import Header from 'next/head';

import { theme } from '@Definitions/styled';
import { AppWithStore, CookieMessage } from '@Interfaces';
import { wrapper } from '@Store';
import axiosClient from '@Utils/axios';
import cookieClient from '@Utils/cookie';
import { GEOBOT_URL } from '@Definitions/app';

import { AuthProvider } from '../../providers/Auth';
import Snackbar from '@Containers/Snackbar';
import { isMobileView } from '@Utils/helper';
import nextI18NextConfig from '../../../next-i18next.config';

import '@Static/scss/main.scss';
import { appWithTranslation } from 'next-i18next';

interface Props {
  isMobile: boolean;
}

class WebApp extends App<AppWithStore & Props> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    let authenticated = false;
    const request = ctx.req as CookieMessage;
    if (request) {
      request.cookies = cookie.parse(request.headers.cookie || '');
      authenticated = !!request.cookies[process.env.COOKIE_NAME || 'token'];
    }
    const isMobile = isMobileView(ctx.req);
    return { pageProps, authenticated, isMobile };
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
  }

  render() {
    const { Component, pageProps, authenticated, isMobile } = this.props;
    return (
      <SessionProvider
        // options={{
        //   clientMaxAge: 0,
        //   keepAlive: 0,
        // }}
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
              <script async src={GEOBOT_URL}></script>
            </Header>
            <Snackbar isMobile={isMobile} />
            <Component {...pageProps} isMobile={isMobile} />
          </ThemeProvider>
        </AuthProvider>
      </SessionProvider>
    );
  }
}

export default wrapper.withRedux(appWithTranslation(WebApp, nextI18NextConfig));
