import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Menu, ListItemIcon, ListItemText } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import Router from 'next/router';
import { connect } from 'react-redux';
import {
  Menu as MenuIcon,
  Clear as ClearIcon,
  Call as CallIcon,
  Lock as LockIcon,
  Assignment as AssignmentIcon,
  PlayArrow as PlayIcon,
  PowerSettingsNew as LogoutIcon,
} from '@material-ui/icons';
import { Link } from '@material-ui/core';

import { logoutRequestAction } from '@Containers/App/store/actions';
import { useStyles, StyledMenuItem } from './styles';
import { signOut } from 'next-auth/react';

const StyledMenu = withStyles({
  paper: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    '& ul': {
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
)) as any;

function CustomizedMenus(props: any) {
  const { logoutRequestAction } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    signOut();
    logoutRequestAction();
  };
  const gotoLink = (link: string) => () => Router.push(link);
  const gotoSupportSite = () =>
    window.location.assign('https://tracki.com/pages/contact-us');

  return (
    <div className={classes.flexBox}>
      {/* <div
        className={`${classes.myWallet} ${classes.flexBox}`}
        onClick={gotoLink('/wallet')}
      >
        <div className={`${classes.coin} ${classes.flexBox}`}>
          <img src="/images/coin-points.svg" alt="" className={classes.icon} />
          <p className={classes.cointNumber}>{5000}</p>
        </div>
        <div className={`${classes.wallet} ${classes.flexBox}`}>
          <img src="/images/wallet.png" alt="" className={classes.icon} />
          <p>$24.55</p>
        </div>
      </div> */}

      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        classes={{ root: classes.btnRoot, label: classes.btnLabel }}
        onClick={openMenu}
      >
        <>
          {anchorEl ? (
            <ClearIcon className={classes.menuRightIcon} />
          ) : (
            <MenuIcon className={classes.menuRightIcon} />
          )}
          <span className={classes.menuRightLabel}>Menu</span>
        </>
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <StyledMenuItem onClick={gotoSupportSite}>
          <ListItemIcon className={classes.menuItemIcon}>
            <CallIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Contact Us" className={classes.menuText} />
        </StyledMenuItem>
        <StyledMenuItem onClick={gotoLink('/privacy')}>
          <ListItemIcon className={classes.menuItemIcon}>
            <LockIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" className={classes.menuText} />
        </StyledMenuItem>
        <StyledMenuItem onClick={gotoLink('/terms')}>
          <ListItemIcon className={classes.menuItemIcon}>
            <AssignmentIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="User Agreement" className={classes.menuText} />
        </StyledMenuItem>
        <Link
          href="https://tracki.com/pages/setup"
          className={classes.linkVideo}
        >
          <StyledMenuItem>
            <ListItemIcon className={classes.menuItemIcon}>
              <PlayIcon className={classes.menuIcon} />
            </ListItemIcon>
            <ListItemText
              primary="Video Tutorials"
              className={classes.menuText}
            />
          </StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon className={classes.menuItemIcon}>
            <LogoutIcon className={classes.menuIcon} />
          </ListItemIcon>
          <ListItemText primary="Logout" className={classes.menuText} />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
const mapDispatchToProps = (dispatch: any) => ({
  logoutRequestAction: () => dispatch(logoutRequestAction()),
});
export default connect(null, mapDispatchToProps)(CustomizedMenus);
