import React from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';

//components
import Tabs from './components/Tabs';
import OverviewReport from './components/Overview';
import HistoryReport from './components/History';
import ReportStops from './components/Stops';

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
  historyStops: object;
  historyStopIds: object;
  profile: any;
  historyLogs: object;
  historyLogIds: object;
  isFetchingHistoryLogs: boolean;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
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
    historyStops,
    historyStopIds,
    isFetchingDataStop,
    t,
  } = props;

  return (
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
      </div>
    </div>
  );
}

export default ReportViewPC;
