import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/Trackers';
import nextI18nextConfig from 'next-i18next.config';

const ns = ['common', 'auth', 'tracker'];

const TrackersView: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

export async function getServerSideProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns, nextI18nextConfig)),
      // Will be passed to the page component as props
    },
  };
}

export default compose(withAuth, withTranslation(ns))(TrackersView);
