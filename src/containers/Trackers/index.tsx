import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
import {
  makeSelectProfile,
  makeSelectTrackers,
  makeSelectTrackerIds,
  makeSelectTrackerId,
} from '@Containers/App/store/selectors';
import {
  fetchUserRequestedAction,
  resetSelectedTrackerIdAction,
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
  selectedTrackerId: makeSelectTrackerId(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  selectedTrackerAction: (id: number) =>
    dispatch(selectedSingleTrackerRequestAction(id)),
  onResetSelectedTrackerID: () => dispatch(resetSelectedTrackerIdAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(TrackersContainer) as React.ComponentType;
