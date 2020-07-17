import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Menu, ListItemIcon, ListItemText } from '@material-ui/core';
import { FaStreetView } from 'react-icons/fa';
import { MdBorderStyle, MdApps, MdClear } from 'react-icons/md';

import { MenuProps } from '@material-ui/core/Menu';

import { ToolBar, Text, useStyles, StyledMenuItem } from './styles';

const StyledMenu = withStyles({
  paper: {
    background: 'none',
    '& ul': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      '& li': {
        height: 33,
      },
    },
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function MapToolBarMobile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          {anchorEl ? (
            <MdClear className={classes.menuRightIcon} />
          ) : (
            <MdApps className={classes.menuRightIcon} />
          )}
        </>
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText
            primary="View on Google Maps"
            className={classes.menuText}
          />
          <ListItemIcon className={classes.menuItemIcon}>
            <FaStreetView className={classes.menuIcon} />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText
            primary="Show Device Name"
            className={classes.menuText}
          />
          <ListItemIcon className={classes.menuItemIcon}>
            <Text>A</Text>
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Show Fences" className={classes.menuText} />
          <ListItemIcon className={classes.menuItemIcon}>
            <MdBorderStyle className={classes.menuIcon} />
          </ListItemIcon>
        </StyledMenuItem>
      </StyledMenu>
    </ToolBar>
  );
}
