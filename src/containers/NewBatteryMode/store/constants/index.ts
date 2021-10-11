export const DAY = [
  { key: 'mo', value: 'Monday' },
  { key: 'tu', value: 'Tuesday' },
  { key: 'we', value: 'Wednesday' },
  { key: 'th', value: 'Thursday' },
  { key: 'fr', value: 'Friday' },
  { key: 'sa', value: 'Saturday' },
  { key: 'su', value: 'Sunday' },
];

export const initialScheduler = [
  {
    id: 1,
    time: { startTime: 1601280019, endTime: null },
    day: ['mo', 'tu', 'su'],
    name: 'xxxx',
    status: 'ON',
    type: 'ON',
  },
  {
    id: 2,
    time: { startTime: 1601280019, endTime: 1601269384 },
    day: ['tu', 'th', 'su'],
    name: 'yyyy',
    status: 'ON/OFF',
    type: 'ON/OFF',
  },
];

export const HIBERNATE_OPTION = [
  {
    label: 'Update location every 2 hours',
    key: '120',
    value: '120',
    text: '12 to 15 days battery life',
  },
  {
    label: 'Update location every 3 hours',
    key: '180',
    value: '180',
    text: '15 to 18 days battery life',
  },
  {
    label: 'Update location every 4 hours',
    key: '240',
    value: '240',
    text: '18 to 22 days battery life',
  },
  {
    label: 'Update location every 6 hours',
    key: '360',
    value: '360',
    text: '22 to 26 days battery life',
  },
  {
    label: 'Update location every 8 hours',
    key: '480',
    value: '480',
    text: '26 to 30 days battery life',
  },
  {
    label: 'Update location every 12 hours',
    key: '720',
    value: '720',
    text: '50 to 60 days battery life',
  },
  {
    label: 'Update location every 24 hours',
    key: '1440',
    value: '1440',
    text: '75 to 90 days battery life',
  },
];