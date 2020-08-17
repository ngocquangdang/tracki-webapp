import { makeStyles } from '@material-ui/core';

const COLOR1 = '#1a1a1a';
const ACTIVE_COLOR = '#168449';
const BG_COLOR = '#eeeeee';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: '0px 8px 8px',
  },
  formContent: {},
  inputWrap: {
    display: 'flex',
    height: 55,
    '& > div': {
      alignSelf: 'center',
    },
  },
  inputWrap2: {
    '& > div': {
      '& > div fieldset': {
        border: 'none !important',
        padding: '0 !important',
      },
      '& > p': {
        top: '13px !important',
      },
    },
  },
  inputRoot: {
    width: '100%',
    padding: '0',
    margin: 0,
    '& input': {
      padding: '0 !important',
      fontSize: 14,
      lineHeight: '17px',
    },
  },
  border: {
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    height: 60,
  },
  inputLabel: {
    color: COLOR1,
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: '18px',
    width: 80,
    minWidth: 80,
  },
  grid: {
    alignSelf: 'center',
  },
  avatar: {
    marginRight: 12,
    backgroundColor: BG_COLOR,
  },
  avtActive: {
    backgroundColor: ACTIVE_COLOR,
  },
  saveBtnWrap: {
    width: '100%',
    marginTop: 10,
  },
}));

export { useStyles };
