import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withTranslation } from 'next-i18next';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import TrackersContainer from '@Containers/Trackers';
import nextI18nextConfig from 'next-i18next.config';

const ns = ['common'];

const SettingsTracker: NextPage<IPage.InitialProps> = props => {
  return <TrackersContainer {...props} />;
};

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns, nextI18nextConfig)),
    },
  };
};
export default compose(withAuth, withTranslation(ns))(SettingsTracker);
