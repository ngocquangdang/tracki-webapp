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
    historyLogIds,
    t,
    dateFrom,
    dateTo,
    onChangeDateFrom,
    onChangeDateTo,
    viewMode,
    isPlaying,
    togglePlaying,
    onClickNext,
    currentPointId,
  } = props;
  const classes = useStyles();
  const [firstValue, setFirstValue] = useState(dateFrom);
  const [secondValue, setSecondValue] = useState(dateTo);
  const [initHistoryLogIds, setInitHistoryLogIds] = useState(historyLogIds);
  //handle change value slider
  const onChangeValuesSlide = debounce((fromValue, toValue) => {
    setFirstValue(fromValue);
    setSecondValue(toValue);
    const fromDate = moment(fromValue).format('YYYY-MM-DD');
    const toDate = moment(toValue).format('YYYY-MM-DD');
    const filterHistoryLogIds = initHistoryLogIds.filter(id => {
      const time = moment(historyLogs[id].time * 1000).format('YYYY-MM-DD');
      return moment(time).isBetween(fromDate, toDate, undefined, '[]');
    });
    setInitHistoryLogIds(filterHistoryLogIds);
  }, 300);

  return (
    <div>
      <div className={classes.containMap}>
        <MapCard
          mapId="mapHistory"
          historyLogs={historyLogs}
          historyLogIds={initHistoryLogIds}
          isPlaying={isPlaying}
          togglePlaying={togglePlaying}
          mapType="leaflet"
          t={t}
          isMobile={false}
          viewMode={viewMode}
          currentPointId={currentPointId}
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
                    maxDate={dateTo}
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
                    minDate={dateFrom}
                    maxDate={moment(new Date())}
                  />
                </ThemeProvider>
              </PickerProvider>
              <div className={classes.flexRowCenter}>
                <div onClick={togglePlaying} className={classes.button}>
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
        width={window.innerWidth - 140}
      />
    </div>
  );
}

export default HistoryPath;
