import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import ForgotContainer from '@Containers/auth/ForgotPassword';
import { IPage } from '@Interfaces';

const Forgot: NextPage = props => {
  return <ForgotContainer {...props} />;
};

Forgot.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation(['auth'])(Forgot);
