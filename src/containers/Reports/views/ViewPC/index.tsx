import React from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';

//components
import Tabs from './components/Tabs';
import OverviewReport from './components/Overview';

//styles
import { useStyles } from './styles';
import HistoryReport from './components/History';

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
    t,
  } = props;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.titleHead}>
          <BarChartIcon className={classes.iconReport} />
          <div className={classes.title}>Reports</div>
        </div>
        <Tabs changeReportView={changeReportView} viewMode={props.viewMode} />
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
          />
        )}
      </div>
    </div>
  );
}

export default ReportViewPC;
