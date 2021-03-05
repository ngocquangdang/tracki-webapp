import React from 'react';

import Modal from '@Components/modals';
import { ListItem } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';

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
          <div>xxx</div>
        </ListItem>
        <ListItem
          button
          className={clsx(
            classes.border,
            classes.itemStyle,
            classes.spaceBetween
          )}
        >
          <div>xxx</div>
          <CheckCircleIcon className={classes.colorActive} />
        </ListItem>
        <ListItem
          button
          className={clsx(classes.border, classes.itemStyle, classes.flex)}
        >
          <AddIcon /> {t('wallet:add_new_payment_method')}
        </ListItem>
      </div>
    </Modal>
  );
}

export default PaymentModal;
