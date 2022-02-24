import React from 'react';
import {
  // Switch,
  IconButton,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

import ConfirmPanel from '../DeleteConfirm';
import AddGeoFenceToDevice from '../AddGeoFenceToDevice';
import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import { useStyles, Image, Status, ListItemStyle } from './styles';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  geofence: any;
  isMobile?: boolean;
  selectedGeofenceId?: number | string | null;
  selectGeofence(id: number | string): void;
  editGeofence(id: number | string): void;
  removeGeofence(id: number | string): void;
  updateGeofence(id: number, data: object): void;
  [data: string]: any;
  updateSwitch(): void;
}

export default function GeofenceCard(props: Props) {
  const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(
    null
  );
  const [showConfirm, setShowConfirm] = React.useState(false);
  // const [enabled, setEnabled] = React.useState(false);
  const [showAddDevicePanel, setShowAddDevicePanel] = React.useState(false);
  const {
    geofence,
    t,
    isMobile,
    selectGeofence,
    // updateGeofence,
    selectedGeofenceId,
    editGeofence,
    removeGeofence,
    // updateSwitch,
  } = props;
  const classes = useStyles();
  const isActive = selectedGeofenceId === geofence.id;
  const isDisabled = geofence.status === 'inactive';

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  // useEffect(() => {
  //   setEnabled(geofence.enabled);
  // }, [geofence]);

  const closeMenu = () => {
    setAnchorMenuEl(null);
  };

  const gotoGeofence = () => {
    const options = window.mapType === 'leaflet' ? LEAFLET_PADDING_OPTIONS : {};
    setTimeout(() => {
      window.geosDrawn[geofence.id] &&
        window.mapEvents.setFitBounds(
          window.geosDrawn[geofence.id].getBounds(),
          window.mapFullWidth ? {} : options
        );
    }, 300);
  };

  const onSelectGeofence = () => {
    if (!isDisabled) {
      gotoGeofence();
      selectGeofence(geofence.id);
    }
  };

  // const toggleGeofence = () => {
  //   updateSwitch();
  //   updateGeofence(geofence.id, { enabled: !geofence.enabled });
  //   setEnabled(!enabled);
  // };

  const onClickEdit = () => {
    firebaseLogEventRequest('geofence_page', 'edit_geofence');
    gotoGeofence();
    editGeofence(geofence.id);
    closeMenu();
  };

  const addGeofenceToDevice = () => {
    setShowAddDevicePanel(true);
    closeMenu();
  };

  const deleteGeofence = () => {
    setShowConfirm(true);
    closeMenu();
  };

  const onCloseConfirm = () => setShowConfirm(false);
  const onCloseAddDevicePanel = () => setShowAddDevicePanel(false);

  const confirmRemoveGeofence = () => {
    removeGeofence(geofence.id);
    setShowConfirm(false);
  };

  return (
    <>
      <ListItemStyle
        button
        key={geofence.id}
        onClick={onSelectGeofence}
        className={clsx(classes.paper, { [classes.active]: isActive })}
      >
        <ListItemAvatar>
          <Avatar
            className={clsx(classes.avatar, {
              [classes.avtActive]: isActive,
            })}
          >
            <Image
              src={`/images/geo_${geofence.type}${
                isActive ? '_active' : ''
              }.svg`}
              alt=""
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={geofence.name}
          className={clsx(classes.text, {
            [classes.textActive]: isActive,
          })}
        />
        <ListItemSecondaryAction className={classes.actions}>
          {isDisabled && <Status>{t('tracker:deactive')}</Status>}
          {/* <Switch
            checked={!!enabled}
            onChange={toggleGeofence}
            color="primary"
            disabled={isDisabled}
          /> */}
          <IconButton onClick={openMenu} className={classes.iconBtn}>
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemStyle>
      <ConfirmPanel
        t={t}
        isMobile={isMobile}
        show={showConfirm}
        onClose={onCloseConfirm}
        removeGeofence={confirmRemoveGeofence}
      />
      <AddGeoFenceToDevice
        t={t}
        isMobile={isMobile}
        show={showAddDevicePanel}
        onClose={onCloseAddDevicePanel}
        geofence={geofence}
      />
      <Menu
        anchorEl={anchorMenuEl}
        keepMounted
        open={Boolean(anchorMenuEl)}
        onClose={closeMenu}
        MenuListProps={{ className: classes.menuList }}
        className={classes.menuRoot}
      >
        <MenuItem className={classes.menuItem} onClick={onClickEdit}>
          {t('tracker:edit_geofence')}
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={addGeofenceToDevice}>
          {t('tracker:add_device')}
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={deleteGeofence}>
          {t('tracker:delete_this_fence')}
        </MenuItem>
      </Menu>
    </>
  );
}
