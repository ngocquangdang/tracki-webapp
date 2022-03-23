import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterContainer from '@Containers/auth/Register';
import { IPage } from '@Interfaces';
import withoutAuth from '@Components/hocs/withoutAuth';

const Register: NextPage = props => {
  return <RegisterContainer {...props} />;
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['auth'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

Register.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

export default withoutAuth(withTranslation(['auth'])(Register));
