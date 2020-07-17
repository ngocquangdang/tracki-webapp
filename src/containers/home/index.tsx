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

import { ViewHomePC, ViewHomeMobile } from './views';
import { MainLayoutMobile, MainLayout } from '@Layouts';
import {
  fetchUserRequestedAction,
  selectedSingleTrackerRequestAction,
  resetSelectedTrackerIdAction,
} from '@Containers/App/store/actions';

interface Props {
  userAgent?: string;
  fetchUserRequestedAction(): void;
  selectedTrackerId: number | null;
  selectedTrackerAction(): void;
  resetSelectedSingleTrackerAction(): void;
}

function HomeContainer(props: Props) {
  const { userAgent, fetchUserRequestedAction, ...rest } = props;
  const isMobile = Boolean(
    userAgent?.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  if (isMobile) {
    return (
      <MainLayoutMobile>
        <ViewHomeMobile {...rest} />
      </MainLayoutMobile>
    );
  }

  return (
    <MainLayout>
      <ViewHomePC {...rest} />
    </MainLayout>
  );
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
)(HomeContainer) as React.ComponentType;
