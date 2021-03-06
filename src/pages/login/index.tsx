import React from 'react';
import { NextPage } from 'next';
// import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoginContainer from '@Containers/auth/Login';
// import { IPage } from '@Interfaces';
import withoutAuth from '@Components/hocs/withoutAuth';
import nextI18NextConfig from 'next-i18next.config';

const Login: NextPage = props => {
  return <LoginContainer {...props} />;
};

export const getServerSideProps = async ({ locale = 'en' }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'], nextI18NextConfig)),
    },
  };
};

export default withoutAuth(Login);
