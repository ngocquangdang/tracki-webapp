import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';

//Component
import DetailPageContainer from '../../../../../DetailPageContainer';
import CashInCard from '../../../../CashInOutCard';
import PaymentModal from '../../../PaymentModal';
import { Button } from '@Components/buttons';
import EditCashModal from '../EditCashModal';

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
  setScreenKey: (key: number) => void;
}

function CashInContainer(props: Props) {
  const classes = useStyles();
  const routes = useRouter();

  const { t, setScreenKey } = props;
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

  const onPayment = () => setScreenKey(1);
  return (
    <>
      <DetailPageContainer
        title={t('wallet:cash_in_to_my_wallet')}
        onClick={onBack}
        width={642}
      >
        <div>
          <CashInCard title={t('wallet:select_cash_in_my_value')}>
            <div className={classes.cashInContent}>
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
          </CashInCard>
          <CashInCard title={t('wallet:cash_in_amount')}>
            <div className={clsx(classes.flex, classes.spaceBetween)}>
              <div
                className={clsx(classes.fs32, {
                  [classes.colorActive]: anmount !== 0,
                })}
              >
                ${anmount}
              </div>
              <div onClick={onToggleEditCash}>
                <CreateIcon />
              </div>
            </div>
          </CashInCard>
          <CashInCard title={t('wallet:payment_method')}>
            <div className={clsx(classes.flex, classes.spaceBetween)}>
              <div>{payment ? payment : t('wallet:no_payment_method')}</div>
              <ArrowForwardIosIcon onClick={onTogglePayment} />
            </div>
          </CashInCard>
          <div className={clsx(classes.border, classes.pd15, classes.mb10)}>
            <div
              className={clsx(classes.flex, classes.spaceBetween, classes.mb10)}
            >
              <p className={classes.mr0}>{t('wallet:cash_in_amount')}</p>
              <p className={classes.mr0}>$0.00</p>
            </div>
            <div className={clsx(classes.flex, classes.spaceBetween)}>
              <p className={clsx(classes.w500, classes.mr0)}>
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
              onClick={onPayment}
            />
          </div>
        </div>
      </DetailPageContainer>
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
    </>
  );
}

export default CashInContainer;
