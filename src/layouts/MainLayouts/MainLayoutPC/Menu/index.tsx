import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Menu, ListItemIcon, ListItemText } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import {
  Menu as MenuIcon,
  Clear as ClearIcon,
  Call as CallIcon,
  Block as BlockIcon,
  Assignment as AssignmentIcon,
  PlayArrow as PlayIcon,
  PowerSettingsNew as LogoutIcon,
} from '@material-ui/icons';

import { useStyles, StyledMenuItem } from './styles';
import { logoutRequestAction } from '@Containers/App/store/actions';
import { connect } from 'react-redux';

const StyledMenu = withStyles({
  paper: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    '& ul': {
      padding: 0,
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

function CustomizedMenus(props: any) {
  const { logoutRequestAction } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logoutRequestAction();
  };
  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        classes={{ root: classes.btnRoot, label: classes.btnLabel }}
        onClick={handleClick}
      >
        {anchorEl ? <ClearIcon /> : <MenuIcon />} Menu
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
          <ListItemText
            primary="Video Tutorials"
            className={classes.menuText}
          />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon className={classes.menuItemIcon}>
            <LogoutIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Logout" className={classes.menuText} />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
const mapDispatchToProps = (dispatch: any) => ({
  logoutRequestAction: () => dispatch(logoutRequestAction()),
});
export default connect(null, mapDispatchToProps)(CustomizedMenus);
