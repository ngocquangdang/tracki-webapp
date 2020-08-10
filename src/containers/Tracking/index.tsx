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
import { changeTrackersTracking } from '@Containers/Tracking/store/actions';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import trackersSaga from '@Containers/Trackers/store/sagas';
import trackersReducer from '@Containers/Trackers/store/reducers';
import trackingSaga from './store/sagas';
import trackingReducer from './store/reducers';

import { makeSelectTrackerIdsTracking } from './store/selectors';
import View from './view';

interface Props {
  trackerId?: any;
  fetchUserRequestedAction(): void;
  changeTrackersTracking(ids: number[]): void;
  [data: string]: any;
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
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  changeTrackersTracking: (ids: number[]) =>
    dispatch(changeTrackersTracking(ids)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(TrackingContainer) as React.ComponentType;
