import React from 'react';
import Modal from '@Components/modals';

import { useStyles } from './styles';
import { Button } from '@Components/buttons';

interface Props {
  open: boolean;
  onClose: () => void;
  t(key: string, format?: object): string;
  className?: string;
}

export default function PurchaseModal(props) {
  const classes = useStyles();

  const { open, onClose, t, className } = props;
  return (
    <Modal open={open} handleClose={onClose}>
      <div className={classes.container}>
        <p>{t('wallet:redeem_my_point')}</p>
        <div className={`${classes.card} ${className}`}></div>
        <p className={classes.itemName}>You Earned Free Points!</p>
        <div className={`${classes.flexBox} ${classes.cointLine}`}>
          <img src="./images/coin-points.svg" alt="" />
          <p className={`${classes.flexBox} ${classes.coin}`}>{123}</p>{' '}
        </div>
        <Button
          classes={classes.btnBackground}
          text={t('wallet:purchase_with', { point: 1000 })}
          onClick={() => {}}
        />
      </div>
    </Modal>
  );
}
