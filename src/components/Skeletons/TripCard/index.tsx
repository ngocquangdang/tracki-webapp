import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStyles } from './styles';

export default function TripCardSkeleton() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.flexRowBetween}>
        <Skeleton
          variant="text"
          width={150}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
        <Skeleton
          variant="text"
          width={100}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
      </div>
      <div className={classes.flexRowBetween}>
        <Skeleton
          variant="text"
          width={150}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
        <Skeleton
          variant="text"
          width={100}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
      </div>
      <Skeleton
        variant="text"
        width={'100%'}
        animation="wave"
        classes={{ root: classes.skeleton }}
      />
      <Skeleton
        variant="text"
        width={150}
        animation="wave"
        classes={{ root: classes.skeleton }}
      />
      <Skeleton
        variant="text"
        width={'100%'}
        animation="wave"
        classes={{ root: classes.skeleton }}
      />
    </div>
  );
}
