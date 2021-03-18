import { IPage } from '@Interfaces';
import { NextPage } from 'next';
import React from 'react';

import View from '@Containers/Wallet/components/MyWallet/CashIn';
import { compose } from 'redux';
import withAuth from '@Components/hocs/withAuth';
import { withTranslation } from '@Server/i18n';

const Wallet: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

Wallet.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['wallet'] };
};

export default compose(withAuth, withTranslation(['wallet']))(Wallet);
