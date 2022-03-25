import { IPage } from '@Interfaces';
import { NextPage } from 'next';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import View from '@Containers/Wallet/components/Dashboard/components/MypointScreen';
import { compose } from 'redux';
import withAuth from '@Components/hocs/withAuth';
import { withTranslation } from 'next-i18next';
import nextI18nextConfig from 'next-i18next.config';

const Wallet: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['wallet'], nextI18nextConfig)),
      // Will be passed to the page component as props
    },
  };
}
export default compose(withAuth, withTranslation(['wallet']))(Wallet);
