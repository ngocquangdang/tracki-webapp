import React, { useState, useEffect } from 'react';
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
  } = props;
  console.log('DashboardContainer -> history', history);

  const [trackerList, setTrackerList] = useState([{ value: '', content: '' }]);
  const [trackerSlected, setTrackerSelected] = useState('');

  const deviceInfo = [
    {
      title: t('dashboard:device_information'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
    {
      title: t('dashboard:current_address'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
    {
      title: t('dashboard:total_time_travel'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
    {
      title: t('dashboard:odometer'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
    {
      title: t('dashboard:total_trip'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
    {
      title: t('dashboard:maximum_speed'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
    {
      title: t('dashboard:tracker_contenction'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
    {
      title: t('dashboard:total_fuel_consumption'),
      data:
        '25845, Railton St, Moreno Valley, Riverside County, California, 92553, USA',
    },
  ];

  const summary = [
    {
      title: t('dashboard:distance'),
      dataView: 876.2,
      subTitle: t('dashboard:total_distance'),
      date: '22/12/2020',
    },
    {
      title: t('dashboard:trips'),
      dataView: 222,
      subTitle: t('dashboard:total_trip'),
      date: '22/12/2020',
    },
    {
      title: t('dashboard:battery'),
      dataView: 87,
      subTitle: t('dashboard:battery_level'),
      date: '22/12/2020',
    },
    {
      title: t('dashboard:fuel'),
      dataView: 30,
      subTitle: t('dashboard:fuel_consumption'),
      date: '22/12/2020',
    },
  ];
  const online = true;

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
    getHistoryTracker({
      trackerId: device_id,
      fromDate: moment().unix(),
      toDate: moment().unix(),
      limit: 2000,
      page: 1,
      type: '',
    });
  };

  const onCloseAdd = () => console.log('aaaaa');
  console.log('tracker info,:', trackers[trackerSlected], moment().unix());
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
              value={trackerSlected}
              onChangeOption={changeSelectTracker}
            />
          </DeviceSelection>
          <SelectGroup>
            <SelectOption
              name=""
              options={trackerList}
              label={'Sellect Tracker'}
              value={trackerSlected}
              onChangeOption={changeSelectTracker}
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
                    online ? classes.primaryColor : classes.secondaryColor
                  }
                />{' '}
                {t('dasboard:online')} | {t('dashboard:last_update')} {''}
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
