import { makeStyles } from '@material-ui/core';

const COLOR1 = '#1a1a1a';
const ACTIVE_COLOR = '#168449';
const BG_COLOR = '#eeeeee';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  formContent: {
    padding: '0px 8px 8px',
    borderRadius: 4,
    borderColor: '#ddd',
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  },
  createInfo: {
    padding: '12px 15px 12px',
    borderRadius: 4,
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#323232',
    marginBottom: 5,
    '& p': {
      fontSize: 13,
      color: '#999',
      lineHeight: '17px',
    },
  },
  checkboxWrap: {
    height: 20,
    marginBottom: 16,
    '& label': {
      position: 'relative',
      top: -10,
      '& span': {
        fontSize: 13,
        lineHeight: '17px',
        fontWeight: 400,
      },
    },
  },
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
