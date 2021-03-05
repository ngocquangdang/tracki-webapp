import React, { useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useRouter } from 'next/router';

// component
import { Button } from '@Components/buttons';
import TransactionInfo from '../TransactionInfoPC';
import { MainLayout } from '@Layouts';
import DetailPageContainer from '@Containers/Wallet/components/DetailPageContainer';

//style
import { useStyles } from './styles';

//interface
interface Props {
  t(key: string, format?: object): string;
  onClose: () => void;
  show: boolean;
  transaction: any;
}

function PaymentDetail(props: Props) {
  const classes = useStyles();
  const routes = useRouter();

  const { t, transaction } = props;
  const [isTransactioninfo, setIsTransactionInfo] = useState(false);

  const handleClose = () => routes.back();

  const onCloseTransaction = () => setIsTransactionInfo(false);
  const onTransactionInfo = () => setIsTransactionInfo(true);

  return (
    <>
      <MainLayout hasFooter={false}>
        <DetailPageContainer
          title={t('wallet:payment_successfull')}
          onClick={handleClose}
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
              <p className={`${classes.total} ${classes.mr0}`}>
                - ${transaction?.total || '0.00'}
              </p>
              <p
                className={`${classes.mr0} ${classes.primaryColor} ${classes.fz15}`}
              >
                {t('wallet:payment_successfull')}
              </p>
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
                  {t('wallet:paid_to')}
                </p>
                <p className={clsx(classes.mr0, classes.w500)}>
                  {transaction?.to || '[N/A]'}
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
                  {t('wallet:reference_id')}
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
                  {moment(transaction?.updatedAt * 1000).format('LLL') ||
                    '[N/A]'}
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
                {t('wallet:payment_infomation')}
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
                {t('wallet:transaction_info')}
              </p>
              <div
                className={clsx(
                  classes.cardItem,
                  classes.borderBottom,
                  classes.flexBox,
                  classes.spaceBetween
                )}
                onClick={onTransactionInfo}
              >
                <p className={clsx(classes.mr0, classes.fz14)}>product name</p>
                <ArrowForwardIosIcon
                  className={clsx(classes.icon, classes.fz15)}
                />
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
        </DetailPageContainer>
      </MainLayout>
      <TransactionInfo
        show={isTransactioninfo}
        onClose={onCloseTransaction}
        transaction={transaction}
        t={t}
      />
    </>
  );
}

export default PaymentDetail;
