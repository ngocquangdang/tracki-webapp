import React from 'react';
import { Slide, IconButton, Typography } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';

import TrackerCard from '@Components/TrackerCard';
import useStyles from './styles';

interface Props {
  show: boolean;
  trackers: object;
  selectedTrackerId: number;
  t(key: string): string;
  onClose(): void;
  onChangeTrackers(ids: number[]): void;
  [data: string]: any;
}

function SelectTracker(props: Props) {
  const {
    show,
    trackers,
    selectedTrackerId = '',
    t,
    onClose,
    onChangeTrackers,
  } = props;
  const classes = useStyles();

  const onSelectTracker = (id: number) => {
    onChangeTrackers([id]);
  };

  const trackerIds = Object.keys(trackers);

  return (
    <Slide in={show} direction="left" mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={classes.blur} />
        <div className={classes.content}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <FaMapMarkerAlt className={classes.locationIcon} />
              <Typography className={classes.headerTitle}>
                {t('tracker:select_device')}
              </Typography>
            </div>
            <IconButton onClick={onClose} className={classes.closeBtn}>
              <IoIosClose />
            </IconButton>
          </div>
          <div className={classes.list}>
            {trackerIds.map(id => (
              <div key={id} className={classes.trackeItem}>
                {selectedTrackerId.toString() === id && (
                  <div className={classes.selectedTracker} />
                )}
                <TrackerCard
                  isChecked={selectedTrackerId.toString() === id}
                  tracker={trackers[id]}
                  isTracking={true}
                  onClickTracker={onSelectTracker}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default SelectTracker;
