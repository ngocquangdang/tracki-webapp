import React, { useState } from 'react';

import { SideBarInnerMobile } from '@Components/sidebars';
import ListTrakerMobile from '@Components/TrackerListMobile';
import MainWrapper from './MainWrapper';
import HeaderMobile from './Header';
import Footer from './Footer';
import { Content, useStyles } from './styles';

interface Props {
  header?: JSX.Element;
  noFooter?: boolean;
  t(key: string): string;
  [data: string]: any;
}

function MainLayoutMobile(props: Props) {
  const { header, noFooter, children, ...rest } = props;
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleOpenSideBar = () => setOpenSidebar(!openSidebar);
  const handleCloseSideBar = () => setOpenSidebar(false);

  return (
    <MainWrapper className={classes.root}>
      <div className={openSidebar ? classes.blurHeader : ''}>
        {header || (
          <HeaderMobile
            open={openSidebar}
            handleOpenSideBar={handleOpenSideBar}
            onClick={handleCloseSideBar}
            {...rest}
          />
        )}
      </div>
      <SideBarInnerMobile
        open={openSidebar}
        handleOpenSideBar={handleOpenSideBar}
      >
        <ListTrakerMobile closeSidebar={handleOpenSideBar} />
      </SideBarInnerMobile>
      <div className={openSidebar ? classes.blurHeader : ''}>
        <Content
          className={`${classes.content} ${
            openSidebar ? classes.contentShift : ''
          }`}
          onClick={handleCloseSideBar}
        >
          {children}
        </Content>
        {!noFooter && <Footer t={rest.t} />}
      </div>
    </MainWrapper>
  );
}

export default MainLayoutMobile;
