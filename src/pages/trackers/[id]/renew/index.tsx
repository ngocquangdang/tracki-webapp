import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/Renew';

const TrackerRenew: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

TrackerRenew.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common', 'tracker', 'subscription'] };
};

export default compose(
  withAuth,
  withTranslation(['common', 'tracker', 'subscription'])
)(TrackerRenew);
