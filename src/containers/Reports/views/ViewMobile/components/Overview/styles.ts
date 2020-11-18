import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    padding: '10px 15px',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  card: {
    marginBottom: 30,
  },
  iconBattery: {
    width: 10,
    height: 17,
    marginRight: 10,
  },
}));

export { useStyles };
