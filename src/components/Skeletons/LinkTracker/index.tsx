import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { Card, useStyles } from './styles';

interface Props {
  isMobile?: boolean;
}

export default function LinkTracker(props: Props) {
  const classes = useStyles();
  const { isMobile = false } = props;

  return (
    <Card isMobile={isMobile}>
      <Skeleton
        variant="circle"
        animation="wave"
        width={40}
        height={40}
        style={{ marginRight: 8, borderRadius: 20 }}
        classes={{ root: classes.skeleton }}
      />
      <Skeleton
        variant="text"
        width={'80%'}
        height={40}
        animation="wave"
        classes={{ root: classes.skeleton }}
        style={{ top: -2 }}
      />
    </Card>
  );
}
