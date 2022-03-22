import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PublicMapContainer from '@Containers/PublicMap';
// import { IPage } from '@Interfaces';

const PublicMap: NextPage = props => {
  return <PublicMapContainer {...props} />;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default withTranslation('auth')(PublicMap);
