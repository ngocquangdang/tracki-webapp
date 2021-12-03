import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { lineString } from '@turf/turf';
import length from '@turf/length';
import { getAddress } from '@Utils/helper';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MainLayout } from '@Layouts';
import { ITracker } from '@Interfaces';
import SelectOption from '@Components/selections';

import {
  HeaderDashboard,
  TitleDashBoard,
  DeviceSelection,
  ContainerDashboard,
  SummaryCard,
  DeviceInfoCard,
  RecentAlertCard,
  ColumnCard,
  ContentCard,
  Title,
  IconDashboard,
  useStyles,
} from './styles';

import RecentAlertConponent from './components/RecentAlert';
import SummaryComponent from './components/Summary';
import DeviceInfoComponent from './components/DeviceInfo';
import MapViewComponent from './components/MapView';
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
    historyTracker,
    historyTrackerIds,
    t,
    changeTrackersTracking,
    alarmsTracker,
  } = props;

  const [trackerList = [], setTrackerList] = useState([
    { value: '', content: '' },
  ]);
  const [trackerSelected, setTrackerSelected] = useState(trackerList[0]?.value);
  const [trips, setTrip] = useState(0);
  const { alarms } = alarmsTracker || {};
  const { alarmIds } = alarmsTracker || [];
  const [distance, setDistance] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(null);

  const callApiGetAddress = useCallback(async () => {
    if (trackers[parseInt(trackerSelected)]) {
      const address = await getAddress(trackers[parseInt(trackerSelected)]);
      setCurrentAddress(address);
    }
  }, [trackers, setCurrentAddress, trackerSelected]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

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
      dataView: 0,
      subTitle: t('dashboard:fuel_consumption'),
      date: moment().format('L'),
    },
  ];

  useEffect(() => {
    let newTrackerLIst = [];
    newTrackerLIst = trackerIds?.map(item => {
      return {
        value: trackers[item].device_id || '',
        content: trackers[item].device_name || '',
      };
    });
    setTrackerList(newTrackerLIst);
  }, [trackers, trackerIds, changeTrackersTracking]);

  const changeSelectTracker = device_id => {
    setCurrentAddress(null);
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
            t={t}
            name=""
            options={trackerList}
            label={'Select Tracker'}
            value={trackerSelected}
            onChangeOption={changeSelectTracker}
          />
        </DeviceSelection>
      </HeaderDashboard>
      <ContainerDashboard>
        <ColumnCard>
          <MapViewComponent
            trackerSelected={trackers[parseInt(trackerSelected)]}
            {...props}
          />
          <DeviceInfoCard>
            <ContentCard>
              <DeviceInfoComponent deviceInfo={deviceInfo} {...props} />
            </ContentCard>
          </DeviceInfoCard>
        </ColumnCard>
        <ColumnCard>
          <SummaryCard>
            <SummaryComponent
              summary={summary}
              {...props}
              tracker={trackers[parseInt(trackerSelected)]}
            />
          </SummaryCard>
          <RecentAlertCard>
            <ContentCard>
              <RecentAlertConponent
                alarms={alarms}
                alarmIds={alarmIds}
                {...props}
              />
            </ContentCard>
          </RecentAlertCard>
        </ColumnCard>
      </ContainerDashboard>
    </MainLayout>
  );
}
