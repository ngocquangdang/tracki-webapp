import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Router from 'next/router';
import { Button } from '@Components/buttons';
import { FaMapMarkerAlt } from 'react-icons/fa';

//components
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { TAB_KEYS } from '@Containers/Reports/store/constants';
import OverviewReportMobile from './components/Overview';
import HistoryReportMobile from './components/History';
import ReportStopsMobile from './components/Stops';
import ReportSpeedMobile from './components/Speed';
import ReportTripMobile from './components/Trip';
import SelectTracker from './components/SelectTracker';
//styles
import { useStyles } from './styles';

type Trip = {
  points: Object;
  pointIds: number[];
};
interface Props {
  isMobile: boolean;
  trackers: object;
  trackerIds: any;
  notificationIds: number[];
  notifications: object;
  viewMode: string;
  changeReportView(mode: string): void;
  fetchNotificationUnread(query: string): void;
  fetchHistoryStop(data: object): void;
  fetchHistoryLogs(data: object): void;
  fetchHistorySpeeds(data: object): void;
  fetchHistoryTrips(data: object): void;
  setPointSelected(point: object): void;
  setOptimizedTrip(coordinate: any): void;
  changeModeViewMap(modeMap: string): void;
  coordinateOptimized: number[];
  selectedPoints: object;
  selectedPointIds: number[];
  historyStops: object;
  historyStopIds: object;
  profile: any;
  historyLogs: object;
  historyLogIds: object;
  historySpeeds: object;
  historySpeedIds: object;
  trips: Trip;
  tripIds: number[];
  isFetchingHistorySpeed: boolean;
  isFetchingHistoryLogs: boolean;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
  isFetchingTrips: boolean;
  modeMap: string;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function ReportViewMobile(props: Props) {
  const classes = useStyles();
  const {
    viewMode,
    changeReportView,
    t,
    trackers,
    trackerIds,
    fetchHistoryTrips,
    isFetchingTrips,
    trips,
    tripIds,
    setPointSelected,
  } = props;

  const [currentTab, setTab] = useState(0);
  const [showSelectTracker, setShowSelectTracker] = useState(false);

  const onClickSelectDevice = () => {
    setShowSelectTracker(true);
  };
  const onCloseSelectTracker = () => setShowSelectTracker(false);
  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    changeReportView(TAB_KEYS[newValue]);
  };

  return (
    <>
      <SideBarOutside
        title={
          viewMode === 'trip' ? (
            <div className={classes.flexRow}>
              <div>Report Trip</div>
              <Button
                text={t('tracker:select_device')}
                color="secondary"
                startIcon={<FaMapMarkerAlt className={classes.headerBtnIcon} />}
                onClick={onClickSelectDevice}
                className={classes.headerBtn}
              />
            </div>
          ) : (
            `Reports - ${viewMode}`
          )
        }
        show={true}
        direction="right"
        handleClose={Router.back}
        isMobile={true}
        isNotSave={true}
      >
        <div className={classes.container}>
          <div className={classes.content}>
            {viewMode === 'overview' && <OverviewReportMobile {...props} />}
            {viewMode === 'history' && <HistoryReportMobile {...props} />}
            {viewMode === 'stop' && <ReportStopsMobile {...props} />}
            {viewMode === 'speed' && <ReportSpeedMobile {...props} />}
            {viewMode === 'trip' && <ReportTripMobile {...props} />}
          </div>
          <div className={classes.footer}>
            <Tabs
              value={currentTab}
              onChange={onChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
              TabIndicatorProps={{ className: classes.indicator }}
              className={classes.tabs}
            >
              {TAB_KEYS.map((key: string, index: number) => (
                <Tab
                  key={key}
                  label={key}
                  value={index}
                  className={classes.tabItem}
                />
              ))}
            </Tabs>
          </div>
        </div>
      </SideBarOutside>
      {viewMode === 'trip' && (
        <SelectTracker
          show={showSelectTracker}
          onClose={onCloseSelectTracker}
          trackers={trackers}
          trackerIds={trackerIds}
          t={t}
          fetchHistoryTrips={fetchHistoryTrips}
          isFetchingTrips={isFetchingTrips}
          trips={trips}
          tripIds={tripIds}
          setPointSelected={setPointSelected}
        />
      )}
    </>
  );
}

export default ReportViewMobile;
