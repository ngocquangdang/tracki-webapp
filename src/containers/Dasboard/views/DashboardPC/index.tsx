import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import L from 'leaflet';

import { MainLayout } from '@Layouts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SelectOption from '@Components/selections';
import Map from '@Components/Maps';

import {
  HeaderDashboard,
  TitleDashBoard,
  DeviceSelection,
  ContainerDashboard,
  MapViewCard,
  SummaryCard,
  DeviceInfoCard,
  RecentAlertCard,
  ColumnCard,
  ContentCard,
  MapView,
  Title,
  IconDashboard,
  useStyles,
  SelectGroup,
  Description,
  HeaderCard,
  CardTitle,
  DetailSummary,
} from './styles';

import { ITracker } from '@Interfaces';
import { AiOutlineDashboard, AiFillInfoCircle } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaMapMarkerAlt, FaBell } from 'react-icons/fa';

import DateTimePicker from '@Components/DateTimePicker';
import axios from 'axios';
import { MAPBOX_API_KEY } from '@Definitions/app';
import RecentAlertConponent from './components/RecentAlert';
import SummaryComponent from './components/Summary';
import DeviceInfoComponent from './components/DeviceInfo';

interface Props {
  trackerIds: number[];
  trackers: ITracker;
  getHistoryTracker(data): void;
  getAlarmsTracker(data): void;
  t(key: string, format?: object): string;
  changeTrackersTracking: any;

  historyTrackerIds: number[];
  historyTracker: object;

  alarmsTracker: {
    alarmIds: number[];
    alarms: Alarms;
  };
}

interface Alarms {
  address: string;
  age: number;
  alarm_type: string;
  archived: boolean;
  created: number;
  device_id: number;
  id: number;
  lat: number;
  lng: number;
  message: string;
  priority: string;
  read: boolean;
  speed: number;
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

  const deviceInfo = [
    {
      title: t('dashboard:current_address'),
      data: currentAddress,
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
      dataView: initialHistoryIds?.length || 0,
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
      dataView: 0,
      subTitle: t('dashboard:fuel_consumption'),
      date: moment().format('L'),
    },
  ];

  useEffect(() => {
    setInitialHistories(historyTracker);
    setInitialHistoryIds(historyTrackerIds);
  }, [historyTracker, historyTrackerIds]);

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

  useEffect(() => {
    setAlarmList(alarmsTracker);
  }, [alarmsTracker]);

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

  return (
    <MainLayout>
      <HeaderDashboard>
        <TitleDashBoard>
          <IconDashboard>
            <AiOutlineDashboard className={classes.iconHeader} />
          </IconDashboard>
          <Title>{t('dashboard:dashboard')}</Title>
        </TitleDashBoard>
        <DeviceSelection>
          <SelectOption
            name=""
            options={trackerList}
            label={'Sellect Tracker'}
            value={trackerSelected}
            onChangeOption={changeSelectTracker}
          />
        </DeviceSelection>
      </HeaderDashboard>
      <ContainerDashboard>
        <ColumnCard>
          <MapViewCard>
            <HeaderCard className={classes.paddingHeaderCard}>
              <CardTitle>
                <div className={`${classes.color} ${classes.cellHeader}`}>
                  <FaMapMarkerAlt className={classes.iconCard} />
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
                <Map isTracking={true} mapType="leaflet" {...props} />
              </MapView>
            </ContentCard>
          </MapViewCard>
          <DeviceInfoCard>
            <ContentCard>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} className={`${classes.color}`}>
                      <div className={`${classes.color} ${classes.cellHeader}`}>
                        <AiFillInfoCircle className={classes.iconCard} />
                        {t('dashboard:device_information')}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deviceInfo.map((item, index) => (
                    <DeviceInfoComponent key={index} device={item} />
                  ))}
                </TableBody>
              </Table>
            </ContentCard>
          </DeviceInfoCard>
        </ColumnCard>
        <ColumnCard>
          <SummaryCard>
            <HeaderCard>
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
              <Description>{t('dashboard:summary_description')}</Description>
            </HeaderCard>
            <ContentCard>
              <DetailSummary>
                {summary.map((item, index) => (
                  <SummaryComponent key={index} summary={item} />
                ))}
              </DetailSummary>
            </ContentCard>
          </SummaryCard>
          <RecentAlertCard>
            <ContentCard>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} className={`${classes.color}`}>
                      <div className={`${classes.color} ${classes.cellHeader}`}>
                        <FaBell className={classes.iconCard} />
                        {t('dashboard:recent_alerts')}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={`${classes.color} ${classes.col1}`}>
                      {t('dashboard:when')}
                    </TableCell>
                    <TableCell
                      className={`${classes.color} ${classes.col1}`}
                      align="left"
                    >
                      {t('dashboard:description')}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={`${classes.color} ${classes.col2}`}
                    >
                      {t('dashboard:address')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? alarmList?.alarmIds.slice(
                        0,
                        page * rowsPerPage + rowsPerPage
                      )
                    : alarmList?.alarmIds
                  )?.map(item => (
                    <RecentAlertConponent rowAlert={alarmList?.alarms[item]} />
                  ))}
                </TableBody>
              </Table>
            </ContentCard>
            <div className={classes.footer} onClick={onUpdateRowPerPage}>
              {t('dashboard:load_more_alerts')}
            </div>
          </RecentAlertCard>
        </ColumnCard>
      </ContainerDashboard>
    </MainLayout>
  );
}
