import { IPage } from '@Interfaces';
import { NextPage } from 'next';
import React from 'react';
import { withTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { compose } from 'redux';

import View from '@Containers/Wallet';
import withAuth from '@Components/hocs/withAuth';

const Wallet: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};
// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['wallet'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

export default compose(withAuth, withTranslation(['wallet']))(Wallet);
