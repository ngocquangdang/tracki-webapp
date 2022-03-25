import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PrivacyContainer from '@Containers/TermsAndPrivacy';
// import { IPage } from '@Interfaces';

const Privacy: NextPage = props => {
  return <PrivacyContainer {...props} />;
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['auth'])),
//       // Will be passed to the page component as props
//     },
//   };
// }
export default withTranslation('auth')(Privacy);
