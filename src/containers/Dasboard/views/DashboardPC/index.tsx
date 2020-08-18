import React, { useState, useEffect } from 'react';
import moment from 'moment';

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
  Card,
  TitleCard,
  Content,
  DataView,
  SubCard,
  SummaryDate,
} from './styles';
import { ITracker } from '@Interfaces';
import { AiOutlineDashboard, AiFillInfoCircle } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaMapMarkerAlt, FaBell } from 'react-icons/fa';

interface Props {
  trackerIds: number[];
  trackers: ITracker;
  getHistoryTracker(data): void;
  t(key: string, format?: object): string;
}

export default function DashboardContainer(props) {
  const classes = useStyles();
  const { trackers, trackerIds, getHistoryTracker, history, t } = props;
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
      subTitle: t('dashboard:total_trips'),
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

  console.log('tracker info,:', trackers[trackerSlected], moment().unix());
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
            value={trackerSlected}
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
                  {t('dashboard:device_information')}
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
                  {deviceInfo.map(item => (
                    <TableRow>
                      <TableCell
                        component="th"
                        className={`${classes.color} ${classes.col1}`}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={`${classes.color} ${classes.col2}`}
                      >
                        {item.data}
                      </TableCell>
                    </TableRow>
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
                <SelectOption
                  name=""
                  options={trackerList}
                  label={'Sellect Tracker'}
                  value={trackerSlected}
                  onChangeOption={changeSelectTracker}
                />
              </SelectGroup>
              <Description>{t('dashboard:summary_description')}</Description>
            </HeaderCard>
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
                  {deviceInfo.map(item => (
                    <TableRow>
                      <TableCell
                        className={`${classes.color} ${classes.font14} `}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={`${classes.color} ${classes.font14} `}
                      >
                        cccc cc cc cccc
                      </TableCell>
                      <TableCell
                        align="left"
                        className={`${classes.color} ${classes.font14} `}
                      >
                        {item.data}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ContentCard>
            <div className={classes.footer}>
              {t('dashboard:load_more_alerts')}
            </div>
          </RecentAlertCard>
        </ColumnCard>
      </ContainerDashboard>
    </MainLayout>
  );
}
