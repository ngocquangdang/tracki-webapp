import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import { MainLayout, SettingLayout } from '@Layouts';
import { IPage } from '@Interfaces';
import SettingContainer from '@Containers/AccountSetting';

interface State {
  url: {
    pathname: string;
    name: string;
  }[];
}

const AccountSetting: NextPage = props => {
  const { t } = props;
  const url = [{ pathname: '/settings', name: `${t('auth:account_setting')}` }];
  return (
    <MainLayout {...props}>
      <SettingLayout title={t('account_setting')} url={url}>
        <SettingContainer {...props} />
      </SettingLayout>
    </MainLayout>
  );
};

AccountSetting.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(AccountSetting);
