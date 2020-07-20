import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';
import {
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
  trackerId: number | string;
  fetchUserRequestedAction(): void;
}

function SingleTrackerContainer(props: Props) {
  const { fetchUserRequestedAction, ...rest } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return <View {...rest} />;
}

const mapStateToProps = createStructuredSelector({
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
  withTranslation(['common'])
)(SingleTrackerContainer) as React.ComponentType;
