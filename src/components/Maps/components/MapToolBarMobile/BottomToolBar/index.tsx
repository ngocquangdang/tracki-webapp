import React, { useState } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { FaHistory } from 'react-icons/fa';
import { MdBorderStyle, MdShare } from 'react-icons/md';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { IoMdSettings, IoMdVolumeHigh } from 'react-icons/io';
import {
  ToolBar,
  MenuItem,
  ItemText,
  Icon,
  ListItem,
  useStyles,
} from './styles';
import SettingTracker from '@Containers/SingleTracker/components/SettingTracker';
import { ITracker } from '@Interfaces';
import HistoryTracker from '@Containers/SingleTracker/components/HistoryTracker';
import ShareLocation from '@Containers/SingleTracker/components/ShareLocation';

interface Props {
  t(key: string): string;
  tracker: ITracker;
}

export default function BottomToolBar(props: Props) {
  const { t, tracker } = props;
  const classes = useStyles();
  const [isActive, setIsActive] = useState(true);
  const [isSetting, showSetting] = useState(false);
  const [isHistory, showHistory] = useState(false);
  const [isShareLocation, setViewShareLocation] = useState(false);
  const handleClickViewHistory = () => {
    showHistory(false);
  };
  const handleCloseHistory = () => showHistory(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const onClickSetting = () => {
    showSetting(true);
  };
  const handleCloseSetting = () => {
    showSetting(false);
  };
  const onClickHistory = () => {
    showHistory(true);
  };

  const handleCloseShareLocation = () => {
    setViewShareLocation(false);
  };
  const onClickShareLocation = () => {
    setViewShareLocation(true);
  };

  return (
    <ToolBar>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        classes={{ root: classes.btnRoot, label: classes.btnLabel }}
        onClick={handleClick}
      >
        <>
          {isActive ? (
            <FiChevronsRight className={classes.menuRightIcon} />
          ) : (
            <FiChevronsLeft className={classes.menuRightIcon} />
          )}
        </>
      </Button>
      <ListItem className={isActive ? '' : classes.isActive}>
        <Tooltip title="Delete">
          <MenuItem
            className={isActive ? '' : classes.fullWidth}
            onClick={onClickSetting}
          >
            <Icon className={classes.menuItemIcon}>
              <IoMdSettings className={classes.menuIcon} />
            </Icon>
            <ItemText
              className={`${classes.menuText} ${
                isActive ? '' : classes.displayText
              }`}
            >
              Settings
            </ItemText>
          </MenuItem>
        </Tooltip>

        <MenuItem
          className={isActive ? '' : classes.fullWidth}
          onClick={onClickHistory}
        >
          <Icon className={classes.menuItemIcon}>
            <FaHistory className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={`${classes.menuText} ${
              isActive ? '' : classes.displayText
            }`}
          >
            History
          </ItemText>
        </MenuItem>
        <MenuItem className={isActive ? '' : classes.fullWidth}>
          <Icon className={classes.menuItemIcon}>
            <IoMdVolumeHigh className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={`${classes.menuText} ${
              isActive ? '' : classes.displayText
            }`}
          >
            Beep
          </ItemText>
        </MenuItem>
        <MenuItem
          className={isActive ? '' : classes.fullWidth}
          onClick={onClickShareLocation}
        >
          <Icon className={classes.menuItemIcon}>
            <MdShare className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={`${classes.menuText} ${
              isActive ? '' : classes.displayText
            }`}
          >
            Share
          </ItemText>
        </MenuItem>
        <MenuItem className={isActive ? '' : classes.fixedWidthChild}>
          <Icon className={classes.menuItemIcon}>
            <MdBorderStyle className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={`${classes.menuText} ${
              isActive ? '' : classes.displayText
            }`}
          >
            Geo Fence
          </ItemText>
        </MenuItem>
      </ListItem>
      <SettingTracker
        t={t}
        show={isSetting}
        tracker={tracker}
        handleClose={handleCloseSetting}
        isMobile={true}
      />
      <HistoryTracker
        handleClose={handleCloseHistory}
        t={t}
        show={isHistory}
        isMobile={true}
        onClickViewHistory={handleClickViewHistory}
      />
      <ShareLocation
        handleClose={handleCloseShareLocation}
        t={t}
        show={isShareLocation}
        isMobile={true}
      />
    </ToolBar>
  );
}
