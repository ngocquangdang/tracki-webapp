import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStyles } from './styles';

export default function UnReadNotiCard() {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.flexRowBetween}>
        <div className={classes.flexRow}>
          <Skeleton
            variant="circle"
            animation="wave"
            width={30}
            height={30}
            style={{ marginRight: 8, borderRadius: 5 }}
            classes={{ root: classes.skeleton }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={200}
            height={17}
            style={{ marginRight: 8, borderRadius: 5 }}
            classes={{ root: classes.skeleton }}
          />
        </div>
        <Skeleton
          variant="text"
          animation="wave"
          width={100}
          height={17}
          style={{ marginRight: 8, borderRadius: 5 }}
          classes={{ root: classes.skeleton }}
        />
      </div>
      <Skeleton
        variant="text"
        animation="wave"
        width={'90%'}
        height={17}
        style={{ marginBottom: 8, borderRadius: 5 }}
        classes={{ root: classes.skeleton }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        width={'70%'}
        height={17}
        style={{ marginBottom: 8, borderRadius: 5 }}
        classes={{ root: classes.skeleton }}
      />
    </div>
  );
}
