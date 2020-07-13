import React from 'react';
import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';

export default function HeaderMobile(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.wrapper}>
          <div className={classes.menuMobile}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.textHeader}
            >
              {props.children}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
