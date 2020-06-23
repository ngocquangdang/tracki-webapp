import React from 'react';
import { NextPage } from 'next';

import { withTranslation } from '@Server/i18n';

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({
  t,
  i18n,
}) => {
  ``;

  return <div>Hihihihi</div>;
};

Home.getInitialProps = async (
  ctx: ReduxNextPageContext
): Promise<IHomePage.InitialProps> => {
  await ctx.store.dispatch(
    HomeActions.GetApod({
      params: { hd: true },
    })
  );
  return { namespacesRequired: ['common'] };
};

const Extended = withTranslation('common')(Home);

export default Extended;
