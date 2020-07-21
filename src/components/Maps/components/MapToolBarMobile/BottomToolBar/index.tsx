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

interface Props {
  t: Function;
}

export default function BottomToolBar(props: Props) {
  // const { t } = props;
  const classes = useStyles();
  const [isActive, setIsActive] = useState(true);

  const handleClick = () => {
    setIsActive(!isActive);
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
          <MenuItem className={isActive ? '' : classes.fullWidth}>
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

        <MenuItem className={isActive ? '' : classes.fullWidth}>
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
        <MenuItem className={isActive ? '' : classes.fullWidth}>
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
    </ToolBar>
  );
}
