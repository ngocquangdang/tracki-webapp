import React from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';

//components
import Tabs from './components/Tabs';
import OverviewReport from './components/Overview';

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
  historyStops: object;
  historyStopIds: object;
  profile: any;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function ReportViewPC(props: Props) {
  const classes = useStyles();
  const { viewMode, changeReportView } = props;

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
      </div>
    </div>
  );
}

export default ReportViewPC;
