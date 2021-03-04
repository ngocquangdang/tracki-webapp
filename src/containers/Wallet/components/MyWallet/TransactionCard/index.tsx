import React from 'react';
import moment from 'moment';

// style
import { ListItemStyle, useStyles } from './styles';

//interface
interface Props {
  onSelectedId?: (id: number, paymentType: string) => void;
  t(key: string, format?: object): string;
  transaction: {
    paymentType: string;
    to?: string;
    id: number;
    from?: string;
    status?: string;
    total?: string;
    updatedAt: number;
  };
}

function TransactionCard(props: Props) {
  const classes = useStyles();

  const { transaction, t, onSelectedId } = props;

  const handleSelectedId = (id: number, paymentType: string) => () => {
    onSelectedId && onSelectedId(id, paymentType);
    return;
  };

  return (
    <ListItemStyle button>
      <div
        className={classes.item}
        onClick={handleSelectedId(transaction.id, transaction.paymentType)}
      >
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
