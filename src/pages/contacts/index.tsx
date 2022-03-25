import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactContainer from '@Containers/Contacts';
import nextI18NextConfig from '../../../next-i18next.config';

const ContactsPage: NextPage = (props: any) => {
  return <ContactContainer {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['auth', 'contact'],
        nextI18NextConfig
      )),
      // Will be passed to the page component as props
    },
  };
}

export default withTranslation(['auth', 'contact'])(ContactsPage);
