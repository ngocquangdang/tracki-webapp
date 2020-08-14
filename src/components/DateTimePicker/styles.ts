import { makeStyles, createMuiTheme } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  formSelect: {
    padding: '0 15px',
    marginBottom: '15px',
  },
  descriptionTime: {
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 1.85,
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
  timeFrom: {
    float: 'left',
    paddingRight: '5px',
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
