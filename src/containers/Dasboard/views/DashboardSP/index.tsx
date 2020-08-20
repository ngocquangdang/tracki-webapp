import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import L from 'leaflet';

import SelectOption from '@Components/selections';
import Map from '@Components/Maps';

import {
  HeaderDashboard,
  DeviceSelection,
  ContainerDashboard,
  MapViewCard,
  SummaryCard,
  DeviceInfoCard,
  RecentAlertCard,
  ContentCard,
  MapView,
  useStyles,
  SelectGroup,
  Description,
  HeaderCard,
  CardTitle,
  DetailSummary,
  Card,
  TitleCard,
  Content,
  DataView,
  SubCard,
  SummaryDate,
  InfoCard,
  TitleInfo,
  AddressInfo,
} from './styles';
import { ITracker } from '@Interfaces';
import { AiFillInfoCircle } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaBell } from 'react-icons/fa';
import { SideBarOutside } from '@Components/sidebars';

import DateTimePicker from '@Components/DateTimePicker';
import axios from 'axios';
import { MAPBOX_API_KEY } from '@Definitions/app';
import RecentAlertComponent from './components/RecentAlert';
interface Props {
  trackerIds: number[];
  trackers: ITracker;
  getHistoryTracker(data): void;
  t(key: string, format?: object): string;
}

