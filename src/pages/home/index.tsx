import React from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
import { NextPageContext } from 'next';
import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/home';

const Home: NextPage<IPage.InitialProps> = props => {
  return <View {...props} />;
};

Home.getInitialProps = async ({
  req,
}: NextPageContext): Promise<IPage.InitialProps> => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { namespacesRequired: ['auth'], userAgent };
};

export default compose(withAuth, withTranslation('auth'))(Home);
