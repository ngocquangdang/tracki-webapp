import React, { useState } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { FaHistory } from 'react-icons/fa';
import { MdBorderStyle, MdShare } from 'react-icons/md';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { IoMdSettings, IoMdVolumeHigh } from 'react-icons/io';
import clsx from 'clsx';
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
      <ListItem className={clsx({ [classes.isActive]: !isActive })}>
        <Tooltip title="Settings" placement="right">
          <MenuItem
            className={clsx({ [classes.fullWidth]: !isActive })}
            onClick={onClickSetting}
          >
            <Icon className={classes.menuItemIcon}>
              <IoMdSettings className={classes.menuIcon} />
            </Icon>
            <ItemText
              className={clsx(classes.menuText, {
                [classes.displayText]: !isActive,
              })}
            >
              Settings
            </ItemText>
          </MenuItem>
        </Tooltip>

        <MenuItem
          className={clsx({ [classes.fullWidth]: !isActive })}
          onClick={onClickHistory}
        >
          <Icon className={classes.menuItemIcon}>
            <FaHistory className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isActive,
            })}
          >
            History
          </ItemText>
        </MenuItem>
        <MenuItem className={clsx({ [classes.fullWidth]: !isActive })}>
          <Icon className={classes.menuItemIcon}>
            <IoMdVolumeHigh className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isActive,
            })}
          >
            Beep
          </ItemText>
        </MenuItem>
        <MenuItem className={clsx({ [classes.fullWidth]: !isActive })}>
          <Icon className={classes.menuItemIcon}>
            <MdShare className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isActive,
            })}
          >
            Share
          </ItemText>
        </MenuItem>
        <MenuItem className={clsx({ [classes.fixedWidthChild]: !isActive })}>
          <Icon className={classes.menuItemIcon}>
            <MdBorderStyle className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isActive,
            })}
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
    </ToolBar>
  );
}
