export const TAB_KEYS = ['overview', 'history', 'stop', 'trip', 'speed'];

export const objKeyTranslate = {
  SPEED: 'notifications:speed_violation',
  GEOZONE: 'notifications:geo_fence_crossed',
  MOVEMENT: 'notifications:start_moving',
  BATTERY: 'notifications:low_battery',
  SOS: 'notifications:sos_alert',
  LEFT: 'notifications:left_click',
  RIGHT: 'notifications:right_click',
};

export const objKeyGetImage = {
  SPEED: 'ic-alert-speed-violation.svg',
  GEOZONE: 'ic-alert-geofence.svg',
  MOVEMENT: 'ic-alert-start-moving.svg',
  BATTERY: 'ic-alert-battery.svg',
  SOS: 'ic-alert-SOS.svg',
  LEFT: 'ic-alert-left-click.svg',
  RIGHT: 'ic-alert-right-click.svg',
};

export const SORT_BY_OPTION = [
  { value: 'normal', content: 'Select Order' },
  { value: 'new', content: 'Newest' },
  { value: 'old', content: 'Oldest' },
];

export const headers = [
  { label: 'DATE', key: 'date' },
  { label: 'TIME', key: 'time' },
  { label: 'LATITUDE', key: 'lat' },
  { label: 'LONGITUDE', key: 'lng' },
  { label: 'SPEED(MPH)', key: 'speed' },
  { label: 'BATTERY LEVEL(%)', key: 'battery' },
];

export const FETCH_NOTIFICATION_UNREAD_REQUESTED =
  'Tracki/FETCH_NOTIFICATION_UNREAD_REQUESTED';
export const FETCH_NOTIFICATION_UNREAD_SUCCEED =
  'Tracki/FETCH_NOTIFICATION_UNREAD_SUCCEED';
export const FETCH_NOTIFICATION_UNREAD_FAILED =
  'Tracki/FETCH_NOTIFICATION_UNREAD_FAILED';

export const FETCH_HISTORY_RECENT_STOP_REQUESTED =
  'Tracki/FETCH_HISTORY_RECENT_STOP_REQUESTED';
export const FETCH_HISTORY_RECENT_STOP_SUCCEED =
  'Tracki/FETCH_HISTORY_RECENT_STOP_SUCCEED';
export const FETCH_HISTORY_RECENT_STOP_FAILED =
  'Tracki/FETCH_HISTORY_RECENT_STOP_FAILED';

export const FETCH_HISTORY_LOGS_REQUESTED =
  'Tracki/FETCH_HISTORY_LOGS_REQUESTED';
export const FETCH_HISTORY_LOGS_SUCCEED = 'Tracki/FETCH_HISTORY_LOGS_SUCCEED';
export const FETCH_HISTORY_LOGS_FAILED = 'Tracki/FETCH_HISTORY_LOGS_FAILED';

export const FETCH_HISTORY_SPEED_REQUESTED =
  'Tracki/FETCH_HISTORY_SPEED_REQUESTED';
export const FETCH_HISTORY_SPEED_SUCCEED = 'Tracki/FETCH_HISTORY_SPEED_SUCCEED';
export const FETCH_HISTORY_SPEED_FAILED = 'Tracki/FETCH_HISTORY_SPEED_FAILED';

export const FETCH_HISTORY_TRIP_REQUESTED =
  'Tracki/FETCH_HISTORY_TRIP_REQUESTED';
export const FETCH_HISTORY_TRIP_SUCCEED = 'Tracki/FETCH_HISTORY_TRIP_SUCCEED';
export const FETCH_HISTORY_TRIP_FAILED = 'Tracki/FETCH_HISTORY_TRIP_FAILED';

export const CHANGE_REPORT_VIEW_MODE = 'Tracki/CHANGE_REPORT_VIEW_MODE';

export const SET_POINT_SELECTED = 'Tracki/SET_POINT_SELECTED';

export const SET_OPTIMIZED_TRIP = 'Tracki/SET_OPTIMIZED_TRIP';

export const CHANGE_MODE_VIEW_MAP = 'Tracki/CHANGE_MODE_VIEW_MAP';
