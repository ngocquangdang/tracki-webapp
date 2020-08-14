import React from 'react';

import BreadCrumb from '@Components/BreadCrumb';
import { MainLayout } from '@Layouts';
import SettingContent from './ViewContent';
import Header from './components/HeaderMobile';
import { SettingContainer } from './styles';

interface Props {
  isMobile?: boolean;
  [data: string]: any;
}

export default function AccountSetting(props: Props) {
  const { isMobile, ...rest } = props;

  const url = [{ name: 'Account Setting ', pathname: '#' }];

  return (
    <MainLayout isMobile={isMobile} header={<Header />} hasFooter={false}>
      <SettingContainer>
        {!isMobile && <BreadCrumb title={'Account Setting'} url={url} />}
        <SettingContent {...rest} />
      </SettingContainer>
    </MainLayout>
  );
}
