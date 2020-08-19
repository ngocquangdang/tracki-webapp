import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

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
  AlertCard,
  TitleAlert,
  AddressAlert,
  DateAlert,
} from './styles';
import { ITracker } from '@Interfaces';
import { AiFillInfoCircle } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaBell } from 'react-icons/fa';
import { SideBarOutside } from '@Components/sidebars';

import DateTimePicker from '@Components/DateTimePicker';
import axios from 'axios';
import { MAPBOX_API_KEY } from '@Definitions/app';
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
    history,
    t,
    isMobile,
    changeTrackersTracking,
  } = props;
  const [trackerList = [], setTrackerList] = useState([
    { value: '', content: '' },
  ]);
  const [trackerSelected, setTrackerSelected] = useState(trackerList[0]?.value);
  const [historyTracker, setHistoryTracker] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);

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
      dataView: 876.2,
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

  useEffect(() => {
    setHistoryTracker(history);
  }, [history]);

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
              showDescriptionTime={false}
            />
          </SelectGroup>
        </HeaderDashboard>
        <ContainerDashboard>
          <SummaryCard>
            <ContentCard>
              <DetailSummary>
                {summary.map(item => (
                  <Card>
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
              {deviceInfo.map(item => (
                <InfoCard>
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
              {deviceInfo.map(item => (
                <AlertCard>
                  <TitleAlert>{item.title}</TitleAlert>
                  <AddressAlert>{item.data}</AddressAlert>
                  <DateAlert>{item.title}</DateAlert>
                </AlertCard>
              ))}
            </ContentCard>
            <div className={classes.footer}>
              {t('dashboard:load_more_alerts')}
            </div>
          </RecentAlertCard>
        </ContainerDashboard>
      </>
    </SideBarOutside>
  );
}
