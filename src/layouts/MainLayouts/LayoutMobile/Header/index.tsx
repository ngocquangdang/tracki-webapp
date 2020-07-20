import React from 'react';
import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';

export default function HeaderMobile(props: any) {
  const classes = useStyles();
  const { open, handleOpenSideBar } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="transparent"
        className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}
      >
        <Toolbar className={classes.wrapper}>
          <div className={classes.menuMobile}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleOpenSideBar}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.textHeader}
              noWrap
            >
              All Tracker
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
