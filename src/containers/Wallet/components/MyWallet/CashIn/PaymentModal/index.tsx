import React, { useState } from 'react';

import { ListItem } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';

import Modal from '@Components/modals';
import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface IProps {
  open: boolean;
  closeModal: () => void;
  t(key: string, format?: object): string;
  listPayment: {
    urlImg: string;
    name: string;
  }[];
  onConfirmPayment: (value: object) => () => void;
  paymentCash: {
    urlImg: string;
    name: string;
  };
}

function PaymentModal(props: IProps) {
  const classes = useStyles();
  const { open, closeModal, t, listPayment, onConfirmPayment, paymentCash } =
    props;

  const [payment, setPayment] = useState(paymentCash);

  const onSelectPayment = value => () => {
    setPayment(value);
  };

  const onClickConfirm = () => {
    onConfirmPayment(payment)();
    closeModal();
  };

  return (
    <Modal
      title={t('wallet:select_payment_method')}
      open={open}
      handleClose={closeModal}
    >
      <div className={classes.container}>
        {listPayment &&
          listPayment.map(item => (
            <ListItem
              key={item.name}
              button
              className={clsx(
                classes.border,
                classes.itemStyle,
                classes.spaceBetween
              )}
              onClick={onSelectPayment(item)}
            >
              <div className={classes.flex}>
                <img
                  src={item.urlImg}
                  alt=""
                  className={clsx(classes.img, classes.mrr15)}
                />
                {item.name}
              </div>
              {payment.name === item.name && (
                <CheckCircleIcon className={classes.colorActive} />
              )}
            </ListItem>
          ))}
        <ListItem
          button
          className={clsx(classes.border, classes.itemStyle, classes.flex)}
        >
          <AddIcon className={clsx(classes.img, classes.mrr15)} />{' '}
          {t('wallet:add_new_payment_method')}
        </ListItem>
        <div className={classes.btn}>
          <Button
            text={t('wallet:confirm')}
            color="primary"
            fullWidth
            variant="contained"
            onClick={onClickConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}

export default PaymentModal;
