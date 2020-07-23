import React, { useState } from 'react';
import MainWrapper from './MainWrapper';
import HeaderMobile from './Header';
import { Content, useStyles } from './styles';
import Footer from './Footer';
import { SideBarInnerMobile } from '@Components/sidebars';
import ListTrakerMobile from '@Components/TrackerListMobile';

interface Props {
  header?: JSX.Element;
  noFooter?: boolean;
  t(key: string): string;
  [data: string]: any;
}

function MainLayoutMobile(props: Props) {
  console.log('MainLayoutMobile -> props', props);
  const { ...rest } = props;
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
            {...rest}
          />
        )}
      </div>
      <SideBarInnerMobile open={open} handleOpenSideBar={handleOpenSideBar}>
        <ListTrakerMobile closeSidebar={handleOpenSideBar} />
      </SideBarInnerMobile>
      <div className={open ? classes.blurHeader : ''}>
        <Content
          className={`${classes.content} ${open ? classes.contentShift : ''}`}
          onClick={handleCloseSideBar}
        >
          {props.children}
        </Content>
        {!props.noFooter && <Footer t={rest.t} />}
      </div>
    </MainWrapper>
  );
}

export default MainLayoutMobile;
