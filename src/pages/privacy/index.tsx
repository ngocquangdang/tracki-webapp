import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import TermsAndPrivacy from '@Containers/TermsAndPrivacy';
import { IPage } from '@Interfaces';

const TermsAndPrivacyPage: NextPage = props => {
  console.log('prkkkkops', props);
  return <TermsAndPrivacy {...props} />;
};

TermsAndPrivacyPage.getInitialProps = async (
  props
): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth'] };
};

export default withTranslation('auth')(TermsAndPrivacyPage);
