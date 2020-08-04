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

export const GET_LIST_CONTACT_REQUESTED = 'Tracki/GET_LIST_CONTACT_REQUESTED';
export const GET_LIST_CONTACT_SUCCESSED = 'Tracki/GET_LIST_CONTACT_SUCCESSED';
export const GET_LIST_CONTACT_FAILED = 'Tracki/GET_LIST_CONTACT_FAILED';
export const SEARCH_CONTACT_REQUESTED = 'Tracki/SEARCH_CONTACT_REQUESTED';
export const SEARCH_CONTACT_SUCCEED = 'Tracki/SEARCH_CONTACT_SUCCEED';
export const SEARCH_CONTACT_FAILED = 'Tracki/SEARCH_CONTACT_FAILED';
