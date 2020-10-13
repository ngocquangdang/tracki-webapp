import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/AddTracker';

const AddTracker: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

AddTracker.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['tracker', 'subscription'] };
};

export default compose(
  withAuth,
  withTranslation(['tracker', 'subscription'])
)(AddTracker);
