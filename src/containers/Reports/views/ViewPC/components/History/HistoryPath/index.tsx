import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import clsx from 'clsx';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DateUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';

import {
  MuiPickersUtilsProvider as PickerProvider,
  KeyboardDatePicker as DatePicker,
} from '@material-ui/pickers';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  FastForward as FastForwardIcon,
} from '@material-ui/icons';
import { debounce } from 'lodash';

import RangeSlider from '@Components/RangeSlider';

import { useStyles, themePickerDate } from './styles';

const MapCard = dynamic(
  () => import('@Containers/Reports/views/components/MapCard'),
  {
    ssr: false,
  }
);
function HistoryPath(props) {
  const {
    historyLogs,
    t,
    dateFrom,
    dateTo,
    onChangeDateFrom,
    onChangeDateTo,
    viewMode,
    isPlaying,
    onPlayingClick,
    onClickNext,
  } = props;
  const classes = useStyles();
  const [firstValue, setFirstValue] = useState(dateFrom);
  const [secondValue, setSecondValue] = useState(dateTo);
  // const [initHistoryLogs, setInitHistoryLogs] = useState()
  //handle change value slider
  const onChangeValuesSlide = debounce((fromValue, toValue) => {
    setFirstValue(fromValue);
    setSecondValue(toValue);
  }, 300);

  return (
    <div>
      <div className={classes.containMap}>
        <MapCard
          mapId="mapHistory"
          history={historyLogs}
          mapType="leaflet"
          t={t}
          isMobile={false}
          viewMode={viewMode}
        />
      </div>
      <div className={classes.container}>
        <div className={classes.flexRow}>
          <div className={clsx(classes.textFont15, classes.flexCol)}>
            <span>{moment(firstValue).format('hh:mm A')}</span>
            <span>{moment(firstValue).format('L')}</span>
          </div>
          <div className={classes.flexColCenter}>
            <div className={clsx(classes.flexRowCenter, classes.mb)}>
              <HelpOutlineIcon className={classes.iconHelp} />
              <span className={clsx(classes.textFont15, classes.textGrey)}>
                History Playback
              </span>
            </div>
            <div className={classes.flexRow}>
              <PickerProvider libInstance={moment} utils={DateUtils}>
                <ThemeProvider theme={themePickerDate}>
                  <DatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    label="From"
                    format="dd/MM/yyyy"
                    value={dateFrom}
                    onChange={onChangeDateFrom}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    maxDate={moment()}
                  />
                </ThemeProvider>
                <ThemeProvider theme={themePickerDate}>
                  <DatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    label="To"
                    format="dd/MM/yyyy"
                    value={dateTo}
                    onChange={onChangeDateTo}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    color="primary"
                    maxDate={moment(new Date())}
                  />
                </ThemeProvider>
              </PickerProvider>
              <div className={classes.flexRowCenter}>
                <div onClick={onPlayingClick} className={classes.button}>
                  {isPlaying ? (
                    <PauseIcon className={classes.icon} />
                  ) : (
                    <PlayArrowIcon className={classes.icon} />
                  )}
                </div>
                <div onClick={onClickNext} className={classes.button}>
                  <FastForwardIcon className={classes.icon} />
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(classes.textFont15, classes.flexCol)}>
            <span className={classes.alignRight}>
              {moment(secondValue).format('hh:mm A')}
            </span>
            <span>{moment(secondValue).format('L')}</span>
          </div>
        </div>
      </div>
      <RangeSlider
        min={dateFrom}
        max={dateTo}
        onChangeValues={onChangeValuesSlide}
        width={1600}
      />
    </div>
  );
}

export default HistoryPath;
