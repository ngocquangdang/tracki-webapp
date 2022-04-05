import React from 'react';
import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles, ImageWrapper, Image, DefaultImage } from './styles';

interface Props {
  [data: string]: any;
  open: boolean;
  handleOpenSideBar(): void;
}
export default function HeaderMobile(props: Props) {
  const classes = useStyles();
  const { open, handleOpenSideBar, ...rest } = props;

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
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={`${classes.textHeader} ${
                rest.children?.props?.selectedTrackerId && classes.fontSize
              }`}
              noWrap
            >
              {rest.children?.props.selectedTrackerId ? (
                <>
                  <ImageWrapper>
                    {rest.children?.props.trackers[
                      rest.children.props.selectedTrackerId
                    ]?.icon_url ? (
                      <Image
                        background={
                          rest.children?.props.trackers[
                            rest.children.props.selectedTrackerId
                          ]?.icon_url
                        }
                      />
                    ) : (
                      <DefaultImage
                        src={'/static/images/image-device.png'}
                        alt=""
                      />
                    )}
                  </ImageWrapper>
                  {
                    rest.children.props.trackers[
                      rest.children.props.selectedTrackerId
                    ]?.device_name
                  }
                </>
              ) : (
                'All Trackers'
              )}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
