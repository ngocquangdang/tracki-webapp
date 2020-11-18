import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { Card, useStyles } from './styles';

interface Props {
  isMobile?: boolean;
}

export default function ReportRowCard(props: Props) {
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
      <div className={classes.flexCol1}>
        <Skeleton
          variant="text"
          width={'90%'}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
        <Skeleton
          variant="text"
          width={'70%'}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
        <Skeleton
          variant="text"
          width={'30%'}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
      </div>
      <div className={classes.flexCol2}>
        <Skeleton
          variant="text"
          width={'90%'}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
        <Skeleton
          variant="text"
          width={'90%'}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
      </div>
    </Card>
  );
}
