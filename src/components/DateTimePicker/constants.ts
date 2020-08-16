import moment from 'moment';

const DATE_OPTIONS = [
  { value: moment().subtract(1, 'hours').unix(), content: 'Last 1 Hours' },
  { value: moment().subtract(2, 'hours').unix(), content: 'Last 2 Hours' },
  { value: moment().subtract(6, 'hours').unix(), content: 'Last 6 Hours' },
  { value: moment().subtract(12, 'hours').unix(), content: 'Last 12 Hours' },
  { value: moment().subtract(24, 'hours').unix(), content: 'Last 24 Hours' },
  { value: moment().subtract(2, 'days').unix(), content: 'Last 2 Days' },
  { value: moment().subtract(7, 'days').unix(), content: 'Last 7 Days' },
  { value: 'date_range', content: 'Date Range' },
  { value: 'specific_date', content: 'Specific date + Hourly Range' },
];

export { DATE_OPTIONS };
