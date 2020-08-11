import moment from 'moment';

export const CHANGE_TRACKERS_TRACKING = 'Tracki/CHANGE_TRACKERS_TRACKING';

export const GET_HISTORY_TRACKER_REQUESTED =
  'Tracki/GET_HISTORY_TRACKER_REQUESTED';
export const GET_HISTORY_TRACKER_SUCCEED = 'Tracki/GET_HISTORY_TRACKER_SUCCEED';
export const GET_HISTORY_TRACKER_FAILED = 'Tracki/GET_HISTORY_TRACKER_FAILED';

export const DATE_OPTIONS = [
  { value: moment().subtract(1, 'hours').unix(), content: 'Last 1 Hours' },
  { value: moment().subtract(2, 'hours').unix(), content: 'Last 2 Hours' },
  { value: moment().subtract(6, 'hours').unix(), content: 'Last 6 Hours' },
  { value: moment().subtract(12, 'hours').unix(), content: 'Last 12 Hours' },
  { value: moment().subtract(24, 'hours').unix(), content: 'Last 24 Hours' },
  { value: moment().subtract(2, 'days').unix(), content: 'Last 2 Days' },
  { value: moment().subtract(7, 'days').unix(), content: 'Last 7 Days' },
  { value: '120_1_hours', content: 'Date Range' },
  { value: '240_1_hours', content: 'Specific date + Hourly Range' },
];
export const CHANGE_TRACKING_VIEW = 'Tracki/CHANGE_TRACKING_VIEW';
