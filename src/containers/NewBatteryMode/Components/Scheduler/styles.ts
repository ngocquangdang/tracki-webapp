import { ListItem, makeStyles, withStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 14,
  },
  notifyHeader: {},
  notifyTitle: {},
  notifySubTitle: {},
  notifySubTitleContent: {
    fontSize: 15,
    fontWeight: 300,
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
  scheduleAction: {},
  timer: {},
  activeCalender: {
    fontSize: 15,
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
