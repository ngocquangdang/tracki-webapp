import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import GeoFence from '@Components/GeoFenceCard';

const listGeoFence = [
  {
    name: 'Steve Rodgers truck',
    active: true,
    id: 1,
  },
  {
    name: 'Steve Rodgers truckter',
    active: false,
    id: 2,
  },
];

export default function ListGeoFence(props: any) {
  const { geo_fence, isLoading } = props;
  const classes = useStyles();

  return (
    <Container>
      <Content>
        <ListItem>
          {isLoading
            ? listGeoFence.map(i => <GeoFence device={i} key={i.device_id} />)
            : geo_fence.map(i => <GeoFence device={i} key={i.device_id} />)}
        </ListItem>
      </Content>
      <Footer>
        <Button
          classes={`${classes.btn}`}
          text="Add Tracker"
          color="primary"
          type="submit"
          startIcon={<FiPlus />}
        />
      </Footer>
    </Container>
  );
}
