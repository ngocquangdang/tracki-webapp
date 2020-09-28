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
    color: ' #168449',
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
  hibernateOption: {
    marginTop: 15,
  },
  radiobutton: {
    display: 'flex',
    flexDirection: 'column',
  },
  subOption: {
    marginLeft: 30,
    fontSize: 14,
    fontWeight: 400,
  },
  iconNotifi: {
    width: 20,
    height: 20,
    marginRight: 10,
    color: '#168449',
  },
  listSubNotifi: {
    paddingLeft: 25,
    display: 'flex',
    alignItems: 'center',
  },
  iconNotifiHeader: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  selection: {
    fontSize: 15,
    background: '#eeeeee',
    margin: '15px 0 5px',
    color: '#168449',
  },
}));

export { useStyles };
