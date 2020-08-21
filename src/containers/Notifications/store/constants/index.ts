export const ALARM_TYPES = [
  { value: 'all', content: 'Show All Type' },
  { value: 'MOVEMENT', content: 'Start moving' },
  { value: 'SPEED', content: 'Speed violations' },
  { value: 'GEOZONE', content: 'Geo-fence crossed' },
  { value: 'BATTERY', content: 'Low battery alert' },
  { value: 'SOS', content: 'SOS' },
  { value: 'LEFT', content: 'Left key pressed' },
  { value: 'RIGHT', content: 'Right key pressed' },
];

export const SORT_BY_OPTION = [
  { value: 'normal', content: 'Select Order' },
  { value: 'new', content: 'Newest' },
  { value: 'old', content: 'Oldest' },
  { value: 'read', content: 'Read' },
  { value: 'unread', content: 'Unread' },
];

export const FETCH_NOTIFICATION_REQUESTED =
  'Tracki/FETCH_NOTIFICATION_REQUESTED';
export const FETCH_NOTIFICATION_SUCCEED = 'Tracki/FETCH_NOTIFICATION_SUCCEED';
export const FETCH_NOTIFICATION_FAILED = 'Tracki/FETCH_NOTIFICATION_FAILED';
