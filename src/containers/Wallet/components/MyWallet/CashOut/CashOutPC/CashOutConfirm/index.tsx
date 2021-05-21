import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import CashInCard from '../../../CashInOutCard';

import { useStyles } from './styles';
import { Button } from '@Components/buttons';

interface Props {
  t(key: string, value?: object): string;
  anmount: number;
  payment: {
    name: string;
    urlImg: string;
  };
  onChangeTab: (tab: number) => void;
}

function CashOutConfirm(props: Props) {
  const routes = useRouter();
  const classes = useStyles();

  const { t, onChangeTab, anmount, payment } = props;

  const onBack = () => routes.back();

  return (
    <DetailPageContainer
      title={t('wallet:cash_out_confirmation')}
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
            ${anmount}.00
          </p>
          <p className={classes.mr0}>{t('wallet:amount_to_cash_out')}</p>
        </div>
        <CashInCard title={t('wallet:cash_out_from_to', { from: 'Tracki' })}>
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
          </div>
        </CashInCard>
        <div className={clsx(classes.border, classes.pd15, classes.mb10)}>
          <div
            className={clsx(classes.flex, classes.spaceBetween, classes.mb10)}
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
              text={t('wallet:confirm')}
              color="primary"
              fullWidth
              variant="contained"
              onClick={onChangeTab(2)}
            />
          </div>
        </div>
        <div className={clsx(classes.flex, classes.center, classes.grayColor)}>
          <HelpOutlineOutlinedIcon className={classes.icon} />{' '}
          {t('wallet:cash_out_description')}
        </div>
      </>
    </DetailPageContainer>
  );
}

export default CashOutConfirm;
