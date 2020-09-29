import React from 'react';

import { MuiPickersUtilsProvider as PickerProvider } from '@material-ui/pickers';
import moment from 'moment';
import DateUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import RemoveIcon from '@material-ui/icons/Remove';

import { useStyles, themePickerDate, TimePickerStyle } from './styles';
import { InputAdornment } from '@material-ui/core';
import { MdAvTimer } from 'react-icons/md';

export default function TimePickerContainer(props) {
  const { wifiStatus, schedulerRangeTime, onChangeSchedulerRangeTime } = props;

  const classes = useStyles();
  const { startTime, endTime } = schedulerRangeTime;
  const handleChangeFrom = value => {
    onChangeSchedulerRangeTime({
      ...schedulerRangeTime,
      startTime: value,
    });
  };

  const handleChangeTo = value =>
    onChangeSchedulerRangeTime({
      ...schedulerRangeTime,
      endTime: value,
    });
  return (
    <>
      {wifiStatus === 'ON' && (
        <PickerProvider libInstance={moment} utils={DateUtils}>
          <div className={classes.containerSignleTime}>
            <ThemeProvider theme={themePickerDate}>
              <TimePickerStyle
                autoOk
                placeholder="__:__"
                mask="__:__ _M"
                value={schedulerRangeTime.startTime}
                onChange={handleChangeFrom}
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
      )}
      {wifiStatus === 'ON/OFF' && (
        <PickerProvider libInstance={moment} utils={DateUtils}>
          <div className={classes.containerRangeTime}>
            <ThemeProvider theme={themePickerDate}>
              <TimePickerStyle
                autoOk
                placeholder="__:__"
                mask="__:__ _M"
                value={startTime}
                onChange={handleChangeFrom}
                className={classes.timePicker}
                keyboardIcon={
                  <InputAdornment position="end">
                    <MdAvTimer />
                  </InputAdornment>
                }
              />
              <RemoveIcon className={classes.icon} />
              <TimePickerStyle
                autoOk
                placeholder="__:__"
                mask="__:__ _M"
                value={endTime}
                onChange={handleChangeTo}
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
      )}
    </>
  );
}
