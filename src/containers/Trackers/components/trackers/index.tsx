import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import Device from '@Components/DeviceCard';

interface Props {
  trackers: object;
  trackerIds: Array<string | number>;
  selectedSingleTracker: any;
}

export default function ListDevice(props: Props) {
  const { trackers, trackerIds, selectedSingleTracker } = props;
  const classes = useStyles();

  return (
    <Container>
      <Content>
        <ListItem>
          {trackerIds
            ? trackerIds.map(i => (
                // eslint-disable-next-line react/jsx-indent
                <Device
                  key={i}
                  tracker={trackers[i]}
                  onClickTracker={() => selectedSingleTracker(i)}
                />
              ))
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
