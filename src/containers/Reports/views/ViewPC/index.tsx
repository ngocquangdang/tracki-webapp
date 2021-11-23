import React, { useState } from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';
import dynamic from 'next/dynamic';
//components
import { SideBarInnerPC } from '@Components/sidebars';

import Tabs from './components/Tabs';
import OverviewReport from './components/Overview';
import HistoryReport from './components/History';
import ReportStops from './components/Stops';
import ReportSpeeds from './components/Speed';
import ToolbarControlPlayback from '../components/ToolbarControlPlayback';
//styles
import { useStyles } from './styles';

const MapCard = dynamic(
  () => import('@Containers/Reports/views/components/MapCard'),
  {
    ssr: false,
  }
);
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
  trips: object;
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
    selectedPoints,
    selectedPointIds,
    coordinateOptimized,
    ...rest
  } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);
  const [isPlaying, setTogglePlaying] = useState(false);
  const [steps, setSteps] = useState(1000);
  const [counter, setCounter] = useState(0);

  const toggleSideBar = () => {
    setOpenSidebar(!isOpenSidebar);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  const togglePlaying = () => setTogglePlaying(!isPlaying);
  const onChangeSpeeds = steps => {
    setSteps(steps);
  };
  const onChangeCounter = value => {
    setCounter(value);
  };
  const onChangeModeViewMap = value => {
    rest.changeModeViewMap(value);
  };
  const handleReplay = () => setCounter(0);
  return viewMode === 'trip' ? (
    <div className={classes.containerTrip}>
      <SideBarInnerPC opened={isOpenSidebar} onChange={toggleSideBar}>
        <Tabs
          {...rest}
          t={t}
          trackers={trackers}
          trackerIds={trackerIds}
          viewMode={viewMode}
          changeReportView={changeReportView}
          selectedPoints={selectedPoints}
          selectedPointIds={selectedPointIds}
        />
      </SideBarInnerPC>
      <div className={classes.mapView}>
        <React.Fragment>
          <MapCard
            mapId="mapHistory"
            historyLogs={selectedPoints}
            historyLogIds={selectedPointIds}
            isPlaying={isPlaying}
            togglePlaying={togglePlaying}
            mapType="leaflet"
            t={t}
            isMobile={false}
            viewMode={viewMode}
            counter={counter}
            steps={steps}
            onChangeCounter={onChangeCounter}
            coordinateOptimized={coordinateOptimized}
            changeModeViewMap={rest.changeModeViewMap}
            modeMap={rest.modeMap}
            // currentPointId={currentPointId}
          />
          {selectedPointIds?.length > 0 && (
            <ToolbarControlPlayback
              isOpenSidebar={isOpenSidebar}
              togglePlaying={togglePlaying}
              isPlaying={isPlaying}
              onChangeSpeeds={onChangeSpeeds}
              valControl={rest.modeMap}
              counter={counter}
              onChangeCounter={onChangeCounter}
              steps={steps}
              onChangeControl={onChangeModeViewMap}
              onReplay={handleReplay}
            />
          )}
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
