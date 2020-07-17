import { NextPageContext } from 'next';
import { IncomingMessage } from 'http';

export type {
  AppWithStore,
  ReduxNextPageContext,
  ActionType,
  PayloadType,
} from './pages/App';

export type { IPage } from './pages/page';

export interface CookieMessage extends IncomingMessage {
  cookies: { [name: string]: string };
}

export interface CookiesPageContext extends NextPageContext {
  req: CookieMessage | undefined;
}

export interface AppInitialPropsWithAuth {
  authenticated: boolean;
}

export interface GlobalTypes {
  profile: object | null;
  tracker: {
    trackers: object | null;
    trackerIds: Array<number | string> | null;
    trackerPlans: object | null;
    [data: string]: any;
  };
  isLoading: boolean;
  errors: object | null;
}

export type { ITracker } from './tracker';
