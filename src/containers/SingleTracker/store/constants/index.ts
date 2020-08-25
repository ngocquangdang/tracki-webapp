export const GET_TRACKER_SETTINGS_REQUESTED =
  'Tracki/GET_TRACKER_SETTINGS_REQUESTED';
export const GET_TRACKER_SETTINGS_SUCCEED =
  'Tracki/GET_TRACKER_SETTINGS_SUCCEED';
export const GET_TRACKER_SETTINGS_FAILED = 'Tracki/GET_TRACKERS_FAILED';

export const UPDATE_TRACKER_SETTINGS_REQUESTED =
  'TRACKI/UPDATE_TRACKER_SETTINGS_REQUESTED';
export const UPDATE_TRACKER_SETTINGS_SUCCEED =
  'TRACKI/UPDATE_TRACKER_SETTINGS_SUCCEED';
export const UPDATE_TRACKER_SETTINGS_FAILED =
  'TRACKI/UPDATE_TRACKER_SETTINGS_FAILED';

export const UPDATE_TRACKE = 'TRACKI/UPDATE_TRACKE';

export const ACTIVE_LINK_SHARE_REQUESTED = 'TRACKI/ACTIVE_LINK_SHARE_REQUESTED';
export const ACTIVE_LINK_SHARE_SUCCEED = 'TRACKI/ACTIVE_LINK_SHARE_SUCCEED';
export const ACTIVE_LINK_SHARE_FAILED = 'TRACKI/ACTIVE_LINK_SHARE_FAILED';

export const DEACTIVE_LINK_SHARE_REQUESTED =
  'TRACKI/DEACTIVE_LINK_SHARE_REQUESTED';
export const DEACTIVE_LINK_SHARE_SUCCEED = 'TRACKI/DEACTIVE_LINK_SHARE_SUCCEED';
export const DEACTIVE_LINK_SHARE_FAILED = 'TRACKI/DEACTIVE_LINK_SHARE_FAILED';

export const SEND_BEEP_REQUESTED = 'TRACKI/SEND_BEEP_REQUESTED';
export const SEND_BEEP_SUCCEED = 'TRACKI/SEND_BEEP_SUCCEED';
export const SEND_BEEP_FAILED = 'TRACKI/SEND_BEEP_FAILED';

export const RESET_BEEP = 'TRACKI/RESET_BEEP';

export const UPDATE_PREFERANCES_TRACKER_REQUESTED =
  'TRACKI/UPDATE_PREFERANCES_TRACKER_REQUESTED';
export const UPDATE_PREFERANCES_TRACKER_SUCCESSED =
  'TRACKI/UPDATE_PREFERANCES_TRACKER_SUCCESSED';
export const UPDATE_PREFERANCES_TRACKER_FAILED =
  'TRACKI/UPDATE_PREFERANCES_TRACKER_FAILED';

export const GET_DEVICE_SETTING_REQUESTED =
  'Tracki/GET_DEVICE_SETTING_REQUESTED';
export const GET_DEVICE_SETTING_SUCCEED = 'Tracki/GET_DEVICE_SETTING_SUCCEED';
export const GET_DEVICE_SETTING_FAILED = 'Tracki/GET_DEVICE_SETTING_FAILED';

export const LOCATION_UPDATE_OPTIONS = [
  { value: '0_1_minutes', content: 'Off' },
  { value: '1_1_minutes', content: 'Once every 1 minute' },
  { value: '2_1_minutes', content: 'Once every 2 minutes' },
  { value: '5_1_minutes', content: 'Once every 5 minutes' },
  { value: '10_1_minutes', content: 'Once every 10 minutes' },
  { value: '30_1_minutes', content: 'Once every 30 minutes' },
  { value: '60_1_minutes', content: 'Once every 1 hour' },
  { value: '120_1_minutes', content: 'Once every 2 hours' },
  { value: '240_1_minutes', content: 'Once every 4 hours' },
];

export const HISTORY_OPTIONS = [
  { value: '1_1_hours', content: 'Last 1 Hours' },
  { value: '2_1_hours', content: 'Last 2 Hours' },
  { value: '6_1_hours', content: 'Last 6 Hours' },
  { value: '12_1_hours', content: 'Last 12 Hours' },
  { value: '24_1_hours', content: 'Last 24 Hours' },
  { value: '48_1_hours', content: 'Last 2 Days' },
  { value: '168_1_hours', content: 'Last 7 Days' },
  { value: '120_1_hours', content: 'Date Range' },
  { value: '240_1_hours', content: 'Specific date + Hourly Range' },
];

export const SHARE_LOCATION_OPTIONS = [
  { value: '3600', content: '1 Hour' },
  { value: '18000', content: '5 Hours' },
  { value: '36000', content: '10 Hours' },
  { value: '86400', content: '24 Hours' },
  { value: '259200', content: '3 Days' },
  { value: '604800', content: '7 Days' },
  { value: '-1', content: 'Unlimited' },
];
