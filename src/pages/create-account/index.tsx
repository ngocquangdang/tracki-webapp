import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import RegisterContainer from '@Containers/auth/Register';
import { IPage } from '@Interfaces';

const Register: NextPage = props => {
  return <RegisterContainer {...props} />;
};

Register.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation(['auth'])(Register);
