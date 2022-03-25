import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IPage } from '@Interfaces';
// import withAuth from '@Components/hocs/withAuth';
import TrackersContainer from '@Containers/Trackers';
import { withTranslation } from 'next-i18next';
import nextI18nextConfig from 'next-i18next.config';

interface Props {}

const SingleTrackerView: NextPage<IPage.InitialProps> = (props: Props) => {
  return <TrackersContainer {...props} />;
};

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
    },
  };
};

export default compose(withTranslation('common'))(SingleTrackerView);
