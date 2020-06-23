import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import LoginContainer from '@Containers/auth/Login';
import ILoginPage from './interfaces';

const Login: NextPage = () => {
  return <LoginContainer />;
};

Login.getInitialProps = async (): Promise<ILoginPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

const Extended = withTranslation('common')(Login);

export default Extended;
