import React, { useEffect } from 'react';
import CouponsView from './components/Coupons';
import { useStyles } from './styles';

interface Props {
  isMobile: boolean;
  isLoading: boolean;
  fetchDataCoupons(data: object): void;
  coupons: object;
  couponIds: Array<number | string>;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function CouponsStoreViewPC(props: Props) {
  const { fetchDataCoupons } = props;
  const classes = useStyles();

  useEffect(() => {
    fetchDataCoupons({
      page: 1,
      perPage: 10,
    });
  }, [fetchDataCoupons]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.listCard}>
          <CouponsView />
          <CouponsView />
          <CouponsView />
          <CouponsView />
        </div>
      </div>
    </div>
  );
}
