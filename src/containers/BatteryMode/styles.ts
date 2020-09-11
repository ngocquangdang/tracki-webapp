import { makeStyles, createMuiTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    maxWidth: '844px',
  },
  sleepMode: {
    display: 'flex',
    alignItems: 'center',
    margin: '14px 0',
  },
  modeOption: {},
  saveMode: {},
  intructions: {
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #fefefe',
    backgroundColor: '#ffffff',
    padding: '20px 10px',
  },
  buyBatteryMode: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  intructionTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  intructionSub: {
    marginBottom: 0,
    fontSize: 14,
  },
  width: {
    width: '273px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  iconWarning: {
    width: '24px',
    height: '24px',
    color: theme.palette.primary.main,
    marginRight: 5,
  },
  switch: {
    marginLeft: 70,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20,
    },
  },
  modeCustom: {
    display: 'flex',
    flexDirection: 'column',
  },
  controlTimePicker: {
    display: 'flex',
  },
  timePicker: {
    margin: '23px 0 0',
    width: '250px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  containerSpecificTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  sleepState: {
    display: 'none',
    color: '#999999',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 14,
    },
  },
  buyHere: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: '#1a1a1a',
  },
  subBuy: {
    fontWeight: 500,
    margin: '22px 0 37px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  intructionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showIntruction: {
    fontSize: 14,
    color: '#999999',
    cursor: 'pointer',
  },
}));

const themePickerDate = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#168449',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: '#fff',
        color: '#1a1a1a',
      },
    },
    MuiPickersDay: {
      day: {
        color: '#1a1a1a',
      },
      daySelected: {
        backgroundColor: '#168449',
        '&:hover': {
          backgroundColor: '#18a057',
        },
      },
      dayDisabled: {
        color: '#bcbcbc',
      },
      current: {
        color: '#168449',
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#168449',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: '#168449',
          borderWidth: 2,
        },
        height: '50px',
      },
    },
    MuiTabs: {
      flexContainer: {
        backgroundColor: '#168449',
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: '#168449',
      },
      noPoint: {
        backgroundColor: '#168449',
      },
      thumb: {
        borderColor: '#168449',
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: '#168449',
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
      },
    },
  },
});
export { useStyles, themePickerDate };
