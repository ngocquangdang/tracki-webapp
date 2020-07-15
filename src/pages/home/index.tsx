import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
import { NextPageContext } from 'next';
import { IPage } from '@Interfaces';
import { MainLayout, MainLayoutMobile } from '@Layouts';
import withAuth from '@Components/hocs/withAuth';
import View from '@Containers/home';

const Home: NextPage<IPage.InitialProps> = props => {
  const isMobile = Boolean(
    props.userAgent?.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  return (
    <Fragment>
      {isMobile ? (
        <MainLayoutMobile>
          <View />
        </MainLayoutMobile>
      ) : (
        <MainLayout {...props}>
          <View />
        </MainLayout>
      )}
    </Fragment>
  );
};

Home.getInitialProps = async ({
  req,
}: NextPageContext): Promise<IPage.InitialProps> => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { namespacesRequired: ['auth'], userAgent };
};

export default compose(withAuth, withTranslation('auth'))(Home);
