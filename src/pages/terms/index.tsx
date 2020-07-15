import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import PrivacyContainer from '@Containers/TermsAndPrivacy';
import { IPage } from '@Interfaces';

const Privacy: NextPage = props => {
  return <PrivacyContainer {...props} />;
};

Privacy.getInitialProps = async (props): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(Privacy);
