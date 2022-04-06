import React, { useState } from 'react';
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectTrackers,
  makeSelectTrackerIds,
} from '@Containers/Trackers/store/selectors';
import {
  linkTrackersRequestAction,
  unlinkTrackersRequestAction,
} from '@Containers/Trackers/store/actions';
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
  onUnlinkClick(geofenceId: number, deviceId: number): void;
  [data: string]: any;
}

function AddDeviceToGeoFence(props: Props) {
  const classes = useStyles();
  const [showSelectTrackers, setShowSelectTrackers] = useState(false);
  const {
    onClose,
    isMobile,
    isRequesting,
    t,
    trackers,
    geofence,
    unlinkTrackers,
    linkTrackers,
  } = props;

  const onLinkToDevice = () => {
    setShowSelectTrackers(true);
  };

  const onCloseSelectTracker = () => {
    setShowSelectTrackers(false);
  };

  const saveLinkToTrackers = (trackerIds: number[]) => {
    linkTrackers(geofence.id, trackerIds);
    onCloseSelectTracker();
  };

  const onUnlinkClick = (deviceId: number) => () => {
    unlinkTrackers(geofence.id, [deviceId]);
  };

  const trackersLinked = (geofence.trackers || [])
    .map(id => trackers[id])
    .filter(i => !!i);

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
          trackers={trackers}
          trackersLinked={geofence.trackers || []}
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
            })} - ${trackersLinked.length}`}
          </Typography>
          <div className={classes.listDevice}>
            {trackersLinked.map((d: any) => (
              <ListItem button key={d.device_id} className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <img
                      src={d.icon_url || '/images/tracki-device.png'}
                      alt=""
                    />
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
                    onClick={onUnlinkClick(d.device_id)}
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

const mapStateToProps = createStructuredSelector({
  trackers: makeSelectTrackers(),
  trackerIds: makeSelectTrackerIds(),
});

const mapDispatchToProps = dispatch => ({
  linkTrackers: (geofenceId: number, trackerIds: number[]) =>
    dispatch(linkTrackersRequestAction(geofenceId, trackerIds)),
  unlinkTrackers: (geofenceId: number, trackerIds: number[]) =>
    dispatch(unlinkTrackersRequestAction(geofenceId, trackerIds)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(AddDeviceToGeoFence);
