import React from 'react';
import { Slide, IconButton, Typography } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';

import useStyles from './styles';

interface Props {
  show: boolean;
  trackers: object;
  t(key: string): string;
  onClose(): void;
  onChangeTrackers(ids: number[]): void;
  [data: string]: any;
}

function SelectTracker(props: Props) {
  const { show, onClose } = props;
  const classes = useStyles();

  return (
    <Slide in={show} direction="left" mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={classes.blur} />
        <div className={classes.content}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <FaMapMarkerAlt className={classes.locationIcon} />
              <Typography className={classes.headerTitle}>
                Select Device
              </Typography>
            </div>
            <IconButton onClick={onClose} className={classes.closeBtn}>
              <IoIosClose />
            </IconButton>
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default SelectTracker;
