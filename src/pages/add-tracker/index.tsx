import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/AddTracker';
import nextI18NextConfig from '../../../next-i18next.config';

const AddTracker: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['tracker', 'subscription'],
        nextI18NextConfig
      )),
      // Will be passed to the page component as props
    },
  };
}

export default compose(
  withAuth,
  withTranslation(['tracker', 'subscription'])
)(AddTracker);
