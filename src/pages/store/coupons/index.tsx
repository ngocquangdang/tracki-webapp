import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';

import { withTranslation } from '@Server/i18n';
import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/Store';

const CouponsStoreView: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

CouponsStoreView.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

export default compose(withAuth, withTranslation(['common']))(CouponsStoreView);
