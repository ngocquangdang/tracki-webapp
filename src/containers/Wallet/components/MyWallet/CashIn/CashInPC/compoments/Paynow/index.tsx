import React from 'react';
import clsx from 'clsx';

import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import CashInCard from '../../../../CashInOutCard';
import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface Props {
  t(key: string, value?: object);
  formData: any;
  setScreenKey: (key: number) => void;
}

function CashinConfirm(props: Props) {
  const classes = useStyles();

  const { t, formData, setScreenKey } = props;
  const { payment = '', anmount = 0 } = formData;

  const onBack = () => setScreenKey(0);
  const onNextScreen = () => setScreenKey(2);

  return (
    <DetailPageContainer
      title={t('wallet:confirm_cash_in')}
      onClick={onBack}
      width={642}
    >
      <>
        <div
          className={clsx(
            classes.border,
            classes.pd15,
            classes.mb10,
            classes.h192,
            classes.flex,
            classes.center,
            classes.col
          )}
        >
          <p className={clsx(classes.anmount, classes.mr0, classes.mb10)}>
            ${anmount}
          </p>
          <p className={classes.mr0}>{t('wallet:amount_to_cash_in')}</p>
        </div>
        <CashInCard title={t('wallet:about_cash_in_from')}>
          <div className={clsx(classes.flex, classes.spaceBetween)}>
            <div>{payment ? payment : t('wallet:no_payment_method')}</div>
          </div>
        </CashInCard>
        <div className={classes.btn}>
          <Button
            text={t('wallet:confirm')}
            color="primary"
            fullWidth
            variant="contained"
            onClick={onNextScreen}
          />
        </div>
      </>
    </DetailPageContainer>
  );
}

export default CashinConfirm;
