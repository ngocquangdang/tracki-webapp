import React from 'react';

import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import Device from '@Components/DeviceCard';

const listDevice = [
  {
    name: 'Steve Rodgers truck',
    time: 'Last Updated: 3 days ago',
    id: 1,
  },
  {
    name: 'Steve Rodgers truckter',
    time: 'Last Updated: 3 days ago',
    id: 2,
  },
];

export default function ListDevice(props: any) {
  const { trackers, trackerIds } = props;
  const classes = useStyles();

  return (
    <Container>
      <Content>
        <ListItem>
          {trackerIds
            ? trackerIds.map(i => <Device device={trackers[i]} key={i} />)
            : listDevice.map(i => <Device device={i} key={i.id} isLoading />)}
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
