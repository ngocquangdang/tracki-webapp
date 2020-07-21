import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import GeoFence from '@Components/GeoFenceCard';
import { SkeletonTracker } from '@Components/Skeletons';

interface Props {
  geofenceIds: Array<number | string>;
  geofences: object;
  selectGeofenceIdAction(id: number | string): void;
  updateGeofenceAction(id: number, data: object): void;
}

export default function ListGeoFence(props: Props) {
  const {
    geofenceIds,
    geofences,
    selectGeofenceIdAction,
    updateGeofenceAction,
  } = props;
  const classes = useStyles();

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
        />
      </Footer>
    </Container>
  );
}