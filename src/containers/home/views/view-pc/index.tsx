import React, { useState } from 'react';
import { SideBar } from '@Components/sidebars';
import Map from '@Containers/Map';

import { Container, MapView, ContainerSideBar } from './styles';
import ListDeviceTrackerPC from '../../trackers';

export default function ViewHomePC(props: any) {
  const { devices, isRequesting } = props;

  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const handleChangee = () => {
    setOpenSidebar(!isOpenSidebar);
  };
  return (
    <Container>
      <ContainerSideBar>
        <SideBar opened={isOpenSidebar} onChange={handleChangee}>
          <ListDeviceTrackerPC
            isLoading={isRequesting}
            devices={devices?.devices || []}
          />
        </SideBar>
      </ContainerSideBar>
      <MapView fullWidth={!isOpenSidebar}>
        <Map fullWidth={!isOpenSidebar} />
      </MapView>
    </Container>
  );
}
