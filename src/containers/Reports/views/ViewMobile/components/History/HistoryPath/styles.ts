import { makeStyles, createMuiTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 15,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: 50,
    borderRadius: '50%',
    height: 50,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    marginRight: 10,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.34,
  },
  textFont15: {
    fontSize: 15,
    fontWeight: 500,
  },
  borderPart: {
    width: 1,
    height: 22,
    backgroundColor: '#e0e0e0',
  },
  pr: {
    paddingRight: 15,
  },
  flexRowCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1.34,
  },
  textFont12: {
    fontSize: 12,
    fontWeight: 300,
  },
  textFont17: {
    fontSize: 17,
  },
  pl: {
    paddingLeft: 15,
  },
  containMap: {
    position: 'relative',
    height: 330,
  },
  textGrey: {
    color: '#999999',
    fontWeight: 'normal',
  },
  iconHelp: {
    fontSize: 20,
    color: '#999999',
    marginRight: 5,
  },
  mb: {
    marginBottom: 10,
  },
  playBack: {
    marginTop: 10,
    padding: '0 15px',
  },
  button: {
    cursor: 'pointer',
    border: '2px solid #168449',
    borderRadius: '50%',
    width: 33,
    height: 33,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  icon: {
    color: '#168449',
  },
  alignRight: {
    textAlign: 'right',
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
        marginRight: 15,
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
