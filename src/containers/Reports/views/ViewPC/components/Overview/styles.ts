import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    width: '49%',
    marginBottom: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  iconBattery: {
    width: 10,
    height: 17,
    marginRight: 10,
  },
}));

export { useStyles };
