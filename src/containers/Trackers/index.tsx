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
  makeSelectTrackerIds,
  makeSelectTrackerId,
  makeSelectGeofences,
  makeSelectGeofenceId,
  makeSelectGeofenceIds,
  makeSelectTrackerSettings,
  makeSelectBeep,
} from '@Containers/Trackers/store/selectors';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import {
  resetSelectedTrackerIdAction,
  selectTrackerIdAction,
  searchTrackersRequestedAction,
  selectGeofenceIdAction,
  resetSelectedGeofenceAction,
  searchGeofencesRequestedAction,
  saveGeofenceRequestedAction,
} from '@Containers/Trackers/store/actions';
import {
  resetBeepAction,
  sendBeepRequest,
} from '@Containers/SingleTracker/store/actions';
import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';
import saga from './store/sagas';
import reducer from './store/reducers';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';

import contactSaga from '@Containers/Contacts/store/sagas';
import contactReducer from '@Containers/Contacts/store/reducers';

import View from './view';

interface Props {
  trackerId?: any;
  t(key: string, format?: object): string;
  fetchUserRequestedAction(): void;
  [data: string]: any;
}

function TrackersContainer(props: Props) {
  useInjectSaga({ key: 'tracker', saga });
  useInjectReducer({ key: 'tracker', reducer });
  useInjectSaga({ key: 'contacts', saga: contactSaga });
  useInjectReducer({ key: 'contacts', reducer: contactReducer });

  const { fetchUserRequestedAction, ...rest } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  mapTile: makeSelectMapTile(),
  selectedTrackerId: makeSelectTrackerId(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
  geofences: makeSelectGeofences(),
  geofenceIds: makeSelectGeofenceIds(),
  selectedGeofenceId: makeSelectGeofenceId(),
  settings: makeSelectTrackerSettings(),
  isBeep: makeSelectBeep(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  selectTrackerAction: (id: number) => dispatch(selectTrackerIdAction(id)),
  searchTrackersRequest: (search: string | null) =>
    dispatch(searchTrackersRequestedAction(search)),
  onResetSelectedTrackerID: () => dispatch(resetSelectedTrackerIdAction()),
  selectGeofenceIdAction: (id: number) => dispatch(selectGeofenceIdAction(id)),
  resetSelectedGeofenceAction: () => dispatch(resetSelectedGeofenceAction()),
  searchGeofencesAction: (k: string) =>
    dispatch(searchGeofencesRequestedAction(k)),
  updateGeofenceAction: (geoId: number, data: object) =>
    dispatch(saveGeofenceRequestedAction(geoId, data)),
  onClickSendBeep: (data: object) => dispatch(sendBeepRequest(data)),
  resetBeep: () => dispatch(resetBeepAction()),
  showSnackbar: (data: SNACK_PAYLOAD) => dispatch(showSnackbar(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(TrackersContainer) as React.ComponentType;
