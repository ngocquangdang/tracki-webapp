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
  isLoading: boolean;
  errors: object | null;
  mapTile: string;
  mapAction: string;
  mapView: string;
  showGeofences: boolean;
  showTrackerName: boolean;
}

export interface TrackerDataTypes {
  tracker: {
    trackers: object;
    trackerIds: Array<number | string> | null;
    trackerPlans: object | null;
    selectedTrackerId: number | null;
    settings: object;
    [data: string]: any;
  };
  geofence: {
    geofences: object;
    geofenceIds: Array<number | string> | null;
    selectedGeofenceId: number | null;
    editGeofenceId: number | null;
    [data: string]: any;
  };
  alert: {
    alerts: object;
    alertsIds: Array<number | string> | null;
  };
  smsCounter: object | null;
  subscription: object | null;
  dataLink: object | null;
  dataSendBeep: object | null;
  isBeep: boolean | null;
  isFetchingTracker: boolean | null;
  errors: object | null;
}

export interface TrackingDataTypes {
  trackingIds: Number[];
  pointTrackingIndex: number;
  viewMode: string;
  errors: object | null;
  histories: object;
  historyIds: object;
  alarms: object;
}

export interface WalletDataType {
  isRequestProduct: boolean;
  myWallet: {
    isRequestMyWallet: boolean;
    point: number | string;
    my_wallet: number | string;
    referral_code: string;
  };
  adv: {
    isRequestAdv: boolean;
    advs: object;
    advIds: number[];
  };
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
  tracker: {
    trackers: object;
    trackerIds: number[];
  };
  accesory: {
    accesories: object;
    accesoryIds: number[];
  };
  subscriptionPlan: object[];
  smsPlan: object[];
}

export type {
  ITracker,
  IGeofence,
  IGeoRectangle,
  IGeoCircle,
  IGeoPolygon,
} from './tracker';
