import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import { MainLayout, SettingLayout } from '@Layouts';
import { IPage } from '@Interfaces';
import ChangePasswordContainer from '@Containers/auth/ChangePassword';

interface State {
  url: {
    pathname: string;
    name: string;
  }[];
}
const ChangePassword: NextPage = props => {
  const { t } = props;
  const url = [
    { pathname: '/settings', name: `${t('auth:account_setting')}` },
    { pathname: '/change-password', name: `${t('auth:change_password')}` },
  ];

  return (
    <MainLayout {...props}>
      <SettingLayout title={t('auth:change_password')} url={url}>
        <ChangePasswordContainer {...props} />
      </SettingLayout>
    </MainLayout>
  );
};

ChangePassword.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(ChangePassword);
