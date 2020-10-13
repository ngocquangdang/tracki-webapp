import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import { IPage } from '@Interfaces';
import ChangePasswordContainer from '@Containers/auth/ChangePassword';

const ChangePassword: NextPage = (props: any) => {
  return <ChangePasswordContainer {...props} />;
};

ChangePassword.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(ChangePassword);
