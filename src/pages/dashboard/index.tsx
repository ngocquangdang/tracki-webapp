import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import DashboardContainer from '@Containers/Dasboard';
import { IPage } from '@Interfaces';

const Dashboard: NextPage = props => {
  return <DashboardContainer {...props} />;
};

Dashboard.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['dashboard'] };
};

export default withTranslation(['dashboard'])(Dashboard);
