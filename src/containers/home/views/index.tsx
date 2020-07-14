import React, { useState } from 'react';
import SideBar from '@Components/sidebars';
import Map from '@Containers/Map';

import { Container, MapView } from './styles';
import ListDevice from '../trackers';

export default function HomeContainer(props: any) {
  const { devices, isRequesting } = props;

  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const handleChangee = () => {
    setOpenSidebar(!isOpenSidebar);
  };

  return (
    <Container>
      <SideBar opened={isOpenSidebar} onChange={handleChangee}>
        <ListDevice isLoading={isRequesting} devices={devices?.devices || []} />
      </SideBar>
      <MapView fullWidth={!isOpenSidebar}>
        <Map fullWidth={!isOpenSidebar} />
      </MapView>
    </Container>
  );
}
