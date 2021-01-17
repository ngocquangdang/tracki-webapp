import React from 'react';
import Modal from '@Components/modals';

import { useStyles } from './styles';
import { Button } from '@Components/buttons';

interface Props {
  open: boolean;
  onClose: () => void;
  t(key: string, format?: object): string;
  className?: string;
  name: string;
  img?: string;
  isImg?: boolean;
  point: string | number;
  type?: string;
  sms_limit?: number | string;
}

export default function PurchaseModal(props: Props) {
  const classes = useStyles();

  const {
    open,
    onClose,
    t,
    className,
    name,
    isImg = false,
    img,
    point,
    type,
    sms_limit,
  } = props;
  return (
    <Modal open={open} handleClose={onClose}>
      <div className={classes.container}>
        <p className={classes.title}>{t('wallet:redeem_my_point')}</p>
        <div className={`${classes.card} ${className}`}>
          {isImg && <img src={img} alt="" className={classes.img} />}
          {type === 'subscription' && (
            <>
              <p className={classes.planName}>{name}</p>
              <p className={classes.caption}>
                {t('wallet:subscription_plan', { price: point })}
              </p>{' '}
              <p className={`${classes.mr0} ${classes.subTitle}`}>
                {t('wallet:subscription_for')}
              </p>
              <p className={classes.mr0}>{name}</p>
            </>
          )}
          {type === 'sms' && (
            <>
              <p className={`${classes.smsTitle} ${classes.mr0}`}>
                {sms_limit} SMS
              </p>
              <p className={`${classes.smsPlan} ${classes.mr0}`}>{name}</p>
              <p className={`${classes.smsPrice} ${classes.mr0}`}>
                {t(`wallet:sms_plan_price`, { price: point })}
              </p>
            </>
          )}
        </div>
        <p className={classes.itemName}>
          {!type && name}
          {type === 'sms' && `${sms_limit} SMS Plan - ${name}`}{' '}
          {type === 'subscription' && `${name} - Subscription`}
        </p>
        <div className={`${classes.flexBox} ${classes.cointLine}`}>
          <img src="./images/coin-points.svg" alt="" />
          <p className={`${classes.flexBox} ${classes.coin}`}>{point}</p>{' '}
        </div>
        <Button
          classes={classes.btnBackground}
          text={t('wallet:purchase_with', { point })}
          onClick={() => {}}
        />
      </div>
    </Modal>
  );
}
