import React from 'react';
import App, { AppInitialProps, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { ThemeProvider } from 'styled-components';

import { theme } from '@Definitions/styled';
import { appWithTranslation } from '@Server/i18n';
import { AppWithStore } from '@Interfaces';
import { configureStore as makeStore } from '@Store';

import '@Static/scss/main.scss';

const initialState = {};

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

  render() {
    const { Component, pageProps, store } = this.props;
    console.log('this.props', this.props);

    console.log('store', store);

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(makeStore())(appWithTranslation(WebApp));
