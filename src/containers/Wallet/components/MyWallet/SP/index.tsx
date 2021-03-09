import React, { memo, useEffect, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SettingsIcon from '@material-ui/icons/Settings';
import Router from 'next/router';

// component
import { CashInIcon, CashOutIcon } from '@Components/Icon';
import { getTransactionDetailRequest } from '@Containers/Wallet/store/actions';
import { makeSelectTransaction } from '@Containers/Wallet/store/selectors';
import { Button } from '@Components/buttons';
import TransactionCard from '../TransactionCard';
import TransacrtionCardSkeleton from '../TransactionCardSkeleton';
import Transaction from './Transactions';
import CashOutDetail from './CashoutDetail';
import PaymentDetail from './paymentDetail';

// styles
import { useStyles } from './styles';

// interface
interface IT {
  t(key: string, format?: object): string;
}
interface Props {
  t(key: string, format?: object): string;
  getTransactionDetailRequest: () => void;
  transaction: {
    transactionIds: number[];
    transactions: object;
    isRequestTransaction: boolean;
  };
}

// constant
const ROW_PER_PAGE = 5;

// component Wallet
function MyWalletSP(props: Props) {
  const classes = useStyles();

  const { t, getTransactionDetailRequest, transaction } = props;
  const { transactionIds = [], transactions = {} } = transaction;

  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    getTransactionDetailRequest();
  }, []);

  const onBack = () => Router.back();

  const onGetMore = () => {
    setIsLoadMore(true);
    setTimeout(() => {
      setPage(page + 1);
      setIsLoadMore(false);
    }, 3000);
  };

  const onSeeMore = () => setIsSeeMore(true);
  const onCloseSeeMore = () => setIsSeeMore(false);
  const onSelectedId = id => {
    setSelectedId(id);
  };
  const onCloseDetail = () => setSelectedId('');

  const rowPerPage = transactionIds.slice(0, page * ROW_PER_PAGE);

  return (
    <div className={classes.container}>
      <div className={`${classes.header}`}>
        <div
          className={`${classes.nav} ${classes.flexBox} ${classes.spaceBetween}`}
        >
          <p
            className={`${classes.title} ${classes.flexBox} ${classes.mr0}`}
            onClick={onBack}
          >
            <ArrowBackIosIcon className={classes.backIcon} />
            {t('wallet:my_wallet')}
          </p>
          <SettingsIcon className={classes.settingIcon} />
        </div>
        <div
          className={`${classes.contentHeader} ${classes.flexBox} ${classes.center}`}
        >
          <div className={`${classes.direction} ${classes.flexBox}`}>
            <p
              className={`${classes.contentTitle} ${classes.mr0} ${classes.mb10}`}
            >
              {t('wallet:my_balance_wallet')}
            </p>
            <div className={`${classes.flexBox} ${classes.mb10}`}>
              <p className={`${classes.mr0} ${classes.point}`}>$ {0}</p>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.footer}>
              <div className={classes.cash}>
                <CashInIcon />
                <p>{t('wallet:cash_in')}</p>
              </div>
              <div className={classes.cash}>
                <CashOutIcon />
                <p>{t('wallet:cash_out')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.mt70}>
        <div
          className={`${classes.titleCard} ${classes.flexBox} ${classes.spaceBetween}`}
        >
          <p className={classes.mr0}>{t('wallet:transaction_history')}</p>
          <p
            className={`${classes.mr0} ${classes.blueLight}`}
            onClick={onSeeMore}
          >
            {t('wallet:see_more')}
          </p>
        </div>
        <div>
          {rowPerPage.map(id => (
            <TransactionCard
              transaction={transactions[id]}
              key={id}
              t={t}
              onSelectedId={onSelectedId}
            />
          ))}
        </div>
        {isLoadMore &&
          new Array(10)
            .fill(0)
            .map((i, index) => (
              <TransacrtionCardSkeleton
                key={index}
                onSelectedId={onSelectedId}
              />
            ))}
        <Button
          classes={classes.btnBackground}
          text={t('wallet:more_transaction_history')}
          onClick={onGetMore}
          isLoading={isLoadMore}
          disabled={isLoadMore || rowPerPage.length === transactionIds.length}
        />
      </div>
      <Transaction
        t={t}
        onClose={onCloseSeeMore}
        show={isSeeMore}
        transactionIds={transactionIds}
        transactions={transactions}
      />
      <CashOutDetail
        show={transactions[selectedId]?.paymentType === 'cash_out'}
        t={t}
        onClose={onCloseDetail}
        transaction={transactions[selectedId]}
        type="cash_out"
      />
      <PaymentDetail
        show={transactions[selectedId]?.paymentType === 'payment'}
        t={t}
        onClose={onCloseDetail}
        transaction={transactions[selectedId]}
      />
      <CashOutDetail
        show={transactions[selectedId]?.paymentType === 'cash_in'}
        t={t}
        onClose={onCloseDetail}
        transaction={transactions[selectedId]}
        type="cash_in"
      />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  transaction: makeSelectTransaction(),
});

const mapDisPatchToProps = dispatch => {
  return {
    getTransactionDetailRequest: () => dispatch(getTransactionDetailRequest()),
  };
};

const withConnect = connect(mapStateToProps, mapDisPatchToProps);
export default compose(withConnect, memo)(MyWalletSP) as React.ComponentType<
  IT
>;

// export default MyWalletSP;