import React, { useState } from 'react';
import SideBar from '@Components/sidebars';
import Map from '@Containers/Map';

import { Container, MapView } from './styles';

export default function HomeContainer() {
  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const handleChangee = () => {
    setOpenSidebar(!isOpenSidebar);
  };
  return (
    <Container>
      <SideBar opened={isOpenSidebar} onChange={handleChangee} />
      <MapView fullWidth={!isOpenSidebar}>
        <Map fullWidth={!isOpenSidebar} />
      </MapView>
    </Container>
  );
}
