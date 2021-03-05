import React from 'react';
import { MainLayout } from '@Layouts';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import moment from 'moment';

// component
import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';

// style
import { useStyles } from './styles';
import { Button } from '@Components/buttons';

// interface
interface Props {
  isMobile: boolean;
  t(key: string, format?: object);
  transaction: any;
}

function CashInOutDetail(props: Props) {
  const classes = useStyles();

  const { isMobile, t, transaction = {} } = props;
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <MainLayout isMobile={isMobile} hasFooter={false}>
      <DetailPageContainer
        title={t('wallet:cash_out_details')}
        onClick={onBack}
        isBorder
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
            <p
              className={`${classes.total} ${classes.mr0} ${
                router.route.includes('cash_in') && classes.primaryColor
              }`}
            >
              {router.route.includes('cash_in') ? '+' : '-'}$
              {transaction?.total || '0.00'}
            </p>
            <p
              className={`${classes.mr0} ${classes.primaryColor} ${classes.fz15}`}
            >
              {router.route.includes('cash_out')
                ? `${t('wallet:cash_out')} 
                ${
                  transaction?.status === 'pending'
                    ? t('wallet:in_progress')
                    : t('wallet:successful')
                }`
                : t('wallet:add_to_your_wallet')}
            </p>
          </div>
          <div className={clsx(classes.mb10, classes.bgFFF)}>
            <div className={clsx(classes.cardItem, classes.borderBottom)}>
              <p className={clsx(classes.mr0, classes.w500, classes.mb5)}>
                {router.route.includes('cash_out')
                  ? t('wallet:cash_out_from_to', {
                      from: transaction?.from || '[N/A]',
                    })
                  : t('wallet:cash_in_from')}
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
            {router.route.includes('cash_out') && (
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
            )}

            <div
              className={clsx(
                classes.cardItem,
                classes.borderBottom,
                classes.flexBox,
                classes.spaceBetween
              )}
            >
              <p className={clsx(classes.mr0, classes.w500)}>
                {router.route.includes('cash_out')
                  ? t('wallet:total_amount_cashed_out')
                  : t('wallet:total_amount_cashed_in')}
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
              <p className={clsx(classes.mr0, classes.fz15)}>
                {transaction?.id}
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
                classes.flexBox,
                classes.spaceBetween
              )}
            >
              <p className={clsx(classes.mr0, classes.w500)}>
                {t('wallet:wallet_transaction')}
              </p>
              <p className={clsx(classes.mr0, classes.fz15)}>
                {router.route.includes('cash_in') ? '+' : '-'} $
                {transaction?.total || '0.00'}
              </p>
            </div>
          </div>
          <div className={clsx(classes.flexBox, classes.center)}>
            <Button
              classes={clsx(classes.btnBackground)}
              text="OK"
              onClick={onBack}
            />
          </div>
        </div>
      </DetailPageContainer>
    </MainLayout>
  );
}
export default CashInOutDetail;
