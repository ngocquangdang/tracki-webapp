import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { FaHistory } from 'react-icons/fa';
import { MdBorderStyle, MdShare } from 'react-icons/md';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { IoMdSettings, IoMdVolumeHigh } from 'react-icons/io';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';
import { useInjectSaga } from '@Utils/injectSaga';
import saga from '@Containers/SingleTracker/store/sagas';
import {
  ToolBar,
  MenuItem,
  ItemText,
  Icon,
  ListItem,
  useStyles,
} from './styles';
import { ITracker } from '@Interfaces';

interface Props {
  t(key: string): string;
  tracker: ITracker;
  resetBeep(): void;
  isBeep: boolean;
  onClickSendBeep(data: object): void;
  onChangeView(view: string): void;
  showSnackbar(data: SNACK_PAYLOAD): void;
}

export default function BottomToolBar(props: Props) {
  useInjectSaga({ key: 'singleTracker', saga });
  const {
    // t,
    tracker,
    isBeep,
    resetBeep,
    onClickSendBeep,
    showSnackbar,
    onChangeView,
  } = props;
  const classes = useStyles();
  const [isFullButton, setIsFullButton] = useState(true);

  useEffect(() => {
    if (isBeep) {
      const timeOut = setTimeout(() => {
        showSnackbar({
          snackType: 'success',
          snackMessage: 'Send beep is success',
        });
        resetBeep();
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [isBeep, resetBeep, showSnackbar]);

  const toggleFullButton = () => setIsFullButton(!isFullButton);

  const onClickBeep = () => {
    onClickSendBeep({
      beepPeriod: 2,
      beepType: 1,
      devices: [tracker.device_id],
    });
  };

  const changeView = (view: string) => () => onChangeView(view);

  return (
    <ToolBar>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        classes={{ root: classes.btnRoot, label: classes.btnLabel }}
        onClick={toggleFullButton}
      >
        {isFullButton ? (
          <FiChevronsRight className={classes.menuRightIcon} />
        ) : (
          <FiChevronsLeft className={classes.menuRightIcon} />
        )}
      </Button>
      <ListItem className={clsx({ [classes.isActive]: !isFullButton })}>
        <Tooltip title="Settings" placement="right">
          <MenuItem
            className={clsx({ [classes.fullWidth]: !isFullButton })}
            onClick={changeView('settingsView')}
          >
            <Icon className={classes.menuItemIcon}>
              <IoMdSettings className={classes.menuIcon} />
            </Icon>
            <ItemText
              className={clsx(classes.menuText, {
                [classes.displayText]: !isFullButton,
              })}
            >
              Settings
            </ItemText>
          </MenuItem>
        </Tooltip>

        <MenuItem
          className={clsx({ [classes.fullWidth]: !isFullButton })}
          onClick={changeView('historyView')}
        >
          <Icon className={classes.menuItemIcon}>
            <FaHistory className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isFullButton,
            })}
          >
            History
          </ItemText>
        </MenuItem>
        <MenuItem
          className={clsx({ [classes.fullWidth]: !isFullButton })}
          onClick={onClickBeep}
        >
          <Icon className={classes.menuItemIcon}>
            {isBeep ? (
              <CircularProgress className={classes.iconLoading} />
            ) : (
              <IoMdVolumeHigh className={classes.menuIcon} />
            )}
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isFullButton,
            })}
          >
            Beep
          </ItemText>
        </MenuItem>
        <MenuItem
          className={clsx({ [classes.fullWidth]: !isFullButton })}
          onClick={changeView('shareLocationView')}
        >
          <Icon className={classes.menuItemIcon}>
            <MdShare className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isFullButton,
            })}
          >
            Share
          </ItemText>
        </MenuItem>
        <MenuItem
          className={clsx({ [classes.fixedWidthChild]: !isFullButton })}
          onClick={changeView('geofenceListView')}
        >
          <Icon className={classes.menuItemIcon}>
            <MdBorderStyle className={classes.menuIcon} />
          </Icon>
          <ItemText
            className={clsx(classes.menuText, {
              [classes.displayText]: !isFullButton,
            })}
          >
            Geo Fence
          </ItemText>
        </MenuItem>
      </ListItem>
    </ToolBar>
  );
}
