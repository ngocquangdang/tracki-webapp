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

export const CHANGE_REPORT_VIEW_MODE = 'Tracki/CHANGE_REPORT_VIEW_MODE';
