import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { useStyles } from './styles';

export default function PaymentFormSkeleton() {
  const classes = useStyles();

  return (
    <div className={classes.skeleton}>
      <Skeleton
        variant="rect"
        animation="wave"
        width={'100%'}
        height={60}
        className={classes.skeleton1}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        width={'100%'}
        height={60}
        className={classes.skeleton2}
      />
    </div>
  );
}
