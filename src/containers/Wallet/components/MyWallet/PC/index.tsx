import React, { memo, useEffect, useState } from 'react';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { useRouter } from 'next/router';

// component
import SettingsIcon from '@material-ui/icons/Settings';
import { CashInIcon, CashOutIcon } from '@Components/Icon';
import {
  getTransactionDetailRequest,
  setHiddenHeader,
} from '@Containers/Wallet/store/actions';
import { makeSelectTransaction } from '@Containers/Wallet/store/selectors';
import { Button } from '@Components/buttons';
import TransactionCard from '../TransactionCard';
import TransacrtionCardSkeleton from '../TransactionCardSkeleton';
import SelectOption from '@Components/selections';
import DateTimePicker from '@Components/DateTimePicker';

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
  setHiddenHeader: (type: string) => void;
}

// component Wallet
function MyWallet(props: Props) {
  const classes = useStyles();

  const { t, getTransactionDetailRequest, transaction } = props;
  const { transactionIds = [], transactions = {} } = transaction;
  const routes = useRouter();

  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });
  // const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    getTransactionDetailRequest();
  }, [getTransactionDetailRequest]);

  const onGetMore = () => {
    setIsLoadMore(true);
    setTimeout(() => {
      setPage(page + 1);
      setIsLoadMore(false);
    }, 3000);
  };

  const onChangeDateTime = obj => {
    setDateTime(obj);
  };

  const onSelectedId = (id: number, paymentType: string) => {
    routes.push(routes.route + `/${id}/${paymentType}`);
    // setHiddenHeader('hidden');
  };
  const onCashIn = () => routes.push(routes.route + '/cash-in');
  const onCashOut = () => routes.push(routes.route + '/cash-out');

  const rowPerPage = transactionIds.slice(0, page * 10);

  return (
    <div>
      <div className={classes.container}>
        <div className={`${classes.header} ${classes.paddingContainer}`}>
          <p className={`${classes.title} ${classes.flexBox}`}>
            <AccountBalanceWalletIcon style={{ width: 19.7, height: 19.7 }} />
            {t('wallet:my_wallet')}
          </p>
          <SettingsIcon className={classes.settingIcon} />
          <div
            className={`${classes.contentHeader} ${classes.flexBox} ${classes.spaceBetween}`}
          >
            <div
              className={`${classes.item} ${classes.direction} ${classes.flexBox}`}
            >
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
                <div className={classes.cash} onClick={onCashIn}>
                  <CashInIcon />
                  <p>{t('wallet:cash_in')}</p>
                </div>
                <div className={classes.cash} onClick={onCashOut}>
                  <CashOutIcon />
                  <p>{t('wallet:cash_out')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${classes.content} ${classes.paddingContainer}`}>
          <div className={classes.titleCard}>
            {t('wallet:transaction_history')}
          </div>
          <div
            className={`${classes.flex} ${classes.spaceBetween} ${classes.pd20}`}
          >
            <div className={classes.selection}>
              <SelectOption
                options={[]}
                label="Select Transaction"
                value={0}
                onChangeOption={() => {}}
              />
            </div>
            <div className={classes.selection}>
              <DateTimePicker
                isMobile={false}
                dateTime={dateTime}
                onChange={onChangeDateTime}
                isHistory={true}
              />
            </div>
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
              .map((i, index) => <TransacrtionCardSkeleton key={index} />)}
          <Button
            classes={classes.btnBackground}
            text={t('wallet:more_transaction_history')}
            onClick={onGetMore}
            isLoading={isLoadMore}
            disabled={isLoadMore || rowPerPage.length === transactionIds.length}
          />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  transaction: makeSelectTransaction(),
});

const mapDisPatchToProps = dispatch => {
  return {
    getTransactionDetailRequest: () => dispatch(getTransactionDetailRequest()),
    setHiddenHeader: (type: string) => dispatch(setHiddenHeader(type)),
  };
};

const withConnect = connect(mapStateToProps, mapDisPatchToProps);
export default compose(withConnect, memo)(MyWallet) as React.ComponentType<IT>;

// export default MyWallet;
