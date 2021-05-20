import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import moment from 'moment';

import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface Props {
  t(key: string, value?: object);
  formData: any;
  anmount: number;
  payment: {
    name: string;
    urlImg: string;
  };
  onChangeTab: (tab: number) => void;
}

function CashOutSuccessfull(props: Props) {
  const routes = useRouter();
  const classes = useStyles();

  const { t, formData, onChangeTab, anmount, payment } = props;
  const { transaction } = formData;

  const onBack = () => routes.back();

  return (
    <DetailPageContainer
      title={t('wallet:cash_out_successful')}
      onClick={onBack}
      width={642}
    >
      <div className={clsx(classes.border, classes.pd71)}>
        <div
          className={clsx(
            classes.pb15,
            classes.flex,
            classes.center,
            classes.col,
            classes.colorActive
          )}
        >
          <p className={clsx(classes.anmount, classes.mr0, classes.mb10)}>
            -${anmount}.00
          </p>
          <p className={classes.mr0}>{t('wallet:amount_to_cash_out')}</p>
        </div>
        <div>
          <p
            className={clsx(
              classes.cardItem,
              classes.mr0,
              classes.borderbottom,
              classes.bgf456,
              classes.fx13
            )}
          >
            {t('wallet:cash_out_from_to')}
          </p>
          <div className={clsx(classes.flex, classes.cardItem)}>
            <div className={classes.wrapperPayment}>
              <div className={classes.wrapperImage}>
                {payment.urlImg && (
                  <img
                    src={payment.urlImg}
                    alt=""
                    className={classes.imagePayment}
                  />
                )}
              </div>
              <div>
                {payment.name ? payment.name : t('wallet:no_payment_method')}
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            classes.cardItem,
            classes.borderbottom,
            classes.flex,
            classes.spaceBetween
          )}
        >
          <p className={clsx(classes.mr0, classes.w500)}>
            {t('wallet:cash_out_fee')}
          </p>
          <p className={clsx(classes.mr0, classes.fz15)}>${'0.00'}</p>
        </div>
        <div
          className={clsx(
            classes.cardItem,
            classes.borderbottom,
            classes.flex,
            classes.spaceBetween
          )}
        >
          <p className={clsx(classes.mr0, classes.w500)}>
            {t('wallet:total_amount_cashed_out')}
          </p>
          <p className={clsx(classes.mr0, classes.fz15)}>${anmount}.00</p>
        </div>
        <div className={clsx(classes.mb10, classes.bgFFF)}>
          <div
            className={clsx(
              classes.cardItem,
              classes.borderbottom,
              classes.flex,
              classes.spaceBetween
            )}
          >
            <p className={clsx(classes.mr0, classes.w500)}>
              {t('wallet:transaction_id')}
            </p>
            <p className={clsx(classes.mr0, classes.fz15)}>{transaction?.id}</p>
          </div>
          <div
            className={clsx(
              classes.cardItem,
              classes.borderbottom,
              classes.flex,
              classes.spaceBetween
            )}
          >
            <p className={clsx(classes.mr0, classes.w500)}>
              {t('wallet:transaction_date')}
            </p>
            <p className={clsx(classes.mr0, classes.fz15)}>
              {moment(transaction?.updatedAt * 1000).format('LLL') || '[N/A]'}
            </p>
          </div>
        </div>
        <div className={clsx(classes.mb10, classes.bgFFF)}>
          <p
            className={clsx(
              classes.cardItem,
              classes.mr0,
              classes.borderbottom,
              classes.bgf456,
              classes.fx13
            )}
          >
            {t('wallet:withdrawal_info')}
          </p>
          <div
            className={clsx(
              classes.cardItem,
              classes.flex,
              classes.spaceBetween
            )}
          >
            <p className={clsx(classes.mr0, classes.w500)}>
              {t('wallet:wallet_transaction')}
            </p>
            <p className={clsx(classes.mr0, classes.fz15, classes.redText)}>
              - ${transaction?.total || anmount}.00
            </p>
          </div>
        </div>
        <div className={classes.btn}>
          <Button
            text={t('wallet:ok')}
            color="primary"
            fullWidth
            variant="contained"
            onClick={onChangeTab(0)}
          />
        </div>
      </div>
    </DetailPageContainer>
  );
}

export default CashOutSuccessfull;
