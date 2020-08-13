import { makeStyles, createMuiTheme } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
  },
  tracker: {
    paddingTop: 14,
    boxShadow: 'inset 0px 3px 3px 0px rgba(210, 210, 210, 0.3)',
  },
  text: {
    padding: '10px 15px',
    fontSize: 16,
    lineHeight: '19px',
    color: '#1a1a1a',
    margin: 0,
  },
  list: {
    maxHeight: 'calc(100% - 260px)',
    overflowY: 'auto',
  },
  trackeItem: {
    position: 'relative',
    padding: '0 15px',
    '& > div:last-child': {
      backgroundColor: 'unset',
      paddingRight: 0,
      borderBottom: '1px solid #ddd',
    },
    '&:last-child > div:last-child': {
      borderBottom: 'none',
    },

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      '& div:last-child': {
        backgroundColor: 'unset',
      },
    },
  },
  selectedTracker: {
    position: 'absolute',
    top: 8,
    left: 0,
    width: 3,
    height: 50,
    backgroundColor: theme.palette.primary.main,
  },
  formSelect: {
    padding: '0 15px',
    marginBottom: '15px',
  },
  descriptionTime: {
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 1.15,
  },
  datePickerControl: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  dateFrom: {
    marginRight: '15px',
  },
  inputProps: {
    backgroundColor: 'red',
  },
  timePicker: {
    marginRight: '10px',
  },
  containerSpecificTime: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  controlTimePicker: {
    display: 'flex',
    marginTop: '15px',
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
  },
});

export { useStyles, themePickerDate };
