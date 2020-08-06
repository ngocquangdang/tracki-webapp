import { makeStyles } from '@material-ui/core';

const COLOR1 = '#1a1a1a';
const ACTIVE_COLOR = '#168449';
const BG_COLOR = '#eeeeee';

const useStyles = makeStyles(theme => ({
  searchContainer: {
    borderWidth: 1,
    padding: '0 16px',
  },
  container: {
    marginTop: 60,
  },
  content: {},
  title1: {
    fontSize: 16,
    lineHeight: '19px',
    color: COLOR1,
  },
  grid: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    left: -16,
    position: 'relative',
  },
  head: {
    height: 60,
    backgroundColor: '#fafafa',
    width: '100%',
    padding: '0 16px',
    display: 'flex',
  },
  avatar: {
    backgroundColor: BG_COLOR,
  },
  avtActive: {
    backgroundColor: ACTIVE_COLOR,
  },
  mgAuto: {
    margin: 'auto 0',
  },
  inputWrap: {
    padding: '10px 16px 20px 16px',
  },
  block: {
    padding: '20px 16px',
    borderTop: '1px solid rgba(0, 0, 0, 0.14)',
  },
  text: {
    fontSize: 14,
    lineHeight: '18px',
  },
  pickColor: {
    marginTop: 15,
    width: '60px',
  },
  geoSize: {
    display: 'flex',
    padding: '26px 0px',
    justifyContent: 'space-around',
    '& p': {
      color: COLOR1,
      fontSize: 15,
      lineHeight: '18px',
    },
  },
  saveBtnWrap: {
    padding: '0 16px',
  },
}));

export { useStyles };
