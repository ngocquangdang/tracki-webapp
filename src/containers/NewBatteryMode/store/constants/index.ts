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
