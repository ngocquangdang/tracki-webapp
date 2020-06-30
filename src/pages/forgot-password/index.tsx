import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import ForgotContainer from '@Containers/auth/ForgotPassword';
import IForgotPage from './interfaces';

const Forgot: NextPage = () => {
  return <ForgotContainer />;
};

Forgot.getInitialProps = async (): Promise<IForgotPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

const Extended = withTranslation('common')(Forgot);

export default Extended;
