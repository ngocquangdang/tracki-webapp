import React, { useCallback, useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { UNWIREDLABS_API_KEY } from '@Definitions/app';

import { useStyles } from './styles';

export default function RecentAlertComponent(props) {
  const classes = useStyles();
  const { rowAlert } = props;
  const [dataAddress, setDataAddress] = useState('');

  const callApiGetAddress = useCallback(async () => {
    if (rowAlert && !!rowAlert.lat && !!rowAlert.lng) {
      const { data } = await axios.get(
        `https://us1.unwiredlabs.com/v2/reverse.php?token=${UNWIREDLABS_API_KEY}&lat=${rowAlert.lat}&lon=${rowAlert.lng}`
      );
      setDataAddress(
        data.status === 'ok' ? data.address.display_name : 'Unknow location'
      );
    } else {
      setDataAddress('Unknow location');
    }
  }, [setDataAddress, rowAlert]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  return (
    <TableRow key={rowAlert.id}>
      <TableCell className={`${classes.color} ${classes.font14} `}>
        {moment(rowAlert.created).format('lll')}
      </TableCell>
      <TableCell align="left" className={`${classes.color} ${classes.font14} `}>
        {rowAlert.message || 'No'}
      </TableCell>
      <TableCell align="left" className={`${classes.color} ${classes.font14} `}>
        {dataAddress}
      </TableCell>
    </TableRow>
  );
}
