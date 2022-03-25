import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterContainer from '@Containers/auth/Register';
import withoutAuth from '@Components/hocs/withoutAuth';
import nextI18NextConfig from '../../../next-i18next.config';

const Register: NextPage = props => {
  return <RegisterContainer {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'], nextI18NextConfig)),
      // Will be passed to the page component as props
    },
  };
}

export default withoutAuth(withTranslation(['auth'])(Register));
