import React from 'react';

import { MainLayout } from '@Layouts';
import Map from '@Containers/Map';

const Home = (props: any) => {
  return (
    <MainLayout {...props}>
      <Map />
    </MainLayout>
  );
};

export default Home;
