import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
import { makeSelectMapTile } from '@Containers/App/store/selectors';
import {
  makeSelectTrackers,
  makeSelectTrackerIds,
  makeSelectTrackerId,
  makeSelectGeofences,
  makeSelectGeofenceId,
  makeSelectGeofenceIds,
  makeSelectTrackerSettings,
  makeSelectBeep,
  makeSelectAlerts,
  makeSelectAlertsIds,
  makeSelectAlertSosTrackerId,
} from '@Containers/Trackers/store/selectors';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import { getHistoryTrackerRequest } from '@Containers/Tracking/store/actions';
import {
  resetSelectedTrackerIdAction,
  selectTrackerIdAction,
  searchTrackersRequestedAction,
  selectGeofenceIdAction,
  resetSelectedGeofenceAction,
  searchGeofencesRequestedAction,
  saveGeofenceRequestedAction,
  refreshLocationRequestAction,
  getSOSalertTrackerRequestAction,
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
import trackingSaga from '@Containers/Tracking/store/sagas';
import trackingReducer from '@Containers/Tracking/store/reducers';
import profileSaga from '@Containers/AccountSetting/store/sagas';
import profileReducer from '@Containers/AccountSetting/store/reducers';
import View from './view';
import { makeSelectUserProfile } from '@Containers/AccountSetting/store/selectors';

interface Props {
  trackerId?: any;
  t(key: string, format?: object): string;
  fetchUserRequestedAction(): void;
  getHistoryTracker(data: object): void;
  refreshLocation(data: object): void;
  getSOSalertTracker(data: object): void;
  [data: string]: any;
}

function TrackersContainer(props: Props) {
  useInjectSaga({ key: 'tracker', saga });
  useInjectReducer({ key: 'tracker', reducer });
  useInjectSaga({ key: 'contacts', saga: contactSaga });
  useInjectReducer({ key: 'contacts', reducer: contactReducer });
  useInjectSaga({ key: 'tracking', saga: trackingSaga });
  useInjectReducer({ key: 'tracking', reducer: trackingReducer });
  useInjectSaga({ key: 'profile', saga: profileSaga });
  useInjectReducer({ key: 'profile', reducer: profileReducer });

  const { fetchUserRequestedAction, ...rest } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectUserProfile(),
  mapTile: makeSelectMapTile(),
  selectedTrackerId: makeSelectTrackerId(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
  geofences: makeSelectGeofences(),
  geofenceIds: makeSelectGeofenceIds(),
  selectedGeofenceId: makeSelectGeofenceId(),
  settings: makeSelectTrackerSettings(),
  isBeep: makeSelectBeep(),
  alerts: makeSelectAlerts(),
  alertsIds: makeSelectAlertsIds(),
  alertSosTrackerId: makeSelectAlertSosTrackerId(),
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
  getHistoryTracker: (data: object) => dispatch(getHistoryTrackerRequest(data)),
  refreshLocation: (data: object) =>
    dispatch(refreshLocationRequestAction(data)),
  getSOSalertTracker: (data: object) =>
    dispatch(getSOSalertTrackerRequestAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(TrackersContainer) as React.ComponentType;
