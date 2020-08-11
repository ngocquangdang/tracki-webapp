import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
import {
  makeSelectProfile,
  makeSelectMapTile,
} from '@Containers/App/store/selectors';
import {
  makeSelectTrackers,
  makeSelectGeofences,
  makeSelectTrackerSettings,
} from '@Containers/Trackers/store/selectors';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import {
  changeTrackersTracking,
  getHistoryTrackerRequest,
  changeTrackingView,
} from '@Containers/Tracking/store/actions';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import trackersSaga from '@Containers/Trackers/store/sagas';
import trackersReducer from '@Containers/Trackers/store/reducers';
import trackingSaga from './store/sagas';
import trackingReducer from './store/reducers';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';

import {
  makeSelectTrackerIdsTracking,
  makeSelectViewMode,
  makeSelectTrackerHistories,
} from './store/selectors';
import View from './view';

interface Props {
  trackerId?: any;
  viewMode: string;
  isMobile: boolean;
  trackers: object;
  trackingIds: number[];
  fetchUserRequestedAction(): void;
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  onResetSelectedTrackerID(): void;
  [data: string]: any;
  histories: object;
}

function TrackingContainer(props: Props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'tracking', saga: trackingSaga });
  useInjectReducer({ key: 'tracking', reducer: trackingReducer });
  const { fetchUserRequestedAction, ...rest } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  mapTile: makeSelectMapTile(),
  trackers: makeSelectTrackers(),
  geofences: makeSelectGeofences(),
  settings: makeSelectTrackerSettings(),
  trackingIds: makeSelectTrackerIdsTracking(),
  viewMode: makeSelectViewMode(),
  histories: makeSelectTrackerHistories(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  changeTrackingView: (mode: string) => dispatch(changeTrackingView(mode)),
  changeTrackersTracking: (ids: number[]) =>
    dispatch(changeTrackersTracking(ids)),
  getHistoryTracker: (data: object) => dispatch(getHistoryTrackerRequest(data)),
  showSnackbar: (data: SNACK_PAYLOAD) => dispatch(showSnackbar(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(TrackingContainer) as React.ComponentType;
