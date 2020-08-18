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

import trackersSaga from '@Containers/Trackers/store/sagas';
import trackersReducer from '@Containers/Trackers/store/reducers';

import historySaga from '../store/sagas';
import historyReducer from '../store/reducers';
import { getHistoryTrackerRequest } from '../store/actions';
import { makeSelectTrackerHistories } from '../store/selectors';

const DashboardPC = dynamic(() => import('./DashboardPC'));

function Dashboard(props) {
  useInjectSaga({ key: 'tracker', saga: trackersSaga });
  useInjectReducer({ key: 'tracker', reducer: trackersReducer });
  useInjectSaga({ key: 'history', saga: historySaga });
  useInjectReducer({ key: 'history', reducer: historyReducer });

  const { fetchUserRequestedAction } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return <DashboardPC {...props} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  mapTile: makeSelectMapTile(),
  selectedTrackerId: makeSelectTrackerId(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
  history: makeSelectTrackerHistories(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  selectTrackerAction: (id: number) => dispatch(selectTrackerIdAction(id)),
  getHistoryTracker: (data: object) => dispatch(getHistoryTrackerRequest(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['common', 'auth', 'tracker'])
)(Dashboard) as React.ComponentType;
