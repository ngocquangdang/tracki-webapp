import React, { useState, useEffect } from 'react';

import { FiPlus } from 'react-icons/fi';

import {
  Container,
  Content,
  Footer,
  // SearchInput,
  // TextInput,
  ListItem,
  useStyles,
} from './styles';
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

export default function ListTracker() {
  const classes = useStyles();
  const [item, setItem] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setItem(!item);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [item]);

  // fake loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      <Content>
        {/* <SearchInput>
          <TextInput
            placeholder="&#xf002; Search devices by name or ID"
            variant="outlined"
            color="secondary"
            type="search"
            InputProps={{ classes: { input: classes.input } }}
          />
        </SearchInput> */}
        <ListItem>
          {listDevice.map(i => (
            <Device device={i} key={i.id} isLoading={isLoading} />
          ))}
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
