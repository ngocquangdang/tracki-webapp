import React, { useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';

import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import DateTimePicker from '@Components/DateTimePicker';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import { Container, Title, SelectGroup, Content, useStyles } from './styles';

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
  onClickViewHistory(): void;
  getHistoryTracker(data): void;
  tracker: Tracker;
}

function HistoryTracker(props: Props) {
  const classes = useStyles();
  const {
    handleClose,
    t,
    isMobile,
    show,
    isRequesting,
    onClickViewHistory,
  } = props;
  const [history, setHistory] = useState({
    map_view: true,
    seven_day_report: false,
    alert_history_report: false,
  });
  const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
  const [selectedDateTo, setSelectedDateTo] = useState(moment());
  const [selectedSpecificDate, setSelectedSpecificDate] = useState(moment());
  const [selectedSpecificTimeTo, setSelectedSpecificTimeTo] = useState(
    moment(new Date())
  );

  const onChangeDateOption = value => {
    console.log('HistoryTracker -> value', value);
    if (value !== 'date_range' && value !== 'specific_date') {
      props.getHistoryTracker({
        trackerId: props.tracker?.device_id,
        fromDate: value,
        toDate: moment().unix(),
        limit: 2000,
        page: 1,
        type: 2,
      });
    }
  };
  const onChangeDateFrom = date => {
    const fromDate = moment(date.getTime());
    setSelectedDateFrom(fromDate);
  };

  const onChangeDateTo = date => {
    const toDate = moment(date.getTime());
    setSelectedDateTo(toDate);

    props.getHistoryTracker({
      trackerId: props.tracker?.device_id,
      fromDate: selectedDateFrom.unix(),
      toDate: toDate.unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
  };

  const onChangeSpecificDate = date => {
    setSelectedSpecificDate(date);
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSpecificTimeTo = date => {
    setSelectedSpecificTimeTo(date);
    props.getHistoryTracker({
      trackerId: props.tracker?.device_id,
      fromDate: moment(selectedSpecificDate).unix(),
      toDate: moment(date).unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
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
                      }}
                    />
                  </RadioGroup>
                </SelectGroup>
                <div className={classes.selectOption}>
                  <DateTimePicker
                    isMobile={false}
                    onChangeDateFrom={onChangeDateFrom}
                    onChangeDateTo={onChangeDateTo}
                    onChangeSpecificDate={onChangeSpecificDate}
                    onChangeSpecificTimeTo={onChangeSpecificTimeTo}
                    onChangeDateOption={onChangeDateOption}
                    valueDateFrom={selectedDateFrom}
                    valueDateTo={selectedDateTo}
                    valueSpecificDate={selectedSpecificDate}
                    valueSpecificTimeTo={selectedSpecificTimeTo}
                    isHistory={true}
                  />
                </div>
                <Button
                  className={`${classes.btn} ${classes.margin}`}
                  variant="outlined"
                  isLoading={isRequesting}
                  text="View History"
                  type="submit"
                  onClick={onClickViewHistory}
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
