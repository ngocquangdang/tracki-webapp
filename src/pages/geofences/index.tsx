import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/Trackers';

const TrackersView: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['auth'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

TrackersView.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

export default compose(withAuth, withTranslation('auth'))(TrackersView);
