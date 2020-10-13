import React from 'react';
import {
  ListItemAvatar,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Slide,
  ListItemSecondaryAction,
} from '@material-ui/core';
import clsx from 'clsx';
import { Edit, Delete, Add } from '@material-ui/icons';
import { IoIosLink, IoMdClose } from 'react-icons/io';

import ConfirmPanel from '@Components/GeofenceListPC/components/DeleteConfirm';
import { IGeofence } from '@Interfaces';
import { Button } from '@Components/buttons';
import { SkeletonLinkTracker } from '@Components/Skeletons';
import { useStyles, Image, ListItemStyle } from './styles';

interface Props {
  isMobile: boolean;
  geofence: IGeofence;
  isLinked: boolean;
  addContact(id: number): void;
  unLinkGeofence?(id: number): void;
  linkGeofence?(id: number): void;
  editGeofence(id: number): void;
  onAddGeofenceToDevices?(id: number): void;
  removeGeofence(id: number): void;
  [data: string]: any;
}

export default function LinkGeofenceCard(props: Props) {
  const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(
    null
  );
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showMoreAction, setShowMoreAction] = React.useState(false);
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
    onAddGeofenceToDevices,
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

  const onClickAddDevice = () => {
    onAddGeofenceToDevices && onAddGeofenceToDevices(geofence.id);
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

  const editClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    isMobile ? setShowMoreAction(true) : openMenu(e);
  };

  const closeMoreAction = () => setShowMoreAction(false);

  const onCloseConfirm = () => setShowConfirm(false);

  if (!geofence) {
    return <SkeletonLinkTracker />;
  }

  return (
    <React.Fragment>
      <ListItemStyle
        button
        key={geofence.id}
        className={clsx({ [classes.paper]: !showMoreAction })}
      >
        <ListItemAvatar className={classes.listItemAvt}>
          <Avatar className={clsx(classes.avatar)}>
            <Image src={`/images/geo_${geofence.type}.svg`} alt="" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={geofence.name} className={clsx(classes.text)} />
        {showMoreAction ? (
          <Slide
            in={showMoreAction}
            mountOnEnter
            unmountOnExit
            direction="left"
          >
            <div className={clsx(classes.moreContainer)}>
              <div className={classes.moreLeft}>
                <Button
                  text={t('tracker:edit')}
                  startIcon={<IoMdClose />}
                  onClick={closeMoreAction}
                  className={classes.actionBtn}
                />
              </div>
              <div
                className={clsx(classes.moreRight, {
                  [classes.moreRight2]: !isLinked,
                })}
              >
                {!isLinked && (
                  <Button
                    text={t('tracker:add_device')}
                    startIcon={<Add />}
                    onClick={onClickAddDevice}
                    className={classes.moreActionBtn}
                  />
                )}
                <Button
                  text={t('tracker:edit_geofence')}
                  startIcon={<Edit />}
                  onClick={onClickEdit}
                  className={classes.moreActionBtn}
                />
                <Button
                  text={t('tracker:delete_fence')}
                  startIcon={<Delete />}
                  onClick={deleteGeofence}
                  className={classes.moreActionBtn}
                />
              </div>
            </div>
          </Slide>
        ) : (
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
                isLinked ? (
                  <img src="/images/unlink.svg" alt="" />
                ) : (
                  <IoIosLink />
                )
              }
              onClick={isLinked ? onUnlinkClick : onLinkClick}
              className={classes.actionBtn}
            />
            <Button
              text={t('tracker:edit')}
              startIcon={<img src="/images/edit.svg" alt="" />}
              onClick={editClick}
              className={classes.actionBtn}
            />
          </ListItemSecondaryAction>
        )}
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
