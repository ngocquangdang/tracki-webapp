import React, { useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';

import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import DateTimePicker from '@Components/DateTimePicker';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { Container, Title, SelectGroup, Content, useStyles } from './styles';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Tracker {
  device_id: number;
  time: number;
  battery: number;
  speed: number;
  location_type: string;
  lat: number;
  lng: number;
  icon_url: string;
  device_name: string;
}

interface Props {
  handleClose(): void;
  t(key: string): string;
  isMobile: boolean;
  show: boolean;
  isRequesting?: boolean;
  getHistoryTracker(data): void;
  onClickViewHistory(): void;
  tracker: Tracker;
}

function HistoryTracker(props: Props) {
  const classes = useStyles();
  const {
    handleClose,
    t,
    onClickViewHistory,
    isMobile,
    show,
    isRequesting,
  } = props;
  const [history, setHistory] = useState({
    map_view: true,
    seven_day_report: false,
    alert_history_report: false,
  });

  firebaseLogEventRequest('history_device', '');

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const onChangeDateTime = obj => {
    firebaseLogEventRequest('history_device', 'history_device_select_date');
    setDateTime(obj);
    getHistory(obj);
  };

  const getHistory = obj => {
    const { fromDate, toDate } = obj || dateTime;
    props.getHistoryTracker({
      trackerId: props?.tracker?.device_id,
      fromDate: fromDate,
      toDate: toDate,
      limit: 2000,
      page: 1,
      type: 2,
    });
  };

  const clickViewHistory = () => {
    getHistory(null);
    onClickViewHistory();
  };

  const onSubmitForm = values => {
    setHistory(values);
  };

  return (
    <SideBarOutside
      title={t('tracker:history')}
      show={show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
      isLogo={isMobile}
    >
      <Container>
        <Title>{t('tracker:history_type_of_view')}</Title>
        <Formik
          initialValues={history}
          onSubmit={onSubmitForm}
          disabled={isRequesting}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
            handleBlur,
          }) => {
            return (
              <Content onSubmit={handleSubmit}>
                <SelectGroup>
                  <RadioGroup
                    // value={values.speed_limit.unit || 'kmp'}
                    style={{ flexDirection: 'column' }}
                  >
                    <FormControlLabel
                      value="map_view"
                      control={<Radio color="primary" />}
                      label={t('tracker:history_map_view')}
                      className={classes.fontSize}
                      checked={values.map_view}
                      onChange={() => {
                        setFieldValue('map_view', true);
                        setFieldValue('seven_day_report', false);
                        setFieldValue('alert_history_report', false);
                        firebaseLogEventRequest(
                          'history_device',
                          'history_device_select_map_view'
                        );
                      }}
                    />
                    <FormControlLabel
                      value="seven_day_report"
                      control={<Radio color="primary" />}
                      label={t('tracker:history_7_day_report')}
                      className={classes.fontSize}
                      checked={values.seven_day_report}
                      onChange={() => {
                        setFieldValue('map_view', false);
                        setFieldValue('seven_day_report', true);
                        setFieldValue('alert_history_report', false);
                        firebaseLogEventRequest(
                          'history_device',
                          'history_device_select_7_days_report'
                        );
                      }}
                    />
                    <FormControlLabel
                      value="alert_history_report"
                      control={<Radio color="primary" />}
                      label={t('tracker:history_alert_report')}
                      className={classes.fontSize}
                      checked={values.alert_history_report}
                      onChange={() => {
                        setFieldValue('map_view', false);
                        setFieldValue('seven_day_report', false);
                        setFieldValue('alert_history_report', true);
                        firebaseLogEventRequest(
                          'history_device',
                          'history_device_select_alert_history_report'
                        );
                      }}
                    />
                  </RadioGroup>
                </SelectGroup>
                <div className={classes.selectOption}>
                  <DateTimePicker
                    isMobile={false}
                    dateTime={dateTime}
                    onChange={onChangeDateTime}
                    isHistory={true}
                  />
                </div>
                <Button
                  className={`${classes.btn} ${classes.margin}`}
                  variant="outlined"
                  isLoading={isRequesting}
                  text="View History"
                  type="submit"
                  onClick={clickViewHistory}
                />
              </Content>
            );
          }}
        </Formik>
      </Container>
    </SideBarOutside>
  );
}

export default HistoryTracker;
