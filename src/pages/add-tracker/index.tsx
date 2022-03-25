import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/AddTracker';

const AddTracker: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['tracker', 'subscription'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

AddTracker.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

export default compose(
  withAuth,
  withTranslation(['tracker', 'subscription'])
)(AddTracker);
