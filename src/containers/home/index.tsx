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

import { ViewHomePC, ViewHomeMobile } from './views';
import { MainLayoutMobile, MainLayout } from '@Layouts';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';
interface Props {
  userAgent?: string;
  fetchUserRequestedAction: any;
}
function HomeContainer(props: Props) {
  const { userAgent, fetchUserRequestedAction } = props;

  const isMobile = Boolean(
    userAgent?.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  useEffect(() => {
    fetchUserRequestedAction();
  }, [fetchUserRequestedAction]);

  return isMobile ? (
    <MainLayoutMobile>
      <ViewHomeMobile />
    </MainLayoutMobile>
  ) : (
    <MainLayout>
      <ViewHomePC />
    </MainLayout>
  );
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
