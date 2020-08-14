import React from 'react';
import { NextPage } from 'next';
import { withTranslation } from '@Server/i18n';

import { IPage } from '@Interfaces';
import ContactContainer from '@Containers/Contacts';

const ContactsPage: NextPage = (props: any) => {
  return <ContactContainer {...props} />;
};

ContactsPage.getInitialProps = async (): Promise<IPage.InitialProps> => {
  return { namespacesRequired: ['auth', 'contact'] };
};

export default withTranslation(['auth', 'contact'])(ContactsPage);
