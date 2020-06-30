import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import LoginContainer from '@Containers/auth/Login';
import ILoginPage from '@Containers/auth/Login/interfaces';

const Login: NextPage = () => {
  return <LoginContainer />;
};

Login.getInitialProps = async (): Promise<ILoginPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

const Extended = withTranslation('auth')(Login);

export default Extended;
