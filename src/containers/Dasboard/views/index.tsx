import React, { useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectProfile,
  makeSelectMapTile,
} from '@Containers/App/store/selectors';
import {
  makeSelectTrackerId,
  makeSelectTrackers,
  makeSelectTrackerIds,
} from '@Containers/Trackers/store/selectors';
import { selectTrackerIdAction } from '@Containers/Trackers/store/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';

import trackingSaga from '@Containers/Tracking/store/sagas';
import trackingReducer from '@Containers/Tracking/store/reducers';

// import historySaga from '../store/sagas';
// import historyReducer from '../store/reducers';
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

const DashboardPC = dynamic(() => import('./DashboardPC'));
const DashboardSP = dynamic(() => import('./DashboardSP'));

function Dashboard(props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'tracking', saga: trackingSaga });
  useInjectReducer({ key: 'tracking', reducer: trackingReducer });

  const { fetchUserRequestedAction, isMobile } = props;

  useEffect(() => {
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
  selectedTrackerId: makeSelectTrackerId(),
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
