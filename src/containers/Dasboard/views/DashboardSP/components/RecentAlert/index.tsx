import React, { useCallback, useState, useEffect } from 'react';
import moment from 'moment';
import { getAddress } from '@Utils/helper';

import { AlertCard, TitleAlert, AddressAlert, DateAlert } from './styles';

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
    <AlertCard key={rowAlert.id}>
      <TitleAlert> {moment(rowAlert.created).format('lll')}</TitleAlert>
      <AddressAlert> {rowAlert.message || '-'}</AddressAlert>
      <DateAlert>{dataAddress}</DateAlert>
    </AlertCard>
  );
}
