import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,
    borderBottom: '1px solid #dedede',
    backgroundColor: '#ffffff',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  backIcon: {
    color: '#4b4f56',
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: '#4b4f56',
    margin: 0,
  },
  iconGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    fill: '#666666',
  },
  flagIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
    fill: '#666666',
  },
}));

export { useStyles };
