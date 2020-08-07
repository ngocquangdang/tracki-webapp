import React from 'react';
import {
  ListItemAvatar,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import clsx from 'clsx';
import { IoIosLink } from 'react-icons/io';

import ConfirmPanel from '@Components/GeofenceListPC/components/DeleteConfirm';
import { IGeofence } from '@Interfaces';
import { Button } from '@Components/buttons';
import { useStyles, Image, ListItemStyle } from './styles';

interface Props {
  isMobile: boolean;
  geofence: IGeofence;
  isLinked: boolean;
  addContact(id: number): void;
  unLinkGeofence?(id: number): void;
  linkGeofence?(id: number): void;
  editGeofence(id: number): void;
  removeGeofence(id: number): void;
  [data: string]: any;
}

export default function LinkGeofenceCard(props: Props) {
  const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(
    null
  );
  const [showConfirm, setShowConfirm] = React.useState(false);
  const {
    isMobile,
    geofence,
    t,
    isLinked,
    removeGeofence,
    unLinkGeofence,
    addContact,
    editGeofence,
    linkGeofence,
  } = props;
  const classes = useStyles();

  const onUnlinkClick = () => {
    unLinkGeofence && unLinkGeofence(geofence.id);
  };

  const onLinkClick = () => {
    linkGeofence && linkGeofence(geofence.id);
  };

  const onAddContact = () => {
    addContact(geofence.id);
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenuEl(null);
  };

  const gotoGeofence = () => {
    window.geosDrawn[geofence.id] &&
      window.mapEvents.setFitBounds(window.geosDrawn[geofence.id].getBounds());
  };

  const onClickEdit = () => {
    gotoGeofence();
    editGeofence(geofence.id);
    closeMenu();
  };

  const deleteGeofence = () => {
    setShowConfirm(true);
    closeMenu();
  };

  const confirmRemoveGeofence = () => {
    removeGeofence(geofence.id);
    setShowConfirm(false);
  };

  const onCloseConfirm = () => setShowConfirm(false);

  return (
    <React.Fragment>
      <ListItemStyle button key={geofence.id} className={clsx(classes.paper)}>
        <ListItemAvatar>
          <Avatar className={clsx(classes.avatar)}>
            <Image src={`/images/geo_${geofence.type}.svg`} alt="" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={geofence.name} className={clsx(classes.text)} />
        <ListItemSecondaryAction className={classes.actions}>
          {isLinked && (
            <Button
              text={t('tracker:contact')}
              startIcon={<img src="/images/add_contact.svg" alt="" />}
              onClick={onAddContact}
              className={classes.actionBtn}
            />
          )}
          <Button
            text={isLinked ? t('tracker:unlink') : t('tracker:link')}
            startIcon={
              isLinked ? <img src="/images/unlink.svg" alt="" /> : <IoIosLink />
            }
            onClick={isLinked ? onUnlinkClick : onLinkClick}
            className={classes.actionBtn}
          />
          <Button
            text={t('tracker:edit')}
            startIcon={<img src="/images/edit.svg" alt="" />}
            onClick={openMenu}
            className={classes.actionBtn}
          />
        </ListItemSecondaryAction>
      </ListItemStyle>
      <ConfirmPanel
        t={t}
        isMobile={isMobile}
        show={showConfirm}
        onClose={onCloseConfirm}
        removeGeofence={confirmRemoveGeofence}
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
        <MenuItem className={classes.menuItem} onClick={deleteGeofence}>
          {t('tracker:delete_this_fence')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
