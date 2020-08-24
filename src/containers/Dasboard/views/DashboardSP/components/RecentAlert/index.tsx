import React, { useCallback, useState, useEffect } from 'react';
import moment from 'moment';

import { AlertCard, TitleAlert, AddressAlert, DateAlert } from './styles';
import { getAddress } from '@Utils/helper';

export default function RecentAlertComponent({ rowAlert }) {
  const [dataAddress, setDataAddress] = useState('');

  const callApiGetAddress = useCallback(async () => {
    if (rowAlert && !!rowAlert.lat && !!rowAlert.lng) {
      const address = await getAddress(rowAlert);
      setDataAddress(address);
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
      <AddressAlert> {rowAlert.message || '-'}</AddressAlert>
      <DateAlert>{dataAddress}</DateAlert>
    </AlertCard>
  );
}
