import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ForgotContainer from '@Containers/auth/ForgotPassword';
import { IPage } from '@Interfaces';
import withoutAuth from '@Components/hocs/withoutAuth';

const Forgot: NextPage = props => {
  return <ForgotContainer {...props} />;
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['auth'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

Forgot.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

export default withoutAuth(withTranslation(['auth'])(Forgot));
