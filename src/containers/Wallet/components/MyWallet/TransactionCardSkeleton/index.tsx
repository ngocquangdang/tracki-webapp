import { Skeleton } from '@material-ui/lab';
import React from 'react';

import { useStyles, ListItemStyle } from './styles';

function TransacrtionCardSkeleton(props) {
  const classes = useStyles();

  return (
    <ListItemStyle button>
      <div className={classes.item}>
        <div>
          <Skeleton className={classes.skeleton} width={150} height={20} />
          <Skeleton className={classes.skeleton} width={150} height={20} />
          <Skeleton className={classes.skeleton} width={150} height={20} />
        </div>
        <div className={classes.textEnd}>
          <Skeleton
            className={`${classes.skeleton} ${classes.ma}`}
            width={50}
            height={22}
          />
          <Skeleton className={classes.skeleton} width={100} height={22} />
        </div>
      </div>
    </ListItemStyle>
  );
}

export default TransacrtionCardSkeleton;
