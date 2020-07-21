import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, Content, Footer, ListItem, useStyles } from './styles';
import { Button } from '@Components/buttons';
import TrackerCard from '@Components/TrackerCard';
import { SkeletonTracker } from '@Components/Skeletons';
import SettingTracker from '@Containers/Trackers/views/SettingTracker';

interface Props {
  trackers: object;
  trackerIds: Array<string | number>;
  onClickTracker(id: number): void;
  t(): void;
}

export default function ListDevice(props: Props) {
  const { trackers, trackerIds, onClickTracker, t } = props;
  const classes = useStyles();
  const [openSetting, setOpenSetting] = useState(false);
  const handleClickAdd = () => {
    setOpenSetting(true);
  };
  const handleClose = () => {
    setOpenSetting(false);
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
            onClick={handleClickAdd}
          />
        </Footer>
      </Container>
      {openSetting ? <SettingTracker handleClose={handleClose} t={t} /> : null}
    </>
  );
}
