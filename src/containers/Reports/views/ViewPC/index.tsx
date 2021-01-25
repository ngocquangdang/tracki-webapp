import React, { useState } from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';

//components
import { SideBarInnerPC } from '@Components/sidebars';
import Map from '@Components/Maps';
import MapToolBars from '@Components/Maps/components/MapToolBar';

import Tabs from './components/Tabs';
import OverviewReport from './components/Overview';
import HistoryReport from './components/History';
import ReportStops from './components/Stops';
import ReportSpeeds from './components/Speed';
//styles
import { useStyles } from './styles';

interface Props {
  isMobile: boolean;
  trackers: object;
  trackerIds: number[];
  notificationIds: number[];
  notifications: object;
  viewMode: string;
  changeReportView(mode: string): void;
  fetchNotificationUnread(query: string): void;
  fetchHistoryStop(data: object): void;
  fetchHistoryLogs(data: object): void;
  fetchHistorySpeeds(data: object): void;
  fetchHistoryTrips(data: object): void;
  historyStops: object;
  historyStopIds: object;
  profile: any;
  historyLogs: object;
  historyLogIds: object;
  historySpeeds: object;
  historySpeedIds: object;
  trips: object;
  tripIds: number[];
  isFetchingHistorySpeed: boolean;
  isFetchingHistoryLogs: boolean;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
  isFetchingTrips: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function ReportViewPC(props: Props) {
  const classes = useStyles();
  const {
    viewMode,
    changeReportView,
    trackers,
    trackerIds,
    fetchHistoryLogs,
    historyLogs,
    historyLogIds,
    isFetchingHistoryLogs,
    fetchHistoryStop,
    fetchHistorySpeeds,
    historySpeeds,
    isFetchingHistorySpeed,
    historySpeedIds,
    historyStops,
    historyStopIds,
    isFetchingDataStop,
    t,
    ...rest
  } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);
  const toggleSideBar = () => {
    setOpenSidebar(!isOpenSidebar);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };
  const openSideBar = () => setOpenSidebar(true);

  return viewMode === 'trip' ? (
    <div className={classes.containerTrip}>
      <SideBarInnerPC opened={isOpenSidebar} onChange={toggleSideBar}>
        <Tabs
          {...rest}
          t={t}
          trackers={trackers}
          trackerIds={trackerIds}
          viewMode={viewMode}
        />
      </SideBarInnerPC>
      <div className={classes.mapView}>
        <React.Fragment>
          <Map
            mapType="leaflet"
            openSideBar={openSideBar}
            isTracking={true}
            {...props}
          />
          <MapToolBars t={t} />
        </React.Fragment>
      </div>
    </div>
  ) : (
    <div className={classes.container}>
      <div className={classes.boxShadow}>
        <div className={classes.header}>
          <div className={classes.titleHead}>
            <BarChartIcon className={classes.iconReport} />
            <div className={classes.title}>Reports</div>
          </div>
          <Tabs changeReportView={changeReportView} viewMode={props.viewMode} />
        </div>
      </div>
      <div className={classes.content}>
        {viewMode === 'overview' && <OverviewReport {...props} />}
        {viewMode === 'history' && (
          <HistoryReport
            trackers={trackers}
            trackerIds={trackerIds}
            fetchHistoryLogs={fetchHistoryLogs}
            historyLogs={historyLogs}
            historyLogIds={historyLogIds}
            isFetchingHistoryLogs={isFetchingHistoryLogs}
            t={t}
            viewMode={viewMode}
          />
        )}
        {viewMode === 'stop' && (
          <ReportStops
            trackers={trackers}
            trackerIds={trackerIds}
            fetchHistoryStop={fetchHistoryStop}
            historyStops={historyStops}
            historyStopIds={historyStopIds}
            isFetchingDataStop={isFetchingDataStop}
            t={t}
            viewMode={viewMode}
          />
        )}
        {viewMode === 'speed' && (
          <ReportSpeeds
            trackers={trackers}
            trackerIds={trackerIds}
            fetchHistorySpeeds={fetchHistorySpeeds}
            historySpeeds={historySpeeds}
            historySpeedIds={historySpeedIds}
            isFetchingHistorySpeed={isFetchingHistorySpeed}
            t={t}
            viewMode={viewMode}
          />
        )}
      </div>
    </div>
  );
}

export default ReportViewPC;
