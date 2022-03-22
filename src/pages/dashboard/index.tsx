import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DashboardContainer from '@Containers/Dasboard';
// import { IPage } from '@Interfaces';

const Dashboard: NextPage = props => {
  return <DashboardContainer {...props} />;
};
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['dashboard'])),
      // Will be passed to the page component as props
    },
  };
}

export default withTranslation(['dashboard'])(Dashboard);
