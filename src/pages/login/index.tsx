import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import LoginContainer from '@Containers/auth/Login';
import { IPage } from '@Interfaces';
import withoutAuth from '@Components/hocs/withoutAuth';

const Login: NextPage = props => {
  return <LoginContainer {...props} />;
};

Login.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withoutAuth(withTranslation('auth')(Login));
