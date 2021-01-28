import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withTranslation } from '@Server/i18n';

//useInject
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';

//actions
import {
  changeReportViewMode,
  fetchHistoryLogsRequest,
  fetchHistoryRecentStopRequest,
  fetchNotificationUnreadRequest,
  fetchHistorySpeedsRequest,
  fetchHistoryTripRequest,
} from './store/actions';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';

//selectors
import {
  makeSelectTrackerIds,
  makeSelectTrackers,
  makeSelectIsFetchingTracker,
} from '@Containers/Trackers/store/selectors';
import {
  makeSelectViewMode,
  makeSelectNotifications,
  makeSelectNotificationsIds,
  makeSelectHistoryStopIds,
  makeSelectHistoryStops,
  makeSelecteFetchingDataNoti,
  makeSelecteFetchingDataStop,
  makeSelectHistoryLogIds,
  makeSelectHistoryLogs,
  makeSelectFetchingHistoryLogs,
  makeSelectHistorySpeeds,
  makeSelectHistorySpeedIds,
  makeSelectFetchingHistorySpeeds,
  makeSelectHistoryTripIds,
  makeSelectHistoryTrips,
  makeSelectFetchingHistoryTrips,
} from './store/selectors';
import { firebaseLogEventRequest } from '@Utils/firebase';

import { makeSelectProfile } from '@Containers/App/store/selectors';

//sagas
import trackersSaga from '@Containers/Trackers/store/sagas';
import reportsSagas from './store/sagas';
//reducer
import trackersReducer from '@Containers/Trackers/store/reducers';
import reportsReducer from './store/reducers';

//components
import View from './view';

function ReportsContainer(props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'reports', saga: reportsSagas });
  useInjectReducer({ key: 'reports', reducer: reportsReducer });
  const { fetchUserRequestedAction, ...rest } = props;

  useEffect(() => {
    fetchUserRequestedAction();
    firebaseLogEventRequest('reports_page', '');
  }, [fetchUserRequestedAction]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
  notificationIds: makeSelectNotificationsIds(),
  notifications: makeSelectNotifications(),
  viewMode: makeSelectViewMode(),
  historyStops: makeSelectHistoryStops(),
  historyStopIds: makeSelectHistoryStopIds(),
  historyLogs: makeSelectHistoryLogs(),
  historyLogIds: makeSelectHistoryLogIds(),
  historySpeeds: makeSelectHistorySpeeds(),
  historySpeedIds: makeSelectHistorySpeedIds(),
  isFetchingHistorySpeed: makeSelectFetchingHistorySpeeds(),
  isFetchingHistoryLogs: makeSelectFetchingHistoryLogs(),
  isFetchingDataNoti: makeSelecteFetchingDataNoti(),
  isFetchingDataStop: makeSelecteFetchingDataStop(),
  isFetchingTracker: makeSelectIsFetchingTracker(),
  isFetchingTrips: makeSelectFetchingHistoryTrips(),
  trips: makeSelectHistoryTrips(),
  tripIds: makeSelectHistoryTripIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeReportView: (mode: string) => dispatch(changeReportViewMode(mode)),
  fetchNotificationUnread: (query: string) =>
    dispatch(fetchNotificationUnreadRequest(query)),
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  fetchHistoryStop: (data: object) =>
    dispatch(fetchHistoryRecentStopRequest(data)),
  fetchHistoryLogs: (data: object) => dispatch(fetchHistoryLogsRequest(data)),
  fetchHistorySpeeds: (data: object) =>
    dispatch(fetchHistorySpeedsRequest(data)),
  fetchHistoryTrips: (data: object) => dispatch(fetchHistoryTripRequest(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(ReportsContainer) as React.ComponentType;
