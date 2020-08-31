import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import PublicMapContainer from '@Containers/PublicMap';
import { IPage } from '@Interfaces';

const PublicMap: NextPage = props => {
  return <PublicMapContainer {...props} />;
};

PublicMap.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(PublicMap);
