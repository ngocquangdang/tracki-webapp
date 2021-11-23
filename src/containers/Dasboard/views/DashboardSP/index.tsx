import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import moment from 'moment';
import dynamic from 'next/dynamic';

import { lineString } from '@turf/turf';
import length from '@turf/length';
import SelectOption from '@Components/selections';
import Map from '@Components/Maps';
import { getAddress } from '@Utils/helper';
import { ITracker } from '@Interfaces';
import { AiFillInfoCircle } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaBell } from 'react-icons/fa';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import DateTimePicker from '@Components/DateTimePicker';
import RecentAlertComponent from './components/RecentAlert';

import ToolBar from '@Containers/Dasboard/views/components/MapCard/MapToolBarSP';
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

const MapCard = dynamic(
  () => import('@Containers/Dasboard/views/components/MapCard'),
  { ssr: false }
);

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
    trackingIds,
    getHistoryTracker,
    historyTracker,
    historyTrackerIds,
    t,
    getAlarmsTracker,
    changeTrackersTracking,
    alarmsTracker,
  } = props;

  const [trackerList = [], setTrackerList] = useState([
    { value: '', content: '' },
  ]);
  const [trackerSelected, setTrackerSelected] = useState(trackerList[0]?.value);
  const { alarms } = alarmsTracker || {};
  const { alarmIds } = alarmsTracker || [];
  const [trips, setTrip] = useState(0);

  const [distance, setDistance] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const onChangeDateTime = obj => {
    setDateTime(obj);
    getHistory(obj);
    if (getAlarmsTracker) {
      getAlarmsTracker({
        trackerId: trackers[parseInt(trackerSelected)]?.device_id,
        limit: 500,
        page: 1,
        type: 'all',
      });
    }
  };

  const getHistory = obj => {
    const { fromDate, toDate } = obj || dateTime;
    getHistoryTracker({
      trackerId: trackers[parseInt(trackerSelected)]?.device_id,
      fromDate: fromDate,
      toDate: toDate,
      limit: 2000,
      page: 1,
      type: 2,
    });
  };

  const onUpdateRowPerPage = () => {
    setPage(page + 1);
  };

  const deviceInfo = [
    {
      title: t('dashboard:current_address'),
      data: currentAddress || '-',
    },
    {
      title: t('dashboard:total_time_travel'),
      data: '-',
    },
    {
      title: t('dashboard:odometer'),
      data: '-',
    },
    {
      title: t('dashboard:total_trip'),
      data: '-',
    },
    {
      title: t('dashboard:maximum_speed'),
      data: '-',
    },
    {
      title: t('dashboard:tracker_contenction'),
      data: trackers[parseInt(trackerSelected)]?.location_type || '-',
    },
    {
      title: t('dashboard:total_fuel_consumption'),
      data: '-',
    },
    {
      title: t('dashboard:maximum_altitued'),
      data: '-',
    },
  ];

  const summary = [
    {
      title: t('dashboard:distance'),
      dataView: Math.round(distance),
      subTitle: t('dashboard:total_distance'),
      date: moment().format('L'),
      unit: 'km',
    },
    {
      title: t('dashboard:trips'),
      dataView: trips,
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

  const callApiGetAddress = useCallback(async () => {
    if (trackers[parseInt(trackerSelected)]) {
      const address = await getAddress(trackers[parseInt(trackerSelected)]);
      setCurrentAddress(address);
    }
  }, [trackers, setCurrentAddress, trackerSelected]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

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

  useEffect(() => {
    if (historyTrackerIds && historyTrackerIds.length > 1) {
      setTrip(historyTrackerIds.length);
      const historyArrayPoints = historyTrackerIds.reduce(
        (historyArrayPoints, item, index) => {
          if (
            historyTracker[historyTrackerIds[index]]?.lng &&
            historyTracker[historyTrackerIds[index]]?.lat
          ) {
            historyArrayPoints.push([
              historyTracker[historyTrackerIds[index]].lng,
              historyTracker[historyTrackerIds[index]].lat,
            ]);
          }
          return historyArrayPoints;
        },
        []
      );

      if (historyArrayPoints.length > 1) {
        const lineHistory = lineString(historyArrayPoints);
        const totalDistance = length(lineHistory);
        if (totalDistance !== distance) {
          setDistance(totalDistance);
        }
      }
    }
    if (historyTrackerIds && historyTrackerIds.length <= 1) {
      setDistance(0);
      setTrip(historyTrackerIds.length);
    }
  }, [historyTracker, historyTrackerIds, distance]);

  const onCloseDashboard = () => {
    Router.push('/');
  };
  return (
    <div>
      <div className={classes.navBar}>
        <ArrowBackIosIcon
          className={classes.iconBack}
          onClick={onCloseDashboard}
        />{' '}
        {t('dashboard:dashboard')}
      </div>
      <>
        <HeaderDashboard>
          <DeviceSelection>
            <SelectOption
              name=""
              options={trackerList}
              label={'Select Tracker'}
              value={trackerSelected}
              onChangeOption={changeSelectTracker}
              t={t}
            />
          </DeviceSelection>
          <SelectGroup>
            <DateTimePicker
              t={t}
              isMobile={false}
              dateTime={dateTime}
              onChange={onChangeDateTime}
              isHistory={true}
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
                      <DataView>
                        {item.dataView}
                        <span className={classes.unitSize}>{item.unit}</span>
                      </DataView>
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
                {t('dashboard:online')} | {t('dashboard:last_update')}
                {moment(
                  trackers[parseInt(trackerSelected)]?.time * 1000
                ).format('lll')}
              </Description>
            </HeaderCard>
            <ContentCard>
              <MapView>
                {trackingIds && trackingIds.length > 0 ? (
                  <>
                    <MapCard
                      mapId="isDashboard"
                      selectedTrackerId={trackerSelected}
                      mapType="leaflet"
                      {...props}
                    />
                  </>
                ) : (
                  <React.Fragment>
                    <Map
                      fullWidth={true}
                      showTrackerName={true}
                      mapType="leaflet"
                      {...props}
                    />
                    <ToolBar {...props} />
                  </React.Fragment>
                )}{' '}
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
              {alarmIds &&
                alarmIds.length > 0 &&
                (rowsPerPage > 0
                  ? alarmIds.slice(0, page * rowsPerPage + rowsPerPage)
                  : alarmIds
                )?.map((item, index) => (
                  <RecentAlertComponent rowAlert={alarms[item]} key={index} />
                ))}
            </ContentCard>
            <div className={classes.footer} onClick={onUpdateRowPerPage}>
              {t('dashboard:load_more_alerts')}
            </div>
          </RecentAlertCard>
        </ContainerDashboard>
      </>
    </div>
  );
}
