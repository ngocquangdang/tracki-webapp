import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  settingCard: {},
  title: {
    fontSize: '18px',
    fontWeight: 500,
  },
  option: {},
  statusMode: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeOption: {
    cursor: 'pointer',
  },
  line: {
    margin: '20px 0',
  },
}));

export { useStyles };
