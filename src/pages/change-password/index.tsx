import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { IPage } from '@Interfaces';
import ChangePasswordContainer from '@Containers/auth/ChangePassword';

const ChangePassword: NextPage = (props: any) => {
  return <ChangePasswordContainer {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default withTranslation('auth')(ChangePassword);
