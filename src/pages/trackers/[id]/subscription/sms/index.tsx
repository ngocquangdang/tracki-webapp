import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withTranslation } from 'next-i18next';

import withAuth from '@Components/hocs/withAuth';
import nextI18nextConfig from 'next-i18next.config';
import ViewSubscription from '@Containers/Subscriptions';

const ns = ['common', 'subscription', 'tracker'];

const Subscription: NextPage = (props: any) => {
  return <ViewSubscription {...props} />;
};

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns, nextI18nextConfig)),
    },
  };
};

export default compose(withAuth, withTranslation(ns))(Subscription);
