import React, { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import CreateIcon from '@material-ui/icons/Create';

import { SideBarOutside } from '@Components/sidebars';

import { useStyles } from './styles';
import { Button } from '@Components/buttons';
import CashOutConfirmSP from './CashOutConfirmSP';
import CashOutSuccessfulSP from './CashOutSuccessfulSP';

interface Props {
  t(key: string, value?: object);
  payment?: string;
  anmount?: number;
}

function CashOutSP(props: Props) {
  const { t, payment = '', anmount = 0 } = props;
  const classes = useStyles();
  const routes = useRouter();

  const [ispaymentModal, setIsPaymentModal] = useState(false);
  console.log(
    '🚀 ~ file: index.tsx ~ line 26 ~ CashOutSP ~ ispaymentModal',
    ispaymentModal
  );
  const [tab, setTab] = useState(0);

  const onBack = () => routes.back();

  const onTogglePayment = () => setIsPaymentModal(true);
  const onToggleClose = () => setIsPaymentModal(false);
  console.log(
    '🚀 ~ file: index.tsx ~ line 32 ~ CashOutSP ~ onToggleClose',
    onToggleClose
  );

  const onChangeTab = (tab: number) => () => setTab(tab);

  const onRender = (tab: number) => {
    switch (tab) {
      case 1:
        return <CashOutConfirmSP t={t} onChangeTab={onChangeTab} />;
      case 2:
        return <CashOutSuccessfulSP t={t} />;
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
              >
                <div>
                  <p className={clsx(classes.mr0, classes.fs15, classes.mb5)}>
                    {t('wallet:cash_out_from_to', { from: 'Tracki' })}
                  </p>
                  <p className={clsx(classes.mr0, classes.fs14)}>
                    {payment ? payment : t('wallet:no_payment_method')}
                  </p>
                </div>
                <ArrowForwardIosIcon
                  onClick={onTogglePayment}
                  className={classes.icon}
                />
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
                    label={t('wallet:withdraw_current_balance', { anmount: 0 })}
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
                    $0.00
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
          </SideBarOutside>
        );
    }
  };

  return <>{onRender(tab)}</>;
}

export default CashOutSP;
