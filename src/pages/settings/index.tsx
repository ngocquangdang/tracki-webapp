import React from 'react';
import { NextPage } from 'next';

import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { IPage } from '@Interfaces';
import SettingContainer from '@Containers/AccountSetting';
import withAuth from '@Components/hocs/withAuth';

const AccountSetting: NextPage = (props: any) => {
  return <SettingContainer {...props} />;
};
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default withAuth(withTranslation('auth')(AccountSetting));
