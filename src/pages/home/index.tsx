import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import { IPage } from '@Interfaces';
import { MainLayout } from '@Layouts';
import withAuth from '@Components/hocs/withAuth';

const Home: NextPage = props => {
  return <MainLayout {...props}>Home content</MainLayout>;
};

Home.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withAuth(withTranslation('auth')(Home));
