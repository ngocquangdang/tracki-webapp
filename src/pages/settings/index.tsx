import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import { MainLayout, SettingLayout } from '@Layouts';
import { IPage } from '@Interfaces';
import SettingContainer from '@Containers/AccountSetting';
import withAuth from '@Components/hocs/withAuth';

interface State {
  url: {
    pathname: string;
    name: string;
  }[];
}

const AccountSetting: NextPage = (props: any) => {
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

export default withAuth(withTranslation('auth')(AccountSetting));
