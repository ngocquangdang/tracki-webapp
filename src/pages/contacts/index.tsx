import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IPage } from '@Interfaces';
import ContactContainer from '@Containers/Contacts';

const ContactsPage: NextPage = (props: any) => {
  return <ContactContainer {...props} />;
};

// export async function getServerSideProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['auth', 'contact'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

ContactsPage.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

export default withTranslation(['auth', 'contact'])(ContactsPage);
