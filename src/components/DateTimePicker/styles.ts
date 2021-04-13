import { makeStyles, createMuiTheme } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  descriptionTime: {
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 1.85,
    marginTop: 15,
  },
  datePickerControl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  datePickerControlHistory: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  dateFrom: {
    marginRight: '15px',
  },
  inputProps: {
    backgroundColor: 'red',
  },
  textError: {
    color: 'red',
  },
  timePicker: {
    marginRight: '10px',
  },
  containerSpecificTime: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerSpecificTimeHistory: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    marginTop: 15,
  },
  controlTimePicker: {
    display: 'flex',
  },
  controlTimePickerHistory: {
    display: 'flex',
    marginTop: '15px',
  },
  timeFrom: {
    float: 'left',
    paddingRight: '5px',
  },
  selectOption: {
    width: '100%',
    marginRight: 15,
  },
  inLine: {
    display: 'flex',
    width: '100%',
  },
  marginRight: {
    marginRight: 10,
  },
  hiddeDescription: {
    display: 'none',
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

const themePickerDateBlackView = createMuiTheme({
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
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
        height: '50px',
        color: 'rgba(255, 255, 255, 0.87)',
      },
      notchedOutline: {
        borderColor: 'rgba(255, 255, 255, 0.12)',
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
        color: 'rgba(255, 255, 255, 0.87)',
      },
    },
    MuiInputLabel: {
      outlined: {
        color: 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
});

export { useStyles, themePickerDate, themePickerDateBlackView };
