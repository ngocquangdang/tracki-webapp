import React, { useState } from 'react';
import clsx from 'clsx';

import { SideBarInnerMobile } from '@Components/sidebars';
import ListTrakerMobile from '@Components/TrackerListMobile';
import MainWrapper from './MainWrapper';
import HeaderMobile from './Header';
import Footer from './Footer';
import { useStyles } from './styles';
import SettingTracker from '@Containers/SingleTracker/components/SettingTracker';

interface Props {
  header?: JSX.Element;
  hasFooter?: boolean;
  t(key: string): string;
  [data: string]: any;
  trackers: object;
}

function MainLayoutMobile(props: Props) {
  const { header, hasFooter = true, trackers, ...rest } = props;
  const [isSetting, showSetting] = useState(false);
  const [selectedId, setSelectId] = useState<number | null>(null);
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleOpenSideBar = () => setOpenSidebar(!openSidebar);
  const handleCloseSideBar = () => setOpenSidebar(false);
  const onClickSetting = (id: number) => {
    setOpenSidebar(false);
    showSetting(true);
    setSelectId(id);
  };
  const handleCloseSetting = () => {
    showSetting(false);
    setOpenSidebar(true);
  };
  return (
    <MainWrapper className={classes.root}>
      <div
        className={clsx({
          [classes.blurHeader]: openSidebar,
        })}
      >
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
        <ListTrakerMobile
          closeSidebar={handleOpenSideBar}
          onClickSetting={onClickSetting}
        />
      </SideBarInnerMobile>
      {isSetting && trackers && selectedId !== null && (
        <SettingTracker
          t={rest.t}
          show={isSetting}
          tracker={trackers[selectedId]}
          handleClose={handleCloseSetting}
          isMobile={true}
        />
      )}
      <div
        className={clsx(classes.container, classes.content, {
          [classes.contentShift]: openSidebar,
          [classes.blurHeader]: openSidebar,
        })}
        onClick={handleCloseSideBar}
      >
        {props.children}
        {hasFooter && <Footer t={rest.t} />}
      </div>
    </MainWrapper>
  );
}

export default MainLayoutMobile;
