import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/Trackers';

const TrackersView: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

TrackersView.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default compose(withAuth, withTranslation('auth'))(TrackersView);