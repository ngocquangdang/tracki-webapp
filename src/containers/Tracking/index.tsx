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
import { mqttStart, mqttDisconnect } from '@Containers/Mqtt/actions';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import trackersSaga from '@Containers/Trackers/store/sagas';
import trackersReducer from '@Containers/Trackers/store/reducers';
import mqttSaga from '@Containers/Mqtt/sagas';
import mqttReducer from '@Containers/Mqtt/reducers';
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
  histories: object;
  settings: object;
  trackingIds: number[];
  mqttStart(): void;
  mqttDisconnect(): void;
  fetchUserRequestedAction(): void;
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  onResetSelectedTrackerID(): void;
  getHistoryTracker(data: object): void;
  [data: string]: any;
}

function TrackingContainer(props: Props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'tracking', saga: trackingSaga });
  useInjectReducer({ key: 'tracking', reducer: trackingReducer });
  useInjectSaga({ key: 'mqtt', saga: mqttSaga });
  useInjectReducer({ key: 'mqtt', reducer: mqttReducer });
  const {
    fetchUserRequestedAction,
    mqttStart,
    mqttDisconnect,
    ...rest
  } = props;
  useEffect(() => {
    fetchUserRequestedAction();
    mqttStart();
    return () => {
      mqttDisconnect();
    };
  }, [fetchUserRequestedAction, mqttStart, mqttDisconnect]);

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
  trackerHistories: makeSelectTrackerHistories(),
});

const mapDispatchToProps = (dispatch: any) => ({
  mqttStart: () => dispatch(mqttStart()),
  mqttDisconnect: () => dispatch(mqttDisconnect()),
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
