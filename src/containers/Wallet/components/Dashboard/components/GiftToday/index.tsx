import React, { useState } from 'react';
import { AiOutlineGift, AiOutlinePlayCircle } from 'react-icons/ai';
import AdvModal from '../ADVModal';

import Card from '../Card';

import { useStyles } from './styles';
interface Props {
  t(key: string): string;
}

export default function GiftToday(props: Props) {
  const classes = useStyles();

  const { t } = props;
  const [isAdv, setIsAdv] = useState(false);

  const onShowAdv = () => {
    setIsAdv(true);
    setTimeout(() => {
      setIsAdv(false);
    }, 3000);
  };
  const onCloseAdv = () => setIsAdv(false);

  return (
    <Card t={t} className={classes.background}>
      <div className={classes.content} onClick={onShowAdv}>
        <AiOutlineGift className={classes.icon} />
        <div className={classes.subText}>
          <AiOutlinePlayCircle className={classes.playIcon} />
          {t('wallet:claim_gift')}
        </div>
        {isAdv && <AdvModal open={isAdv} onClose={onCloseAdv} />}
      </div>
    </Card>
  );
}
