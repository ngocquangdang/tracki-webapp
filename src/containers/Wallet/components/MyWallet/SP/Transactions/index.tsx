import React, { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

//component
import { SideBarOutside } from '@Components/sidebars';
import SelectOption from '@Components/selections';
import DateTimePicker from '@Components/DateTimePicker';
import TransactionCard from '../../TransactionCard';

// style
import { useStyles } from './styles';
// import CashOutDetail from '../CashoutDetail';
// import PaymentDetail from '../paymentDetail';

// interface
interface Props {
  t(key: string, format?: object): string;
  onClose: () => void;
  show: boolean;
  transactionIds: number[];
  transactions: object;
}

// Transaction Component
function Transaction(props: Props) {
  const classes = useStyles();
  const routes = useRouter();

  const { t, show, transactionIds = [], transactions = {} } = props;
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const getTransactionIspending = transactionIds.filter(
    (i: number) => transactions[i].status === 'pending'
  );

  const getTransactionCompleted = transactionIds.filter(
    (i: number) => transactions[i].status === 'completed'
  );

  const handleClose = () => {
    routes.back();
  };

  const onChangeDateTime = obj => {
    setDateTime(obj);
  };

  const onSelectedId = (id: number, paymentType: string) => {
    routes.push(routes.route + `/${id}/${paymentType}`);
  };

  return (
    <>
      <SideBarOutside
        title={t('wallet:transaction_history')}
        show={show}
        handleClose={handleClose}
        isMobile={true}
        isNotSave={true}
      >
        <div className={classes.container}>
          <div
            className={`${classes.flex} ${classes.spaceBetween} ${classes.pd20}`}
          >
            <div className={classes.selection}>
              <SelectOption
                t={t}
                options={[]}
                label="Select Transaction"
                value={0}
                onChangeOption={() => {}}
              />
            </div>
            <div className={classes.selection}>
              <DateTimePicker
                t={t}
                isMobile={false}
                dateTime={dateTime}
                onChange={onChangeDateTime}
                isHistory={true}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={`${classes.titleCard} ${classes.flexBox}`}>
            <p className={classes.mr0}>{t('wallet:in_progress')}</p>
          </div>
          <div>
            {getTransactionIspending.map(id => (
              <TransactionCard
                transaction={transactions[id]}
                key={id}
                t={t}
                onSelectedId={onSelectedId}
              />
            ))}
          </div>
        </div>
        <div>
          <div className={`${classes.titleCard} ${classes.flexBox}`}>
            <p className={classes.mr0}>{t('wallet:completed')}</p>
          </div>
          <div>
            {getTransactionCompleted.map(id => (
              <TransactionCard
                transaction={transactions[id]}
                key={id}
                t={t}
                onSelectedId={onSelectedId}
              />
            ))}
          </div>
        </div>
      </SideBarOutside>
    </>
  );
}

export default Transaction;
