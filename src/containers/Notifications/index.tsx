import React, { memo, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { fetchUserRequestedAction } from '@Containers/App/store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withTranslation } from '@Server/i18n';

import { useInjectSaga } from '@Utils/injectSaga';
import { useInjectReducer } from '@Utils/injectReducer';

import trackersSaga from '@Containers/Trackers/store/sagas';
import trackersReducer from '@Containers/Trackers/store/reducers';
import notificationsSaga from './store/sagas';
import notificationsReducer from './store/reducers';

import { makeSelectProfile } from '@Containers/App/store/selectors';
import {
  makeSelectTrackers,
  makeSelectTrackerSettings,
} from '@Containers/Trackers/store/selectors';
import { fetchNotficationRequest } from './store/actions';
import { makeSelectNotifications } from './store/selectors';

const NotificationViewPC = dynamic(() => import('./views/ViewPC'));

function NotificationView(props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'notifications', saga: notificationsSaga });
  useInjectReducer({ key: 'notifications', reducer: notificationsReducer });

  const {
    fetchUserRequestedAction,
    fetchNotificationRequest,
    profile,
    ...rest
  } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);
  useEffect(() => {
    if (profile && profile.account_id) {
      fetchNotificationRequest({
        alarm_types: 'all',
        limit: 500,
        page: 1,
      });
    }
  }, [fetchNotificationRequest, profile]);
  return <NotificationViewPC {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  trackers: makeSelectTrackers(),
  settings: makeSelectTrackerSettings(),
  notifications: makeSelectNotifications(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  fetchNotificationRequest: (data: object) =>
    dispatch(fetchNotficationRequest(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(NotificationView) as React.ComponentType;