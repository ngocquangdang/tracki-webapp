import React, { useCallback, useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import { UNWIREDLABS_API_KEY } from '@Definitions/app';

import { AlertCard, TitleAlert, AddressAlert, DateAlert } from './styles';

export default function RecentAlertComponent(props) {
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
    <AlertCard>
      <TitleAlert> {moment(rowAlert.created).format('lll')}</TitleAlert>
      <AddressAlert> {rowAlert.message || 'No'}</AddressAlert>
      <DateAlert>{dataAddress}</DateAlert>
    </AlertCard>
  );
}
