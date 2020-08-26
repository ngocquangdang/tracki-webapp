import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { SideBarOutsideContact } from '@Components/sidebars';

import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';

import { ALARM_TYPES } from '../../store/constants';
import NotificationCardDetail from './components/NotificationCardDetails';

import {
  OptionView,
  DetailCard,
  ListOptionView,
  FilterData,
  DatePicker,
} from './styles';

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
  t(key: string, format?: object): string;
}

function NotificationMobile(props) {
  const { notifications, notificationsIds, t } = props;
  const [showNotfication, setShowNotification] = useState(true);

  const [alarmType, setAlarmType] = useState(ALARM_TYPES[0].value);

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const [isDateRange, setDateRange] = useState(false);
  const [dataFilter, setDataFilter] = useState(true);

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

  const onChangeDateTime = obj => {
    const { fromDate, toDate } = obj || dateTime;
    setDateTime(obj);
    const filterNotificationsByDate = notificationsIds.filter(
      item =>
        moment(notifications[item]?.created).unix() <= toDate.valueOf() &&
        moment(notifications[item]?.created).unix() >= fromDate.valueOf()
    );
    filterNotificationsByDate.length === 0
      ? setDataFilter(false)
      : setDataFilter(true);

    setInitialNotificationsIds(filterNotificationsByDate);
  };

  const onSelectOption = value => {
    value === 'date_range' || value === 'specific_date'
      ? setDateRange(true)
      : setDateRange(false);
  };

  return (
    <SideBarOutsideContact
      handleClose={handleClose}
      isMobile={true}
      show={showNotfication}
      direction="left"
      isBlackView={true}
      title={t('notifications:notification_report')}
    >
      <ListOptionView isDateRange={isDateRange}>
        <OptionView isDateRange={isDateRange}>
          <SelectOption
            name="alarm_type"
            options={ALARM_TYPES}
            label={t('notifications:select_type')}
            value={alarmType}
            onChangeOption={onChangeAlarmType}
          />
        </OptionView>
        <DatePicker isDateRange={isDateRange}>
          <DateTimePicker
            isMobile={false}
            dateTime={dateTime}
            onChange={onChangeDateTime}
            isHistory={true}
            onSelectOption={onSelectOption}
          />
        </DatePicker>
      </ListOptionView>
      <DetailCard>
        {(initialNotificationsIds && initialNotificationsIds).map(item => {
          return (
            <Fragment key={item}>
              <NotificationCardDetail
                notifications={initialNotifications[item]}
                t={t}
                mapId={`map${item}`}
              />
            </Fragment>
          );
        })}
        {dataFilter ? null : (
          <FilterData>{t('notifications:no_data')}</FilterData>
        )}
      </DetailCard>
    </SideBarOutsideContact>
  );
}

export default NotificationMobile;
