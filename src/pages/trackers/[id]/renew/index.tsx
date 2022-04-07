import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withTranslation } from 'next-i18next';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/Renew';
import nextI18nextConfig from 'next-i18next.config';

const ns = ['common', 'tracker', 'subscription'];

const TrackerRenew: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns, nextI18nextConfig)),
    },
  };
};
export default compose(withAuth, withTranslation(ns))(TrackerRenew);
// export default TrackerRenew;
