import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import GeoFence from '@Components/GeoFenceCard';
import { SkeletonTracker } from '@Components/Skeletons';
import AddGeofencePanel from '@Containers/Trackers/views/AddGeoFence';

interface Props {
  [data: string]: any;
}

export default function ListGeoFence(props: Props) {
  const {
    geofenceIds,
    geofences,
    selectedGeofenceId,
    selectGeofenceIdAction,
    updateGeofenceAction,
  } = props;
  const classes = useStyles();
  const [showAddPanel, setShowPanel] = useState(true);
  const onClosePanel = () => setShowPanel(false);
  const onOpenPanel = () => setShowPanel(true);

  return (
    <Container>
      <Content>
        <ListItem>
          {geofenceIds
            ? geofenceIds.map(id => (
                // eslint-disable-next-line react/jsx-indent
                <GeoFence
                  key={id}
                  geofence={geofences[id]}
                  selectedGeofenceId={selectedGeofenceId}
                  selectGeofence={selectGeofenceIdAction}
                  updateGeofence={updateGeofenceAction}
                />
              ))
            : [1, 2].map(i => <SkeletonTracker key={i} />)}
        </ListItem>
      </Content>
      <Footer>
        <Button
          classes={classes.btn}
          text="Add a Geo-Fence"
          color="primary"
          type="submit"
          startIcon={<FiPlus />}
          onClick={onOpenPanel}
        />
      </Footer>
      <AddGeofencePanel show={showAddPanel} handleClose={onClosePanel} />
    </Container>
  );
}
