import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';
import { getAddress } from '@Utils/helper';
import { useStyles } from './styles';

interface Props {
  time: number;
  speed: number;
  lat: number;
  lng: number;
}
function PointItem(props: Props) {
  const { time, speed, lat, lng } = props;
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const callApiGetAddress = useCallback(async () => {
    const locationAddress = { lat, lng };
    const address = await getAddress(locationAddress);
    setAddress(address);
    setLoading(false);
  }, [setAddress, setLoading, lat, lng]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);
  const classes = useStyles();
  return (
    <div className={classes.containerPoint}>
      <span>{moment(time * 1000).format('hh:mm A')}</span>
      <span className={clsx(classes.orange, { [classes.red]: speed === 0 })}>
        {speed} kph
      </span>
      {loading ? (
        <Skeleton
          variant="text"
          animation="wave"
          height={15}
          width={'100%'}
          className={classes.skeleton}
        />
      ) : (
        <span className={classes.textNoWrap}>{address}</span>
      )}
    </div>
  );
}

export default PointItem;
