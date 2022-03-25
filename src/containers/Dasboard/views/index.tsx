import React, { useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectProfile,
  makeSelectMapTile,
} from '@Containers/App/store/selectors';
import {
  makeSelectTrackers,
  makeSelectTrackerIds,
} from '@Containers/Trackers/store/selectors';
import { selectTrackerIdAction } from '@Containers/Trackers/store/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';

import trackingSaga from '@Containers/Tracking/store/sagas';
import trackingReducer from '@Containers/Tracking/store/reducers';

import {
  getHistoryTrackerRequest,
  changeTrackersTracking,
  getAlarmTrackerRequest,
} from '@Containers/Tracking/store/actions';
import {
  makeSelectTrackerHistories,
  makeSelectTrackerIdsTracking,
  makeSelectAlarmTracker,
  makeSelectTrackerHistoryIds,
} from '@Containers/Tracking/store/selectors';

import trackersSaga from '@Containers/Trackers/store/sagas';
import trackersReducer from '@Containers/Trackers/store/reducers';
import { firebaseLogEventRequest } from '@Utils/firebase';

const DashboardPC = dynamic(() => import('./DashboardPC'), { ssr: false });
const DashboardSP = dynamic(() => import('./DashboardSP'), { ssr: false });

function Dashboard(props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'tracking', saga: trackingSaga });
  useInjectReducer({ key: 'tracking', reducer: trackingReducer });

  const { fetchUserRequestedAction, isMobile } = props;

  useEffect(() => {
    firebaseLogEventRequest('dashboard_page', '');
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  if (isMobile) {
    return <DashboardSP {...props} />;
  }
  return <DashboardPC {...props} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  mapTile: makeSelectMapTile(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
  historyTracker: makeSelectTrackerHistories(),
  historyTrackerIds: makeSelectTrackerHistoryIds(),
  trackingIds: makeSelectTrackerIdsTracking(),
  alarmsTracker: makeSelectAlarmTracker(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  selectTrackerAction: (id: number) => dispatch(selectTrackerIdAction(id)),
  getHistoryTracker: (data: object) => dispatch(getHistoryTrackerRequest(data)),
  getAlarmsTracker: (data: object) => dispatch(getAlarmTrackerRequest(data)),
  changeTrackersTracking: (ids: number[]) =>
    dispatch(changeTrackersTracking(ids)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(Dashboard) as React.ComponentType;
