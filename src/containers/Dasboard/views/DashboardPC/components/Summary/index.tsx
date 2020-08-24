import React, { useState } from 'react';
import moment from 'moment';
import DateTimePicker from '@Components/DateTimePicker';

import {
  useStyles,
  Card,
  TitleCard,
  Content,
  DataView,
  SubCard,
  SummaryDate,
  SelectGroup,
  Description,
  HeaderCard,
  DetailSummary,
} from './styles';

export default function SummaryComponent(props) {
  const classes = useStyles();
  const { summary, tracker, t, getHistoryTracker, getAlarmsTracker } = props;

  const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
  const [selectedDateTo, setSelectedDateTo] = useState(moment());
  const [selectedSpecificDate, setSelectedSpecificDate] = useState(moment());
  const [selectedSpecificTimeTo, setSelectedSpecificTimeTo] = useState(
    moment(new Date())
  );
  const onChangeDateOption = value => {
    if (value !== 'date_range' && value !== 'specific_date') {
      getHistoryTracker({
        trackerId: tracker?.device_id,
        fromDate: value,
        toDate: moment().unix(),
        limit: 2000,
        page: 1,
        type: 2,
      });
    }
    if (getAlarmsTracker) {
      getAlarmsTracker({
        trackerId: tracker?.device_id,
        limit: 500,
        page: 1,
        type: 'all',
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

    getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: selectedDateFrom.unix(),
      toDate: toDate.unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
    if (getAlarmsTracker) {
      getAlarmsTracker({
        trackerId: tracker?.device_id,
        limit: 500,
        page: 1,
        type: 'all',
      });
    }
  };

  const onChangeSpecificDate = date => {
    setSelectedSpecificDate(date);
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSpecificTimeTo = date => {
    setSelectedSpecificTimeTo(date);
    getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: moment(selectedSpecificDate).unix(),
      toDate: moment(date).unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
    if (getAlarmsTracker) {
      getAlarmsTracker({
        trackerId: tracker?.device_id,
        limit: 500,
        page: 1,
        type: 'all',
      });
    }
  };

  return (
    <>
      <HeaderCard>
        <SelectGroup>
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
            showDescriptionTime={false}
          />
        </SelectGroup>
        <Description>{t('dashboard:summary_description')}</Description>
      </HeaderCard>
      <DetailSummary>
        {summary.map((item, index) => (
          <Card key={index}>
            <TitleCard>{item.title}</TitleCard>
            <Content>
              <DataView>
                {item.dataView}{' '}
                <span className={classes.unitSize}>{item.unit}</span>
              </DataView>
              <SubCard>{item.subTitle}</SubCard>
              <SummaryDate>{item.date}</SummaryDate>
            </Content>
          </Card>
        ))}
      </DetailSummary>
    </>
  );
}
