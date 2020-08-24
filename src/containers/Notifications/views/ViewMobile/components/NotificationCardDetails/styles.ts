import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  iconInfor: {
    fontSize: '32px',
    color: 'rgba(255, 255, 255, 0.87)',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    width: '100%',
    height: 80,
    borderRadius: 4,
    border: ' 1px solid rgba(255, 255, 255, 0.12)',
    marginBottom: 5,
  },
  content: {
    display: 'flex',
    padding: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  detailAlert: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  deviceName: {
    display: 'flex',
    fontSize: 12,
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.87)',
    lineHeight: 1.5,
  },
  typeAlert: {
    display: 'flex',
    color: 'rgba(255, 255, 255, 0.87)',
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 1.5,
  },
  viewMap: {
    display: 'flex',
    fontSize: 12,
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.87)',
    lineHeight: 1.5,
  },
  statusSpeed: {
    display: 'flex',
  },
  iconDashboard: {
    color: 'rgba(255, 255, 255, 0.87)',
    marginRight: 5,
  },
  speed: {
    color: 'rgba(255, 255, 255, 0.87)',
    fontSize: 12,
    fontWeight: 500,
  },
}));

export { useStyles };
