import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DashboardContainer from '@Containers/Dasboard';
import nextI18NextConfig from '../../../next-i18next.config';
import withoutAuth from '@Components/hocs/withoutAuth';

const Dashboard: NextPage = props => {
  return <DashboardContainer {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['dashboard'],
        nextI18NextConfig
      )),
      // Will be passed to the page component as props
    },
  };
}

export default withoutAuth(withTranslation(['dashboard'])(Dashboard));
