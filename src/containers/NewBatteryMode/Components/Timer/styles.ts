import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 14,
  },
  notifyHeader: {
    display: 'flex',
    alignItems: 'center',
    color: '#168449',
  },
  notifyTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  notifySubTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  notifySubTitleContent: {
    fontSize: 15,
    fontWeight: 500,
    margin: '5px 0',
  },
  notifications: {
    padding: 15,
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #fefefe',
  },
  timerGroup: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  sleep: {},
  awake: {},
  timeData: {
    fontSize: 32,
  },
  titleRangeTime: {
    textAlign: 'center',
    fontWeight: 500,
  },
  timeSetting: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconNotifi: {
    width: 20,
    height: 20,
    marginRight: 10,
    color: '#168449',
  },
  listSubNotifi: {
    paddingLeft: 15,
  },
  iconNotifiHeader: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
}));

export { useStyles };
