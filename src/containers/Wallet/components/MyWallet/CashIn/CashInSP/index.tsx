import React, { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

//Component
import { SideBarOutside } from '@Components/sidebars';
import { Button } from '@Components/buttons';
import PaymentModal from '../PaymentModal';
import EditCashModal from '../CashInPC/compoments/EditCashModal';

//style
import { useStyles } from './styles';

const CASH_VALUES = [
  { id: 1, value: 10 },
  { id: 2, value: 30 },
  { id: 3, value: 50 },
  { id: 4, value: 100 },
  { id: 5, value: 250 },
  { id: 6, value: 300 },
  { id: 7, value: 500 },
  { id: 8, value: 750 },
  { id: 9, value: 1000 },
  { id: 10, value: 2000 },
];

interface Props {
  t(key: string, value?: object);
}

function CashInSP(props: Props) {
  const classes = useStyles();
  const routes = useRouter();

  const { t } = props;
  const [anmount, setAnmount] = useState(0);
  const [ispaymentModal, setIsPaymentModal] = useState(false);
  const [payment, setPayment] = useState('');
  const [isEditCashModal, setIsEditCashModal] = useState(false);

  const onBack = () => routes.back();

  const onSelectedAnmount = value => () => setAnmount(value);
  const onTogglePayment = () => setIsPaymentModal(true);
  const onToggleEditCash = () => setIsEditCashModal(true);
  const onToggleClose = () => {
    setIsPaymentModal(false);
    setIsEditCashModal(false);
  };
  const onSetPayemt = () => setPayment('xxx');
  console.log(
    '🚀 ~ file: index.tsx ~ line 42 ~ CashInPC ~ onSetPayemt',
    onSetPayemt
  );

  return (
    <SideBarOutside
      title={t('wallet:cash_in_to_my_wallet')}
      show={true}
      handleClose={onBack}
      isMobile={true}
      isNotSave={true}
    >
      <div className={classes.cashInContainer}>
        <div className={classes.card}>
          <p className={clsx(classes.title, classes.pd15)}>
            {t('wallet:select_cash_in_my_value')}
          </p>
          <div className={clsx(classes.cashInContent, classes.borderbottom)}>
            {CASH_VALUES.map(item => (
              <div
                className={clsx(
                  classes.valueItem,
                  classes.flex,
                  classes.border,
                  {
                    [classes.borderActive]: item.value === anmount,
                  },
                  {
                    [classes.colorActive]: item.value === anmount,
                  }
                )}
                key={item.id}
                onClick={onSelectedAnmount(item.value)}
              >
                ${item.value}
              </div>
            ))}
          </div>
          <div className={classes.pd15} onClick={onToggleEditCash}>
            <p className={clsx(classes.title)}>{t('wallet:cash_in_amount')}</p>
            <div
              className={clsx(classes.fs32, {
                [classes.colorActive]: anmount !== 0,
              })}
            >
              ${anmount}
            </div>
          </div>
        </div>
        <div
          className={clsx(classes.card, classes.pd15)}
          onClick={onTogglePayment}
        >
          <div className={clsx(classes.flex)}>{t('wallet:payment_method')}</div>
          <p className={clsx(classes.fs14, classes.mr0)}>
            {payment ? payment : t('wallet:no_payment_method')}
          </p>
        </div>
        <div className={clsx(classes.pd15, classes.card)}>
          <div
            className={clsx(classes.mb10, classes.flex, classes.spaceBetween)}
          >
            <p className={clsx(classes.mr0, classes.fs15)}>
              {t('wallet:cash_in_amount')}
            </p>
            <p className={classes.mr0}>$0.00</p>
          </div>
          <div className={clsx(classes.flex, classes.spaceBetween)}>
            <p className={clsx(classes.w500, classes.mr0, classes.fs15)}>
              {t('wallet:total_amount_to_cash_in')}
            </p>
            <p className={clsx(classes.colorActive, classes.mr0)}>$0.00</p>
          </div>
        </div>
        <div className={classes.btn}>
          <Button
            text={t('wallet:pay_now')}
            color="primary"
            fullWidth
            variant="contained"
          />
        </div>
      </div>
      {ispaymentModal && (
        <PaymentModal open={ispaymentModal} closeModal={onToggleClose} t={t} />
      )}
      {isEditCashModal && (
        <EditCashModal
          open={isEditCashModal}
          closeModal={onToggleClose}
          t={t}
          value={anmount}
          saveValue={onSelectedAnmount}
        />
      )}
    </SideBarOutside>
  );
}

export default CashInSP;
