import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from '@Definitions/styled';
import { appWithTranslation } from '@Server/i18n';
import { AppWithStore } from '@Interfaces';
import { wrapper } from '@Store';

import '@Static/scss/main.scss';

class WebApp extends App<AppWithStore> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default wrapper.withRedux(appWithTranslation(WebApp));
