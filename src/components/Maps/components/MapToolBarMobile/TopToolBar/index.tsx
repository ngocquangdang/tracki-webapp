import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Menu } from '@material-ui/core';
import { FaStreetView } from 'react-icons/fa';
import { MdBorderStyle, MdApps, MdClear } from 'react-icons/md';
import { MenuProps } from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectShowGeofences,
  makeSelectShowTrackersName,
} from '@Containers/App/store/selectors';
import {
  toggleGeofenceAction,
  toggleTrackerNameAction,
} from '@Containers/App/store/actions';

import { ToolBar, MenuItem, ItemText, Icon, Text, useStyles } from './styles';

const StyledMenu = withStyles({
  paper: {
    background: 'none',
    left: '25px !important',
    right: 5,
    '& ul': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
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

interface Props {
  mapTile: string;
  showGeofences: boolean;
  showTrackerName: boolean;
  t(key: string): string;
  toggleGeofences(): void;
  toggleTrackerName(): void;
  [data: string]: any;
}

function MapToolBarMobile(props: Props) {
  const {
    showGeofences,
    showTrackerName,
    t,
    toggleTrackerName,
    toggleGeofences,
  } = props;
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
        <MenuItem className={anchorEl ? '' : classes.fullWidth}>
          <ItemText
            className={`${classes.menuText} ${
              anchorEl ? '' : classes.displayText
            }`}
          >
            {t('common:view_on_gg_map')}
          </ItemText>
          <Icon className={classes.menuItemIcon}>
            <FaStreetView className={classes.menuIcon} />
          </Icon>
        </MenuItem>
        <MenuItem
          onClick={toggleTrackerName}
          className={anchorEl ? '' : classes.fullWidth}
        >
          <ItemText
            className={`${classes.menuText} ${
              anchorEl ? '' : classes.displayText
            }`}
          >
            {showTrackerName
              ? t('common:hide_tracker_name')
              : t('common:show_tracker_name')}
          </ItemText>{' '}
          <Icon className={classes.menuItemIcon}>
            <Text>A</Text>
          </Icon>
        </MenuItem>
        <MenuItem
          onClick={toggleGeofences}
          className={anchorEl ? '' : classes.fullWidth}
        >
          <ItemText
            className={`${classes.menuText} ${
              anchorEl ? '' : classes.displayText
            }`}
          >
            {showGeofences
              ? t('common:hide_geofences')
              : t('common:show_geofences')}
          </ItemText>{' '}
          <Icon className={classes.menuItemIcon}>
            <MdBorderStyle className={classes.menuIcon} />
          </Icon>
        </MenuItem>
      </StyledMenu>
    </ToolBar>
  );
}

const mapStateToProps = createStructuredSelector({
  showGeofences: makeSelectShowGeofences(),
  showTrackerName: makeSelectShowTrackersName(),
});

const mapDispatchToProps = dispatch => ({
  toggleGeofences: () => dispatch(toggleGeofenceAction()),
  toggleTrackerName: () => dispatch(toggleTrackerNameAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(MapToolBarMobile);
