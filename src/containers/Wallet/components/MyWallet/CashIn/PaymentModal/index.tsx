import React from 'react';

import Modal from '@Components/modals';
import { ListItem } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';

import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface Props {
  open: boolean;
  closeModal: () => void;
  t(key: string, format?: object);
}

function PaymentModal(props) {
  const classes = useStyles();

  const { open, closeModal, t } = props;

  return (
    <Modal
      title={t('wallet:select_payment_method')}
      open={open}
      handleClose={closeModal}
    >
      <div className={classes.container}>
        <ListItem
          button
          className={clsx(
            classes.border,
            classes.itemStyle,
            classes.spaceBetween
          )}
        >
          <div className={classes.flex}>
            <img
              src="/images/philipinbank.svg"
              alt=""
              className={clsx(classes.img, classes.mrr15)}
            />
            xxx
          </div>
        </ListItem>
        <ListItem
          button
          className={clsx(
            classes.border,
            classes.itemStyle,
            classes.spaceBetween
          )}
        >
          <div className={classes.flex}>
            <img
              src="/images/paypal.png"
              alt=""
              className={clsx(classes.img, classes.mrr15)}
            />
            xxx
          </div>
          <CheckCircleIcon className={classes.colorActive} />
        </ListItem>
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
          />
        </div>
      </div>
    </Modal>
  );
}

export default PaymentModal;
