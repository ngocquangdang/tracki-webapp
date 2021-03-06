import React from 'react';
import clsx from 'clsx';
import moment from 'moment';

import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';
import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface Props {
  t(key: string, value?: object);
  formData: any;
  setScreenKey: (key: number) => void;
}

function CashInSuccessfull(props: Props) {
  const classes = useStyles();

  const { t, formData, setScreenKey } = props;
  const { payment = '', anmount = 0, transaction } = formData;

  const onBack = () => setScreenKey(1);
  const onNextScreen = () => setScreenKey(0);

  return (
    <DetailPageContainer
      title={t('wallet:cash_in_successful')}
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
            ${anmount}
          </p>
          <p className={classes.mr0}>{t('wallet:amount_to_cash_in')}</p>
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
            {t('wallet:withdrawal_info')}
          </p>
          <div className={clsx(classes.flex, classes.cardItem)}>
            <div>{payment ? payment : t('wallet:no_payment_method')}</div>
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
            {t('wallet:cash_in_fee')}
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
            {t('wallet:total_amount_cashed_in')}
          </p>
          <p className={clsx(classes.mr0, classes.fz15)}>${'0.00'}</p>
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
              - ${transaction?.total || '0.00'}
            </p>
          </div>
        </div>
        <div className={classes.btn}>
          <Button
            text={t('wallet:ok')}
            color="primary"
            fullWidth
            variant="contained"
            onClick={onNextScreen}
          />
        </div>
      </div>
    </DetailPageContainer>
  );
}

export default CashInSuccessfull;
