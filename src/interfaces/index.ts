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
  showGeofences: boolean;
  showTrackerName: boolean;
}

export interface TrackerDataTypes {
  tracker: {
    trackers: object;
    trackerIds: Array<number | string> | null;
    trackerPlans: object | null;
    selectedTrackerId: number | null;
    [data: string]: any;
  };
  geofence: {
    geofences: object;
    geofenceIds: Array<number | string> | null;
    selectedGeofenceId: number | null;
    editGeofenceId: number | null;
    [data: string]: any;
  };
  settings: object;
  dataLink: object | null;
  dataSendBeep: object | null;
  isBeep: boolean | null;
  errors: object | null;
}

export type { ITracker, IGeofence } from './tracker';
