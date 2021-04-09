import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import TrackersContainer from '@Containers/Trackers';

interface Props {}

const SingleTrackerView: NextPage<IPage.InitialProps> = (props: Props) => {
  return <TrackersContainer {...props} />;
};

SingleTrackerView.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common', 'contact'] };
};

export default compose(
  withAuth,
  withTranslation(['common', 'contact'])
)(SingleTrackerView);
