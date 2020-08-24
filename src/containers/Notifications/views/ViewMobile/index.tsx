import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { SideBarOutsideContact } from '@Components/sidebars';

import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';

import { ALARM_TYPES } from '../../store/constants';
import NotificationCardDetail from './components/NotificationCardDetails';

import { OptionView, DetailCard } from './styles';

interface Notifications {
  id: number;
  deviceName: string;
  lat: number;
  lng: number;
  alarmType: string;
  created: number;
  speed: number;
}

interface Props {
  fetchNotificationRequest(data: object): void;
  notifications: Notifications;
  notificationsIds: number[];
}

function NotificationMobile(props) {
  const { notifications, notificationsIds } = props;
  const [showNotfication, setShowNotification] = useState(true);

  const [alarmType, setAlarmType] = useState(ALARM_TYPES[0].value);

  const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
  const [selectedDateTo, setSelectedDateTo] = useState(moment());
  const [selectedSpecificDate, setSelectedSpecificDate] = useState(moment());
  const [selectedSpecificTimeTo, setSelectedSpecificTimeTo] = useState(
    moment(new Date())
  );

  const [initialNotifications, setInitialNotifications] = useState({});
  const [initialNotificationsIds, setInitialNotificationsIds] = useState<
    number[]
  >([]);

  useEffect(() => {
    setInitialNotificationsIds(notificationsIds);
    setInitialNotifications(notifications);
  }, [notificationsIds, notifications]);

  const handleClose = () => {
    setShowNotification(false);
  };

  const onChangeAlarmType = (value: string) => {
    setAlarmType(value);
    const filterType = notificationsIds.filter(item =>
      notifications[item]?.alarm_type.includes(value)
    );
    value === 'all'
      ? setInitialNotificationsIds(notificationsIds)
      : setInitialNotificationsIds(filterType);
  };

  const onChangeDateOption = value => {
    if (value !== 'date_range' && value !== 'specific_date') {
      const filterDate = notificationsIds.filter(
        item => notifications[item]?.created >= value * 1000
      );
      setInitialNotificationsIds(filterDate);
    }
  };

  const onChangeDateFrom = date => {
    const fromDate = moment(date.getTime());
    const filterDate = notificationsIds.filter(
      item =>
        notifications[item]?.created <= selectedDateTo.valueOf() &&
        notifications[item]?.created >= fromDate.valueOf()
    );
    setInitialNotificationsIds(filterDate);
    setSelectedDateFrom(fromDate);
  };

  const onChangeDateTo = date => {
    const toDate = moment(date.getTime());
    const filterNotificationsByDate = notificationsIds.filter(
      item =>
        notifications[item]?.created <= toDate.valueOf() &&
        notifications[item]?.created >= setSelectedDateFrom.valueOf()
    );
    setInitialNotificationsIds(filterNotificationsByDate);
    setSelectedDateTo(toDate);
  };

  const onChangeSpecificDate = date => {
    setSelectedSpecificDate(date);
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSpecificTimeTo = date => {
    const filterNotificationsByDate = notificationsIds.filter(
      item =>
        notifications[item]?.created <= moment(date.getTime()).valueOf() &&
        notifications[item]?.created >= moment(selectedSpecificDate).valueOf()
    );
    setInitialNotificationsIds(filterNotificationsByDate);
    setSelectedSpecificTimeTo(date);
  };

  return (
    <SideBarOutsideContact
      handleClose={handleClose}
      isMobile={true}
      show={showNotfication}
      direction="left"
      isBlackView={true}
      title={`Notification & History Report`}
    >
      <OptionView>
        <SelectOption
          name="alarm_type"
          options={ALARM_TYPES}
          label="Select Type"
          value={alarmType}
          onChangeOption={onChangeAlarmType}
        />
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
        />
      </OptionView>
      <DetailCard>
        {(initialNotificationsIds && initialNotificationsIds).map(item => {
          return (
            <Fragment key={item}>
              <NotificationCardDetail
                notifications={initialNotifications[item]}
              />
            </Fragment>
          );
        })}
      </DetailCard>
    </SideBarOutsideContact>
  );
}

export default NotificationMobile;
