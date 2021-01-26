import React from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { Button } from '@Components/buttons';

// component
import { SideBarOutside } from '@Components/sidebars';

//style
import { useStyles } from './styles';

//interface
interface Props {
  t(key: string, format?: object): string;
  onClose: () => void;
  show: boolean;
  transaction: any;
}

function CashOutDetail(props: Props) {
  const classes = useStyles();

  const { show, onClose, t, transaction } = props;

  const handleClose = () => onClose();

  return (
    <SideBarOutside
      title={t('wallet:cash_out_details')}
      show={show}
      handleClose={handleClose}
      isMobile={true}
      isNotSave={true}
    >
      <div className={classes.container}>
        <div
          className={clsx(
            classes.card,
            classes.flexBox,
            classes.column,
            classes.center,
            classes.bgFFF,
            classes.mb10
          )}
        >
          <p className={`${classes.total} ${classes.mr0}`}>
            - ${transaction?.total || '0.00'}
          </p>
          <p
            className={`${classes.mr0} ${classes.primaryColor} ${classes.fz15}`}
          >
            {t('wallet:cash_out')}{' '}
            {transaction?.status === 'pending'
              ? t('wallet:in_progress')
              : t('wallet:successful')}
          </p>
        </div>
        <div className={clsx(classes.mb10, classes.bgFFF)}>
          <div className={clsx(classes.cardItem, classes.borderBottom)}>
            <p className={clsx(classes.mr0, classes.w500, classes.mb5)}>
              {t('wallet:cash_out_from_to', {
                from: transaction?.from || '[N/A]',
              })}
            </p>
            <p className={clsx(classes.mr0, classes.fz14, classes.flexBox)}>
              <img
                src="/images/philipinbank.svg"
                alt=""
                className={classes.img}
              />{' '}
              Union Bank of the Philippines (UnionBank)
            </p>
          </div>
          <div
            className={clsx(
              classes.cardItem,
              classes.borderBottom,
              classes.flexBox,
              classes.spaceBetween
            )}
          >
            <p className={clsx(classes.mr0, classes.w500)}>
              {t('wallet:cash_out_fee')}
            </p>
            <p className={clsx(classes.mr0, classes.fz15)}>
              ${transaction?.fee || '0.00'}
            </p>
          </div>
          <div
            className={clsx(
              classes.cardItem,
              classes.borderBottom,
              classes.flexBox,
              classes.spaceBetween
            )}
          >
            <p className={clsx(classes.mr0, classes.w500)}>
              {t('wallet:total_amount_cashed_out')}
            </p>
            <p className={clsx(classes.mr0, classes.fz15)}>
              ${transaction?.total || '0.00'}
            </p>
          </div>
        </div>
        <div className={clsx(classes.mb10, classes.bgFFF)}>
          <div
            className={clsx(
              classes.cardItem,
              classes.borderBottom,
              classes.flexBox,
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
              classes.borderBottom,
              classes.flexBox,
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
              classes.borderBottom,
              classes.bgf456,
              classes.fx13
            )}
          >
            {t('wallet:withdrawal_info')}
          </p>
          <div
            className={clsx(
              classes.cardItem,
              classes.borderBottom,
              classes.flexBox,
              classes.spaceBetween
            )}
          >
            <p className={clsx(classes.mr0, classes.w500)}>
              {t('wallet:wallet_transaction')}
            </p>
            <p className={clsx(classes.mr0, classes.fz15)}>
              -${transaction?.total || '0.00'}
            </p>
          </div>
        </div>
        <div className={clsx(classes.flexBox, classes.center)}>
          <Button
            classes={clsx(classes.btnBackground)}
            text="OK"
            onClick={handleClose}
          />
        </div>
      </div>
    </SideBarOutside>
  );
}

export default CashOutDetail;
