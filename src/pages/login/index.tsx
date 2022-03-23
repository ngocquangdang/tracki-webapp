import React from 'react';
// import { NextPage } from 'next';
// import { withTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoginContainer from '@Containers/auth/Login';
// import { IPage } from '@Interfaces';
import withoutAuth from '@Components/hocs/withoutAuth';

const Login = props => {
  console.log('🚀 ~ file: index.tsx ~ line 11 ~ props', props);
  return <LoginContainer {...props} />;
};

Login.getInitialProps = async () => {
  return { namespacesRequired: ['auth'] };
};
export default withoutAuth(Login);

// Login.getServerSideProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['auth', 'tracker'])),
//       // Will be passed to the page component as props
//     },
//     redirect: '/',
//   };
// };
