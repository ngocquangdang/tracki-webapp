import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withTranslation } from '@Server/i18n';

import {
  makeSelectProfile,
  makeSelectTrackers,
  makeSelectTrackerIds,
} from '@Containers/App/store/selectors';

import View from './views';
// import DevicePage from './interfaces';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';

function HomeContainer(props: any) {
  const { fetchUserRequestedAction } = props;

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return <View {...props} />;
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withTranslation(['auth'])
)(HomeContainer) as React.ComponentType;
