import React from 'react';
import Modal from '@Components/modals';
import { Button } from '@Components/buttons';

import { useStyles } from './styles';

interface Props {
  open: boolean;
  onClose: () => void;
  t(key: string, format?: object): string;
  point?: string | number;
}

export default function ClaimPointModal(props) {
  const classes = useStyles();

  const { open, onClose, t, point } = props;
  return (
    <Modal open={open} handleClose={onClose}>
      <>
        <p className={`${classes.title} ${classes.mr0}`}>
          {t('wallet:congratulations')}
        </p>
        <p className={`${classes.subTitle}`}>{t('wallet:you_have_received')}</p>
        <div className={`${classes.flexBox} ${classes.cointLine}`}>
          <img src="/images/coin-points.svg" alt="" className={classes.img} />
          <p className={`${classes.flexBox} ${classes.coin}`}>{point}</p>{' '}
          {t('wallet:points')}
        </div>
        <Button
          classes={classes.btnBackground}
          text={t('wallet:claim_points')}
          onClick={onClose}
        />
      </>
    </Modal>
  );
}
