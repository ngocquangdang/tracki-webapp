import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from './styles';

export default function DeviceInfoComponent(props) {
  const { device, index } = props;
  const classes = useStyles();

  return (
    <TableRow key={index}>
      <TableCell component="th" className={`${classes.color} ${classes.col1}`}>
        {device.title}
      </TableCell>
      <TableCell align="left" className={`${classes.color} ${classes.col2}`}>
        {device.data}
      </TableCell>
    </TableRow>
  );
}
