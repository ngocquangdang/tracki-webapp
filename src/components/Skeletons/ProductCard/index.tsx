import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStyles } from './styles';

export default function ProductCardSkeleton() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Skeleton
        variant="rect"
        animation="wave"
        width="100%"
        height={262}
        classes={{ root: classes.skeleton }}
      />
      <div className={classes.row2}>
        <Skeleton
          variant="text"
          animation="wave"
          classes={{ root: `${classes.skeleton} ${classes.skeletonRow1}` }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          classes={{ root: `${classes.skeleton} ${classes.skeletonRow2}` }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          classes={{ root: `${classes.skeleton} ${classes.skeletonRow3}` }}
        />
      </div>
    </div>
  );
}
