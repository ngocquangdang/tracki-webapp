import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { IPage } from '@Interfaces';
import ChangePasswordContainer from '@Containers/auth/ChangePassword';
import nextI18NextConfig from '../../../next-i18next.config';

const ChangePassword: NextPage = (props: any) => {
  return <ChangePasswordContainer {...props} />;
};

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'], nextI18NextConfig)),
    },
  };
};

export default withTranslation('auth')(ChangePassword);
