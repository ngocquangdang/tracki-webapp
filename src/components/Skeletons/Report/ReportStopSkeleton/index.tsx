import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core';

function ReportStopSkeleton(props) {
  const { isSpeed } = props;
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell>
        <Skeleton
          variant="text"
          width={'100%'}
          height={15}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
      </TableCell>
      {!isSpeed && (
        <TableCell>
          <Skeleton
            variant="text"
            width={'100%'}
            height={15}
            animation="wave"
            classes={{ root: classes.skeleton }}
          />
        </TableCell>
      )}
      <TableCell>
        <Skeleton
          variant="text"
          width={'100%'}
          height={15}
          animation="wave"
          classes={{ root: classes.skeleton }}
        />
      </TableCell>
      <TableCell>
        <div>
          <Skeleton
            variant="text"
            width={'90%'}
            height={15}
            animation="wave"
            classes={{ root: classes.skeleton }}
          />
          <Skeleton
            variant="text"
            width={'70%'}
            height={15}
            animation="wave"
            classes={{ root: classes.skeleton }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

const useStyles = makeStyles(theme => ({
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
}));

export default ReportStopSkeleton;
