import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import ViewSubscription from '@Containers/Subscriptions';

const Subscription: NextPage = (props: any) => {
  return <ViewSubscription {...props} />;
};

Subscription.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common', 'subscription', 'tracker'] };
};

export default compose(withAuth, withTranslation('common'))(Subscription);
