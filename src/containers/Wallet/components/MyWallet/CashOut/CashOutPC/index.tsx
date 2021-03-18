import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';
import CreateIcon from '@material-ui/icons/Create';

import { MainLayout } from '@Layouts';
import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import CashInCard from '../../CashInOutCard';

import { useStyles } from './styles';
import PaymentModal from '../../CashIn/PaymentModal';
import { Button } from '@Components/buttons';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import CashOutConfirm from '../CashOutConfirm';
import CashOutSuccessfull from '../CashOutSuccessfull';

interface Props {
  t(key: string, value?: object);
}

function CashOutPC(props: Props) {
  const routes = useRouter();
  const classes = useStyles();

  const { t } = props;
  const [anmount, setAnmount] = useState(0);
  console.log(
    '🚀 ~ file: index.tsx ~ line 26 ~ CashOutPC ~ setAnmount',
    setAnmount
  );
  const [ispaymentModal, setIsPaymentModal] = useState(false);
  const [payment, setPayment] = useState('');
  const [tab, setTab] = useState(0);

  const onBack = () => routes.back();
  const onTogglePayment = () => setIsPaymentModal(true);
  const onToggleClose = () => setIsPaymentModal(false);
  const onSetPayemt = () => setPayment('xxx');
  console.log(
    '🚀 ~ file: index.tsx ~ line 42 ~ CashInPC ~ onSetPayemt',
    onSetPayemt
  );

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
                <div>{payment ? payment : t('wallet:no_payment_method')}</div>
                <ArrowForwardIosIcon onClick={onTogglePayment} />
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
                    ${anmount}
                  </div>
                  <CreateIcon />
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
                    label={t('wallet:withdraw_current_balance', { anmount: 0 })}
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
                <p className={clsx(classes.colorActive, classes.mr0)}>$0.00</p>
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
        <PaymentModal open={ispaymentModal} closeModal={onToggleClose} t={t} />
      )}
      {tab === 1 && (
        <CashOutConfirm t={t} formData={{}} onChangeTab={onChangeTab} />
      )}
      {tab === 2 && (
        <CashOutSuccessfull t={t} formData={{}} onChangeTab={onChangeTab} />
      )}
    </MainLayout>
  );
}

export default CashOutPC;
