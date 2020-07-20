import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { compose } from 'redux';
import { withTranslation } from '@Server/i18n';
import { useRouter } from 'next/router';

import { IPage } from '@Interfaces';
import withAuth from '@Components/hocs/withAuth';
import SingleTracker from '@Containers/SingleTracker';

const SingleTrackerView: NextPage<IPage.InitialProps> = props => {
  const router = useRouter();
  const { id } = router.query;

  return <SingleTracker trackerId={id} />;
};

SingleTrackerView.getInitialProps = async ({
  req,
}: NextPageContext): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['common'] };
};

export default compose(withAuth, withTranslation('common'))(SingleTrackerView);
