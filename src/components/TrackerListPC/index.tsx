import React from 'react';
import Router from 'next/router';
import { FiPlus } from 'react-icons/fi';

import {
  Container,
  Content,
  Footer,
  ListItem,
  useStyles,
  Message,
} from './styles';
import { Button } from '@Components/buttons';
import TrackerCard from '@Components/TrackerCard';
import { SkeletonTracker } from '@Components/Skeletons';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  trackers: object;
  trackerIds: Array<string | number>;
  onClickTracker(id: number): void;
  t(key: string): string;
}

export default function ListDevice(props: Props) {
  const { trackers, trackerIds, onClickTracker, t } = props;
  const classes = useStyles();

  const onAddtracker = () => {
    firebaseLogEventRequest('trackers_page', 'add_tracker');
    Router.push('/add-tracker');
  };

  const handleClickTracker = (id: number) => {
    firebaseLogEventRequest('trackers_page', 'device_detail');
    onClickTracker(id);
    window.history.pushState({}, '', '/trackers/' + id);
  };

  return (
    <>
      <Container>
        <Content>
          <ListItem>
            {trackerIds
              ? trackerIds.map(id => (
                  // eslint-disable-next-line react/jsx-indent
                  <TrackerCard
                    t={t}
                    key={id}
                    tracker={trackers[id]}
                    onClickTracker={handleClickTracker}
                  />
                ))
              : [1, 2].map(i => <SkeletonTracker key={i} />)}
            {trackerIds?.length === 0 && (
              <Message>{t('tracker:no_tracker_found')}</Message>
            )}
          </ListItem>
        </Content>
        <Footer>
          <Button
            classes={`${classes.btn}`}
            text="Add Tracker"
            color="primary"
            type="submit"
            startIcon={<FiPlus />}
            onClick={onAddtracker}
          />
        </Footer>
      </Container>
    </>
  );
}
