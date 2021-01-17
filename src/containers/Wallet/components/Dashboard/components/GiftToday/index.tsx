import React from 'react';
import { AiOutlineGift, AiOutlinePlayCircle } from 'react-icons/ai';

import Card from '../Card';

import { useStyles } from './styles';
interface Props {
  t(key: string): string;
}

export default function GiftToday(props: Props) {
  const classes = useStyles();

  const { t } = props;
  return (
    <Card t={t} className={classes.background}>
      <div className={classes.content}>
        <AiOutlineGift className={classes.icon} />
        <div className={classes.subText}>
          <AiOutlinePlayCircle className={classes.playIcon} />
          {t('wallet:claim_gift')}
        </div>
      </div>
    </Card>
  );
}
