import React, { useState } from 'react';
import MainWrapper from './MainWrapper';
import HeaderMobile from './Header';
import { Content, useStyles } from './styles';
import MenuMobile from './MenuMobile';
import { SideBarMobile } from '@Components/sidebars';
import ListTrakerMobile from '@Components/TrackerListMobile';

interface Props {
  header?: JSX.Element;
  noFooter?: boolean;
  [data: string]: any;
  t: Function;
}

function MainLayoutMobile(props: Props) {
  const { t } = props;
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
        {props.header || (
          <HeaderMobile
            open={open}
            handleOpenSideBar={handleOpenSideBar}
            onClick={handleCloseSideBar}
          />
        )}
      </div>
      <SideBarMobile open={open} handleOpenSideBar={handleOpenSideBar}>
        <ListTrakerMobile closeSidebar={handleOpenSideBar} />
      </SideBarMobile>
      <div className={open ? classes.blurHeader : ''}>
        <Content
          className={`${classes.content} ${open ? classes.contentShift : ''}`}
          onClick={handleCloseSideBar}
        >
          {props.children}
        </Content>
        {!props.noFooter && <MenuMobile t={t} />}
      </div>
    </MainWrapper>
  );
}

export default MainLayoutMobile;
