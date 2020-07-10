import { Store } from 'redux';
import { AppInitialProps } from 'next/app';
import { NextPageContext } from 'next';

interface AppStore extends Store {
  dispatch: any;
}

export interface AppWithStore extends AppInitialProps {
  store: AppStore;
  authenticated: boolean;
}

export interface ReduxNextPageContext extends NextPageContext {
  store: AppStore;
}

export interface ActionType {
  type: string;
  payload: Payload;
}

export interface PayloadType {
  [data: string]: any;
}
