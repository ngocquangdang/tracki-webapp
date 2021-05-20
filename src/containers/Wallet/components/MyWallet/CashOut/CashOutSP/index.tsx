import React, { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import CreateIcon from '@material-ui/icons/Create';

import { SideBarOutside } from '@Components/sidebars';
import { Button } from '@Components/buttons';
import CashOutConfirmSP from './CashOutConfirmSP';
import CashOutSuccessfulSP from './CashOutSuccessfulSP';
import PaymentModal from '../../CashIn/PaymentModal';
import EditCashModal from '../../CashIn/CashInPC/compoments/EditCashModal';
import { useStyles } from './styles';

interface Props {
  t(key: string, value?: object);
  payment?: string;
}

const listPayment = [
  {
    urlImg: '/images/philipinbank.svg',
    name: 'xxx',
  },
  {
    urlImg: '/images/paypal.png',
    name: 'yyy',
  },
];

function CashOutSP(props: Props) {
  const { t } = props;
  const classes = useStyles();
  const routes = useRouter();

  const [ispaymentModal, setIsPaymentModal] = useState(false);
  const [tab, setTab] = useState(0);
  const [isEditCashModal, setIsEditCashModal] = useState(false);
  const [anmount, setAnmount] = useState(0);
  const [payment, setPayment] = useState({
    name: '',
    urlImg: '',
  });

  const onBack = () => routes.back();
  const onSelectedAnmount = value => () => setAnmount(value);
  const onConfirmPayment = value => () => setPayment(value);
  const onTogglePayment = () => setIsPaymentModal(true);
  const onToggleEditCash = () => setIsEditCashModal(true);
  const onToggleClose = () => {
    setIsPaymentModal(false);
    setIsEditCashModal(false);
  };

  const onChangeTab = (tab: number) => () => setTab(tab);

  const onRender = (tab: number) => {
    switch (tab) {
      case 1:
        return (
          <CashOutConfirmSP
            anmount={anmount}
            payment={payment}
            t={t}
            onChangeTab={onChangeTab}
          />
        );
      case 2:
        return (
          <CashOutSuccessfulSP t={t} anmount={anmount} payment={payment} />
        );
      default:
        return (
          <SideBarOutside
            title={t('wallet:cash_out')}
            show={true}
            handleClose={onBack}
            isMobile={true}
            isNotSave={true}
          >
            <div className={classes.container}>
              <div
                className={clsx(
                  classes.flexBox,
                  classes.spaceBetween,
                  classes.card
                )}
                onClick={onTogglePayment}
              >
                <div>
                  <p className={clsx(classes.mr0, classes.fs15, classes.mb5)}>
                    {t('wallet:cash_out_from_to', { from: 'Tracki' })}
                  </p>
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
                    <div>
                      {payment.name
                        ? payment.name
                        : t('wallet:no_payment_method')}
                    </div>
                  </div>
                </div>
                <ArrowForwardIosIcon className={classes.icon} />
              </div>
              <div className={classes.card}>
                <p className={clsx(classes.mr0, classes.fs18)}>
                  {t('wallet:cash_out_amount')}
                </p>
                <div
                  className={clsx(
                    classes.flexBox,
                    classes.spaceBetween,
                    classes.borderbottom,
                    classes.pb15
                  )}
                  onClick={onToggleEditCash}
                >
                  <div
                    className={clsx(classes.fs40, {
                      [classes.colorActive]: anmount !== 0,
                    })}
                  >
                    ${anmount}
                  </div>
                  {/* <CreateIcon /> */}
                </div>
                <div className={clsx(classes.fs14)}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={() => {}}
                        color="primary"
                      />
                    }
                    label={t('wallet:withdraw_current_balance', {
                      anmount: anmount,
                    })}
                  />
                </div>
              </div>
              <div className={classes.card}>
                <div className={clsx(classes.flex, classes.spaceBetween)}>
                  <p className={clsx(classes.mr0, classes.fs15)}>
                    {t('wallet:cash_out_fee')}
                  </p>
                  <p className={clsx(classes.mr0, classes.fs15)}>
                    {t('wallet:free')}
                  </p>
                </div>
                <p className={clsx(classes.mr0, classes.fs14)}>
                  {t('wallet:cash_out_fee_description')}
                </p>
              </div>
              <div className={classes.pd15}>
                <div
                  className={clsx(
                    classes.flex,
                    classes.spaceBetween,
                    classes.pb15
                  )}
                >
                  <p className={clsx(classes.mr0, classes.fs18)}>
                    {t('wallet:total_amount_cashed_out')}
                  </p>
                  <p className={clsx(classes.colorActive, classes.mr0)}>
                    ${anmount}.00
                  </p>
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
            {ispaymentModal && (
              <PaymentModal
                open={ispaymentModal}
                closeModal={onToggleClose}
                t={t}
                listPayment={listPayment}
                onConfirmPayment={onConfirmPayment}
                paymentCash={payment}
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
          </SideBarOutside>
        );
    }
  };

  return <>{onRender(tab)}</>;
}

export default CashOutSP;
