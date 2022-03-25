import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';

import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/Store';

const CouponsStoreView: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

export default compose(withAuth, withTranslation(['common']))(CouponsStoreView);
