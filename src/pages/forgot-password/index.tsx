import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import ForgotContainer from '@Containers/auth/ForgotPassword';
import IForgotPage from '@Containers/auth/ForgotPassword/interfaces';

const Forgot: NextPage = props => {
  return <ForgotContainer {...props} />;
};

Forgot.getInitialProps = async (): Promise<IForgotPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation(['auth'])(Forgot);
