import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DashboardContainer from '@Containers/Dasboard';
import nextI18NextConfig from '../../../next-i18next.config';
import withAuth from '@Components/hocs/withAuth';

const ns = ['dashboard', 'common', 'auth', 'tracker'];
const Dashboard: NextPage = props => {
  return <DashboardContainer {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns, nextI18NextConfig)),
      // Will be passed to the page component as props
    },
  };
}

export default withAuth(withTranslation(ns)(Dashboard));
