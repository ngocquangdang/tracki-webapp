import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from './styles';

export default function DeviceInfoComponent(props) {
  const {
    device: { title, data },
  } = props;
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell component="th" className={`${classes.color} ${classes.col1}`}>
        {title}
      </TableCell>
      <TableCell align="left" className={`${classes.color} ${classes.col2}`}>
        {data}
      </TableCell>
    </TableRow>
  );
}
