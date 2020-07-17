import React from 'react';

import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import Device from '@Components/DeviceCard';

interface Props {
  trackers: object;
  trackerIds: Array<string | number>;
}

export default function ListDevice(props: Props) {
  const { trackers, trackerIds } = props;
  const classes = useStyles();

  return (
    <Container>
      <Content>
        <ListItem>
          {trackerIds
            ? trackerIds.map(i => <Device tracker={trackers[i]} key={i} />)
            : [1, 2].map(i => <Device key={i} isLoading />)}
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
