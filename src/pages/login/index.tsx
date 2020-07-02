import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import LoginContainer from '@Containers/auth/Login';
import { IPage } from '@Interfaces';

const Login: NextPage = props => {
  return <LoginContainer {...props} />;
};

Login.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(Login);
