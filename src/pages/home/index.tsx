import React from 'react';

import { MainLayout } from '@Layouts';
import SideBar from '@Components/sidebars';
const Home = (props: any) => {
  return (
    <MainLayout {...props}>
      <SideBar {...props}></SideBar>
    </MainLayout>
  );
};

export default Home;
