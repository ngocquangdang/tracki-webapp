import React, { useState } from 'react';
import MainWrapper from './MainWrapper';
import HeaderMobile from './Header';
import { Content, useStyles } from './styles';
import MenuMobile from './MenuMobile';
import { SideBarMobile } from '@Components/sidebars';
import ListDeviceTrakerMobile from '@Components/traker-list';

function MainLayoutMobile(props: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenSideBar = () => {
    setOpen(!open);
  };
  const handleCloseSideBar = () => {
    setOpen(false);
  };
  return (
    <MainWrapper className={classes.root}>
      <div className={open ? classes.blurHeader : ''}>
        <HeaderMobile
          open={open}
          handleOpenSideBar={handleOpenSideBar}
          onClick={handleCloseSideBar}
        />
      </div>
      <SideBarMobile open={open} handleOpenSideBar={handleOpenSideBar}>
        <ListDeviceTrakerMobile />
      </SideBarMobile>
      <div className={open ? classes.blurHeader : ''}>
        <Content
          className={`${classes.content} ${open ? classes.contentShift : ''}`}
          onClick={handleCloseSideBar}
        >
          {props.children}
        </Content>
        <MenuMobile />
      </div>
    </MainWrapper>
  );
}

export default MainLayoutMobile;
