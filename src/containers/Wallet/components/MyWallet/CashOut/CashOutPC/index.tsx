import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CreateIcon from '@material-ui/icons/Create';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import clsx from 'clsx';

import { MainLayout } from '@Layouts';
import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import CashInCard from '../../CashInOutCard';

import PaymentModal from '../../CashIn/PaymentModal';
import { Button } from '@Components/buttons';
import CashOutConfirm from './CashOutConfirm';
import CashOutSuccessfull from './CashOutSuccessfull';
import EditCashModal from '../../CashIn/CashInPC/compoments/EditCashModal';

import { useStyles } from './styles';

interface Props {
  t(key: string, value?: object);
}

const listPayment = [
  {
    urlImg: '/static/images/philipinbank.svg',
    name: 'xxx',
  },
  {
    urlImg: '/static/images/paypal.png',
    name: 'yyy',
  },
];

function CashOutPC(props: Props) {
  const routes = useRouter();
  const classes = useStyles();

  const { t } = props;
  const [anmount, setAnmount] = useState(0);
  const [ispaymentModal, setIsPaymentModal] = useState(false);
  const [tab, setTab] = useState(0);
  const [isEditCashModal, setIsEditCashModal] = useState(false);
  const [payment, setPayment] = useState({
    name: '',
    urlImg: '',
  });

  const onBack = () => routes.back();
  const onSelectedAnmount = value => () => setAnmount(value);
  const onTogglePayment = () => setIsPaymentModal(true);
  const onToggleEditCash = () => setIsEditCashModal(true);
  const onToggleClose = () => {
    setIsPaymentModal(false);
    setIsEditCashModal(false);
  };
  const onConfirmPayment = value => () => setPayment(value);

  const onChangeTab = (tab: number) => () => setTab(tab);

  return (
    <MainLayout hasFooter={false}>
      {tab === 0 && (
        <DetailPageContainer
          title={t('wallet:cash_out')}
          onClick={onBack}
          width={642}
        >
          <div>
            <CashInCard
              title={t('wallet:cash_out_from_to', { from: 'Tracki' })}
            >
              <div className={clsx(classes.flex, classes.spaceBetween)}>
                <div className={classes.wrapperPayment}>
                  {payment.urlImg && (
                    <div className={classes.wrapperImage}>
                      <img
                        src={payment.urlImg}
                        alt=""
                        className={classes.imagePayment}
                      />
                    </div>
                  )}
                  <div className={classes.paymentName}>
                    {payment.name || t('wallet:no_payment_method')}
                  </div>
                </div>
                <ArrowForwardIosIcon
                  className={classes.iconCashOut}
                  onClick={onTogglePayment}
                />
              </div>
            </CashInCard>
            <CashInCard title={t('wallet:cash_out_amount')}>
              <>
                <div
                  className={clsx(
                    classes.flex,
                    classes.spaceBetween,
                    classes.borderbottom,
                    classes.pb15
                  )}
                >
                  <div
                    className={clsx(classes.fs32, {
                      [classes.colorActive]: anmount !== 0,
                    })}
                  >
                    ${anmount}.00
                  </div>
                  <div
                    className={classes.iconCashOut}
                    onClick={onToggleEditCash}
                  >
                    <CreateIcon />
                  </div>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={() => {}}
                        color="primary"
                      />
                    }
                    label={t('wallet:withdraw_current_balance', { anmount })}
                  />
                </div>
              </>
            </CashInCard>
            <div className={clsx(classes.border, classes.pd15, classes.mb10)}>
              <div
                className={clsx(
                  classes.flex,
                  classes.spaceBetween,
                  classes.mb10
                )}
              >
                <p className={classes.mr0}>{t('wallet:cash_out_fee')}</p>
                <p className={classes.mr0}>{t('wallet:free')}</p>
              </div>
              <div className={clsx(classes.flex, classes.spaceBetween)}>
                <p className={clsx(classes.w500, classes.mr0)}>
                  {t('wallet:total_amount_cashed_out')}
                </p>
                <p
                  className={clsx(classes.colorActive, classes.mr0)}
                >{`$${anmount}.00`}</p>
              </div>
              <div className={classes.btn}>
                <Button
                  text={t('wallet:next')}
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={onChangeTab(1)}
                />
              </div>
            </div>
          </div>
        </DetailPageContainer>
      )}
      {ispaymentModal && (
        <PaymentModal
          open={ispaymentModal}
          closeModal={onToggleClose}
          t={t}
          onConfirmPayment={onConfirmPayment}
          paymentCash={payment}
          listPayment={listPayment}
        />
      )}
      {tab === 1 && (
        <CashOutConfirm
          t={t}
          anmount={anmount}
          payment={payment}
          onChangeTab={onChangeTab}
        />
      )}
      {tab === 2 && (
        <CashOutSuccessfull
          t={t}
          anmount={anmount}
          formData={{}}
          payment={payment}
          onChangeTab={onChangeTab}
        />
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
    </MainLayout>
  );
}

export default CashOutPC;
