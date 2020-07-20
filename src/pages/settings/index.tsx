import React from 'react';
import { NextPage } from 'next';

import { withTranslation } from '@Server/i18n';
import { IPage } from '@Interfaces';
import SettingContainer from '@Containers/AccountSetting';
import withAuth from '@Components/hocs/withAuth';

const AccountSetting: NextPage = (props: any) => {
  return <SettingContainer {...props} />;
};

AccountSetting.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withAuth(withTranslation('auth')(AccountSetting));