export default function DashboardContainer(props) {
  const classes = useStyles();
  const {
    trackers,
    trackerIds,
    getHistoryTracker,
    historyTracker,
    historyTrackerIds,
    t,
    getAlarmsTracker,
    changeTrackersTracking,
    alarmsTracker,
    isMobile,
  } = props;
  const [trackerList = [], setTrackerList] = useState([
    { value: '', content: '' },
  ]);
  const [trackerSelected, setTrackerSelected] = useState(trackerList[0]?.value);
  const [initialHistories, setInitialHistories] = useState<object>({});
  const [initialHistoryIds, setInitialHistoryIds] = useState<number[]>([]);
  const [alarmList, setAlarmList] = useState({ alarms: {}, alarmIds: [] });
  const [distance, setDistance] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const onUpdateRowPerPage = () => {
    setPage(page + 1);
  };

  const callApiGetAddress = useCallback(async () => {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        trackers[parseInt(trackerSelected)]?.lng
      },${
        trackers[parseInt(trackerSelected)]?.lat
      }.json?types=poi&access_token=${MAPBOX_API_KEY}`
    );
    const address = data.features[0] || { place_name: 'Unknow location' };
    setCurrentAddress(address.place_name);
  }, [setCurrentAddress, trackerSelected, trackers]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const deviceInfo = [
    {
      title: t('dashboard:current_address'),
      data: currentAddress,
    },
    {
      title: t('dashboard:total_time_travel'),
      data: 'NaN',
    },
    {
      title: t('dashboard:odometer'),
      data: 'NaN',
    },
    {
      title: t('dashboard:total_trip'),
      data: 'NaN',
    },
    {
      title: t('dashboard:maximum_speed'),
      data: 'NaN',
    },
    {
      title: t('dashboard:tracker_contenction'),
      data: trackers[parseInt(trackerSelected)]?.location_type || 'NaN',
    },
    {
      title: t('dashboard:total_fuel_consumption'),
      data: 'NaN',
    },
  ];

  const summary = [
    {
      title: t('dashboard:distance'),
      dataView: distance,
      subTitle: t('dashboard:total_distance'),
      date: moment().format('L'),
      unit: 'km',
    },
    {
      title: t('dashboard:trips'),
      dataView: historyTracker?.length || 0,
      subTitle: t('dashboard:total_trip'),
      date: moment().format('L'),
    },
    {
      title: t('dashboard:battery'),
      dataView: trackers[parseInt(trackerSelected)]?.battery || 0,
      subTitle: t('dashboard:battery_level'),
      date: moment().format('L'),
    },
    {
      title: t('dashboard:fuel'),
      dataView: 30,
      subTitle: t('dashboard:fuel_consumption'),
      date: moment().format('L'),
    },
  ];

  const callApiCurrentAddress = useCallback(async () => {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        trackers[parseInt(trackerSelected)]?.lng
      },${
        trackers[parseInt(trackerSelected)]?.lat
      }.json?types=poi&access_token=${MAPBOX_API_KEY}`
    );
    const address = data.features[0] || { place_name: 'Unknow location' };
    setCurrentAddress(address.place_name);
  }, [setCurrentAddress, trackerSelected, trackers]);

  useEffect(() => {
    callApiCurrentAddress();
  }, [callApiCurrentAddress]);

  useEffect(() => {
    setInitialHistories(historyTracker);
    setInitialHistoryIds(historyTrackerIds);
  }, [historyTracker, historyTrackerIds]);

  useEffect(() => {
    setAlarmList(alarmsTracker);
  }, [alarmsTracker]);

  useEffect(() => {
    let newTrackerLIst = [];
    newTrackerLIst = trackerIds?.map(item => {
      return {
        value: trackers[item].device_id || '',
        content: trackers[item].device_name || '',
      };
    });
    setTrackerList(newTrackerLIst);
  }, [trackers, trackerIds]);

  const changeSelectTracker = device_id => {
    setTrackerSelected(device_id);
    changeTrackersTracking([device_id]);
  };

  if (initialHistoryIds?.length > 0) {
    let prevLatLng = L.latLng(
      initialHistories[initialHistoryIds[0]]?.lat,
      initialHistories[initialHistoryIds[0]]?.lng
    );

    const distanceTotal = initialHistoryIds?.reduce((result, item, index) => {
      if (index !== 0) {
        result += prevLatLng.distanceTo(
          L.latLng(initialHistories[item]?.lat, initialHistories[item]?.lng)
        );
        prevLatLng = L.latLng(
          initialHistories[item]?.lat,
          initialHistories[item]?.lng
        );
      }
      return result;
    }, 0);
    setDistance(distanceTotal);
  }

  const onCloseAdd = () => console.log('aaaaa');
  console.log('tracker info,:', trackers[trackerSelected], moment().unix());
  return (
    <SideBarOutside
      title={t('tracker:add_geofence')}
      show={true}
      direction="right"
      handleClose={onCloseAdd}
      isMobile={isMobile || false}
    >
      <>
        <HeaderDashboard>
          <DeviceSelection>
            <SelectOption
              name=""
              options={trackerList}
              label={'Sellect Tracker'}
              value={trackerSelected}
              onChangeOption={changeSelectTracker}
            />
          </DeviceSelection>
          <SelectGroup>
            <DateTimePicker
              tracker={trackers[parseInt(trackerSelected)]}
              isMobile={false}
              t={t}
              getHistoryTracker={getHistoryTracker}
              getAlarmsTracker={getAlarmsTracker}
              showDescriptionTime={false}
            />
          </SelectGroup>
        </HeaderDashboard>
        <ContainerDashboard>
          <SummaryCard>
            <ContentCard>
              <DetailSummary>
                {summary.map((item, index) => (
                  <Card key={index}>
                    <TitleCard>{item.title}</TitleCard>
                    <Content>
                      <DataView>{item.dataView}</DataView>
                      <SubCard>{item.subTitle}</SubCard>
                      <SummaryDate>{item.date}</SummaryDate>
                    </Content>
                  </Card>
                ))}
              </DetailSummary>
            </ContentCard>
          </SummaryCard>
          <MapViewCard>
            <HeaderCard>
              <CardTitle>
                <div className={`${classes.color} ${classes.padding}`}>
                  {t('dashboard:current_position')}
                </div>
              </CardTitle>
              <Description>
                <GoPrimitiveDot
                  className={
                    trackers[parseInt(trackerSelected)]?.status === 'active'
                      ? classes.primaryColor
                      : classes.secondaryColor
                  }
                />{' '}
                {t('dasboard:online')} | {t('dashboard:last_update')}
                {moment(
                  trackers[parseInt(trackerSelected)]?.time * 1000
                ).format('lll')}
              </Description>
            </HeaderCard>
            <ContentCard>
              <MapView>
                <Map fullWidth={true} mapType="leaflet" {...props} />
              </MapView>
            </ContentCard>
          </MapViewCard>
          <DeviceInfoCard>
            <ContentCard>
              <div className={`${classes.color} ${classes.cellHeader}`}>
                <AiFillInfoCircle className={classes.iconCard} />
                {t('dashboard:device_information')}
              </div>
              {deviceInfo.map((item, index) => (
                <InfoCard key={index}>
                  <TitleInfo>{item.title}</TitleInfo>
                  <AddressInfo>{item.data}</AddressInfo>
                </InfoCard>
              ))}
            </ContentCard>
          </DeviceInfoCard>

          <RecentAlertCard>
            <ContentCard>
              <div className={`${classes.color} ${classes.cellHeader}`}>
                <FaBell className={classes.iconCard} />
                {t('dashboard:recent_alerts')}
              </div>
              {(rowsPerPage > 0
                ? alarmList?.alarmIds.slice(0, page * rowsPerPage + rowsPerPage)
                : alarmList?.alarmIds
              )?.map(item => (
                // <AlertCard>
                //   <TitleAlert>{item.title}</TitleAlert>
                //   <AddressAlert>{item.data}</AddressAlert>
                //   <DateAlert>{item.title}</DateAlert>
                // </AlertCard>
                <RecentAlertComponent rowAlert={item} />
              ))}
            </ContentCard>
            <div className={classes.footer} onClick={onUpdateRowPerPage}>
              {t('dashboard:load_more_alerts')}
            </div>
          </RecentAlertCard>
        </ContainerDashboard>
      </>
    </SideBarOutside>
  );
}
