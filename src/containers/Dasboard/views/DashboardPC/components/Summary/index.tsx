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

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const onChangeDateTime = obj => {
    setDateTime(obj);
    getHistory(obj);
    if (getAlarmsTracker) {
      getAlarmsTracker({
        trackerId: tracker?.device_id,
        limit: 500,
        page: 1,
        type: 'all',
      });
    }
  };

  const getHistory = obj => {
    const { fromDate, toDate } = obj || dateTime;
    getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: fromDate,
      toDate: toDate,
      limit: 2000,
      page: 1,
      type: 2,
    });
  };

  return (
    <>
      <HeaderCard>
        <SelectGroup>
          <DateTimePicker
            t={t}
            isMobile={false}
            dateTime={dateTime}
            onChange={onChangeDateTime}
            isHistory={true}
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
