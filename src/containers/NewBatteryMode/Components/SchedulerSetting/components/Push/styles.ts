import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  settingCard: {},
  title: {
    fontSize: '17px',
    fontWeight: 500,
    color: '#168449',
    margin: '10px 0',
  },
  option: {},
  statusMode: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eeeeee',
    padding: '10px 0',
  },
  typeOption: {
    cursor: 'pointer',
  },
  line: {
    margin: '20px 0',
  },
}));

export { useStyles };
