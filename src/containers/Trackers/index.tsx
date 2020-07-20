import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
import {
  makeSelectProfile,
  makeSelectTrackers,
  makeSelectTrackerIds,
  makeSelectSingleTrackerId,
} from '@Containers/App/store/selectors';
import {
  fetchUserRequestedAction,
  selectedSingleTrackerRequestAction,
} from '@Containers/App/store/actions';

import View from './view';

interface Props {
  fetchUserRequestedAction(): void;
}

function TrackersContainer(props: Props) {
  const { fetchUserRequestedAction, ...rest } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
  selectedTrackerId: makeSelectSingleTrackerId(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  selectedSingleTracker: (id: number) =>
    dispatch(selectedSingleTrackerRequestAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(TrackersContainer) as React.ComponentType;
