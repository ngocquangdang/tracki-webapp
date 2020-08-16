import React from 'react';

import BreadCrumb from '@Components/BreadCrumb';
import { MainLayout } from '@Layouts';
import SettingContent from './ViewContent';
import Header from './HeaderMobile';
import { ChangePWContainer } from './styles';

interface Props {
  isMobile?: boolean;
  [data: string]: any;
}

export default function ChangePassword(props: Props) {
  const { isMobile, ...rest } = props;

  const url = [
    { pathname: '/settings', name: `${'Account Setting'}` },
    { pathname: '/change-password', name: `${'Change Password'}` },
  ];

  return (
    <MainLayout isMobile={isMobile} header={<Header />} hasFooter={false}>
      <ChangePWContainer>
        {!isMobile && <BreadCrumb title={'Change Password'} url={url} />}
        <SettingContent {...rest} />
      </ChangePWContainer>
    </MainLayout>
  );
}
