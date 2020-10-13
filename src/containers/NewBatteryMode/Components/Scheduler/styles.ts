import { ListItem, makeStyles, withStyles } from '@material-ui/core';
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
  scheduleContainer: {},
  scheduleContent: {},
  scheduleCard: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  leftCard: {
    display: 'flex',
    alignItems: 'center',
    flex: '3.5',
    borderRight: '1.5px solid',
    margin: '0 10px',
  },
  scheduleDetail: {
    flex: 4,
  },
  scheduleSubDetail: {
    flex: '1.5',
    textAlign: 'center',
  },
  rightCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0.5',
  },
  scheduleAction: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  timer: {},
  activeCalender: {
    fontSize: 15,
    display: 'flex',
    textTransform: 'uppercase',
    margin: '10px 0',
  },
  scheduleName: {
    fontSize: 15,
  },
  scheduleNextStatus: {
    fontSize: 12,
  },
  scheduleStatus: {},
  notifications: {
    padding: 15,
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #fefefe',
  },
  day: {
    margin: 0,
    marginRight: 10,
    fontSize: 12,
  },
  typeBold: {
    fontWeight: 500,
  },
  typeNormal: {
    fontWeight: 300,
  },
  typeOff: {
    color: '#c9c9c9',
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

const ListItemStyle = withStyles(theme => ({
  root: {
    border: '1px solid #e0e0e0',
    justifyContent: 'space-between',
    alignItem: 'center',
    overFlow: 'hidden',
    margin: '10px 0',
    borderRadius: 4,
  },
}))(ListItem);
export { useStyles, ListItemStyle };
