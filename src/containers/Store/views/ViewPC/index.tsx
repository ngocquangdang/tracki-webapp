import React from 'react';

import Tabs from './components/Tabs';
import { Container, SideBar } from './styles';

interface Props {
  isMobile: boolean;
  viewMode: string;
  changeStoreView(mode: string): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function StoreContainer(props: Props) {
  const { onResetSelectedTrackerID, ...rest } = props;
  return (
    <Container>
      <SideBar>
        <Tabs {...rest} />
      </SideBar>
    </Container>
  );
}
