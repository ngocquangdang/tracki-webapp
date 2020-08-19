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

import { makeSelectProfile } from '@Containers/App/store/selectors';
import {
  makeSelectTrackers,
  makeSelectTrackerSettings,
} from '@Containers/Trackers/store/selectors';
// import saga from './store/sagas';
// import reducer from './store/reducers';
// import {
//   makeSelectErrors,
//   makeSelectIsRequesting,
//   makeSelectContacts,
//   makeSelectContactIds,
// } from './store/selector';
// import {
//   getContactListRequestAction,
//   searchContactRequestedAction,
//   editContactRequestedAction,
//   deleteContactRequestedAction,
//   addContactRequestAction,
// } from './store/actions/index.';

const NotificationViewPC = dynamic(() => import('./views/ViewPC'));

function NotificationView(props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });

  // const { getContactListRequest, isMobile } = props;
  const { fetchUserRequestedAction, ...rest } = props;
  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);
  return <NotificationViewPC {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  trackers: makeSelectTrackers(),
  settings: makeSelectTrackerSettings(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(NotificationView) as React.ComponentType;
