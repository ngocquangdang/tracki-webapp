import React, { useState } from 'react';

import {
  MuiPickersUtilsProvider as PickerProvider,
  // KeyboardTimePicker as TimePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import DateUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';

import { useStyles, themePickerDate, TimePickerStyle } from './styles';
import { InputAdornment } from '@material-ui/core';
import { MdAvTimer } from 'react-icons/md';

export default function TimePickerContainer(props) {
  const classes = useStyles();
  const [wakeUp, setWakeUp] = useState(null);
  const handleWakeUp = value => setWakeUp(value);
  return (
    <>
      <PickerProvider libInstance={moment} utils={DateUtils}>
        <div className={classes.containerSpecificTime}>
          <ThemeProvider theme={themePickerDate}>
            <TimePickerStyle
              autoOk
              placeholder="__:__"
              mask="__:__ _M"
              value={wakeUp}
              onChange={handleWakeUp}
              className={classes.timePicker}
              keyboardIcon={
                <InputAdornment position="end">
                  <MdAvTimer />
                </InputAdornment>
              }
            />
          </ThemeProvider>
        </div>
      </PickerProvider>
    </>
  );
}
