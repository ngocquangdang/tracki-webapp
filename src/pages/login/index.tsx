import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import LoginContainer from '@Containers/auth/Login';
import ILoginPage from '@Containers/auth/Login/interfaces';

const Login: NextPage = (props) => {
  return <LoginContainer {...props}/>;
};

Login.getInitialProps = async (): Promise<ILoginPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(Login);
