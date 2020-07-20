import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import TrackerCard from '@Components/TrackerCard';
import { SkeletonTracker } from '@Components/Skeletons';

interface Props {
  trackers: object;
  trackerIds: Array<string | number>;
  onClickTracker(id: number): void;
}

export default function ListDevice(props: Props) {
  const { trackers, trackerIds, onClickTracker } = props;
  const classes = useStyles();

  return (
    <Container>
      <Content>
        <ListItem>
          {trackerIds
            ? trackerIds.map(id => (
                // eslint-disable-next-line react/jsx-indent
                <TrackerCard
                  key={id}
                  tracker={trackers[id]}
                  onClickTracker={onClickTracker}
                />
              ))
            : [1, 2].map(i => <SkeletonTracker key={i} />)}
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
