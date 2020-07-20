import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import { withTranslation } from '@Server/i18n';
import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';

const SettingsTracker: NextPage<IPage.InitialProps> = props => {
  const router = useRouter();
  const { id } = router.query;
  console.log('_______SettingsTracker id', id);

  return <div>SETTING SettingsTracker</div>;
};

SettingsTracker.getInitialProps = async ({
  req,
}: NextPageContext): Promise<IPage.InitialProps> => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { namespacesRequired: ['auth'], userAgent };
};

export default compose(withAuth, withTranslation('auth'))(SettingsTracker);
