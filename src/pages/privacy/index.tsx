import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TermsAndPrivacy from '@Containers/TermsAndPrivacy';
import nextI18nextConfig from 'next-i18next.config';

const TermsAndPrivacyPage: NextPage = props => {
  return <TermsAndPrivacy {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'], nextI18nextConfig)),
      // Will be passed to the page component as props
    },
  };
}

export default withTranslation('auth')(TermsAndPrivacyPage);
