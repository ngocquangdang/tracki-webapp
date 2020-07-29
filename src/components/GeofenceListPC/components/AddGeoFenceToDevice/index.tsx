import React, { useState } from 'react';
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

import { IGeofence } from '@Interfaces';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { Button } from '@Components/buttons';
import SelectTracker from '../SelectTrackerToLink';
import { useStyles } from './styles';

interface Props {
  isMobile?: boolean;
  show: boolean;
  isRequesting?: boolean;
  geofence: IGeofence;
  t(key: string, format?: object): string;
  onClose(): void;
  unLinkDevice(geofenceId: number, deviceId: number): void;
  [data: string]: any;
}

const DEVICES_LINKED = [
  { id: 1, device_name: 'xxx' },
  { id: 2, device_name: 'xxx' },
  { id: 3, device_name: 'xxx' },
  { id: 4, device_name: 'xxx' },
  { id: 5, device_name: 'xxx' },
  { id: 6, device_name: 'xxx' },
];

function AddDeviceToGeoFence(props: Props) {
  const classes = useStyles();
  const [showSelectTrackers, setShowSelectTrackers] = useState(false);
  const { onClose, isMobile, isRequesting, t, geofence } = props;

  const onLinkToDevice = () => {
    setShowSelectTrackers(true);
  };

  const onCloseSelectTracker = () => {
    setShowSelectTrackers(false);
  };

  const saveLinkToTrackers = () => {
    console.log('___saveLinkToTrackers');
    onCloseSelectTracker();
  };

  const unlinkDevice = (deviceId: number) => () => {
    console.log('___unlinkDevice', deviceId);
  };

  return (
    <SideBarOutside
      title={t('tracker:add_device_to', { text: geofence.name })}
      show={props.show}
      direction="right"
      handleClose={onClose}
      isMobile={isMobile || false}
    >
      <div className={classes.container}>
        <SelectTracker
          show={showSelectTrackers}
          onClose={onCloseSelectTracker}
          t={t}
          isMobile={isMobile || false}
          onSave={saveLinkToTrackers}
        />
        <div className={classes.linkBtnWrap}>
          <Button
            text={t('tracker:link_a_tracker')}
            onClick={onLinkToDevice}
            color="primary"
            fullWidth
            isLoading={isRequesting}
            variant="contained"
          />
        </div>
        <div className={classes.content}>
          <Typography className={classes.title}>
            {`${t('tracker:trackers_linked_to', {
              text: geofence.name,
            })} ${DEVICES_LINKED.length}`}
          </Typography>
          <div className={classes.listDevice}>
            {DEVICES_LINKED.map(d => (
              <ListItem button key={d.id} className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <img src={`/images/tracki-device.png`} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={d.device_name}
                  className={classes.text}
                />
                <ListItemSecondaryAction>
                  <Button
                    text={t('tracker:unlink')}
                    startIcon={<img src="./images/unlink.svg" alt="" />}
                    onClick={unlinkDevice(d.id)}
                    className={classes.unlinkBtn}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </div>
        </div>
      </div>
    </SideBarOutside>
  );
}

export default AddDeviceToGeoFence;
