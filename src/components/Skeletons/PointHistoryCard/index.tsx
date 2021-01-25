import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './styles';

export default function MyPointHistorySkeleton() {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.flexBox}>
        <Skeleton
          variant="circle"
          width={48}
          height={48}
          className={`${classes.skeleton} ${classes.mrr10}`}
        />
        <div>
          <Skeleton className={classes.skeleton} width={150} height={23} />
          <Skeleton className={classes.skeleton} width={130} height={20} />
        </div>
      </div>
      <Skeleton className={classes.skeleton} width={90} height={25} />
    </div>
  );
}
