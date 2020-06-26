import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Clear as ClearIcon,
  Call as CallIcon,
  Block as BlockIcon,
  Assignment as AssignmentIcon,
  PlayArrow as PlayIcon,
  PowerSettingsNew as LogoutIcon
} from '@material-ui/icons';

import { useStyles, StyledMenuItem } from './styles'

const StyledMenu = withStyles({
  paper: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    '& ul': {
      padding: 0
    },
  },
})((props) => (
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

export default function CustomizedMenus() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        classes={{ root: classes.btnRoot, label: classes.btnLabel }}
        onClick={handleClick}
      >
        {Boolean(anchorEl) ? <ClearIcon /> : <MenuIcon />} Menu
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon className={classes.menuItemIcon}>
            <CallIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Contact Us" className={classes.menuText} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon className={classes.menuItemIcon}>
            <BlockIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" className={classes.menuText} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon className={classes.menuItemIcon}>
            <AssignmentIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="User Agreement" className={classes.menuText} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon className={classes.menuItemIcon}>
            <PlayIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Video Tutorials" className={classes.menuText} />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon className={classes.menuItemIcon}>
            <LogoutIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Logout" className={classes.menuText} />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
