import React from 'react';
import moment from 'moment';

import { ListItemStyle, useStyles } from './styles';

function TransactionCard(props) {
  const classes = useStyles();

  const { transaction, t } = props;

  return (
    <ListItemStyle button>
      <div className={classes.item}>
        <div>
          <p className={`${classes.title} ${classes.mr0} ${classes.mb5}`}>
            {transaction.paymentType}
          </p>
          {transaction.paymentType === 'payment' && (
            <p className={`${classes.sender} ${classes.mr0} ${classes.mb5}`}>
              To {transaction.to}
            </p>
          )}
          {transaction.paymentType === 'cash_out' && (
            <p className={`${classes.sender} ${classes.mr0} ${classes.mb5}`}>
              {t('wallet:to')} Acc: ({transaction.to})
            </p>
          )}
          {transaction.paymentType === 'cash_in' && (
            <p className={`${classes.sender} ${classes.mr0} ${classes.mb5}`}>
              {t('wallet:from')} {transaction.from}
            </p>
          )}
          <p className={`${classes.sender} ${classes.mr0}`}>
            {moment(transaction.updatedAt * 1000).format('MM-DD-YYYY')}
          </p>
        </div>
        <div className={classes.textEnd}>
          {(transaction.paymentType === 'payment' ||
            transaction.paymentType === 'cash_out') && (
            <p className={`${classes.cashOut} ${classes.mr0} ${classes.mb5}`}>
              - ${transaction.total}
            </p>
          )}
          {transaction.paymentType === 'cash_in' && (
            <p className={`${classes.cashIn} ${classes.mr0}`}>
              + ${transaction.total}
            </p>
          )}
          <p
            className={`${classes.status} ${
              transaction.status === 'pending' && classes.pending
            } ${classes.mr0} `}
          >
            {transaction.status === 'pending'
              ? t('wallet:in_progress')
              : t('wallet:successfull')}
          </p>
        </div>
      </div>
    </ListItemStyle>
  );
}

export default TransactionCard;
