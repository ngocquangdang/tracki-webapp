import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core';
import { KeyboardTimePicker as TimePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  timePicker: {
    margin: '23px 0 0',
    width: '100px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  containerSpecificTime: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
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
          // borderColor: '#168449',
          // borderWidth: 2,
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

const TimePickerStyle = withStyles(theme => ({
  root: {
    '& .MuiInput-underline-942:before': {
      border: 0,
    },
  },
}))(TimePicker);

export { useStyles, themePickerDate, TimePickerStyle };
