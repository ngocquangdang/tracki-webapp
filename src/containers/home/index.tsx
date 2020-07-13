import React, { useState } from 'react';
import SideBar from '@Components/sidebars';
import Map from '@Containers/Map';

import { Container, MapView, ContainerSideBar } from './styles';

export default function HomeContainer() {
  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const handleChangee = () => {
    setOpenSidebar(!isOpenSidebar);
  };
  return (
    <Container>
      <ContainerSideBar>
        <SideBar opened={isOpenSidebar} onChange={handleChangee} />
      </ContainerSideBar>
      <MapView fullWidth={!isOpenSidebar}>
        <Map fullWidth={!isOpenSidebar} />
      </MapView>
    </Container>
  );
}
