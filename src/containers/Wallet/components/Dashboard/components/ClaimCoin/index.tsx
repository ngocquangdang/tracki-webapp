import React, { useState } from 'react';

// component
import Card from '../Card';
import { Button } from '@Components/buttons';
import ClaimPointModal from '@Containers/Wallet/components/ClaimPointModal';

// styles
import { useStyles, Coin, Day } from './styles';
import { firebaseLogEventRequest } from '@Utils/firebase';

// interface
interface Props {
  t(key: string, format?: object): string;
  myWallet: {
    point?: number | string;
    my_wallet?: number | string;
  };
  isMobile?: boolean;
}

const ClaimDate = [
  { day: 'today', status: 'claimed', title: 'Today', coin: 15 },
  { day: 'day2', status: 'claimed', title: 'Day 2', coin: 20 },
  { day: 'day3', status: '', title: 'Day 3', coin: 35 },
  { day: 'day4', status: '', title: 'Day 4', coin: 50 },
  { day: 'day5', status: '', title: 'Day 5', coin: 80 },
  { day: 'day6', status: '', title: 'Day 6', coin: 100 },
  { day: 'day7', status: '', title: 'Day 7', coin: 200 },
];
export default function GiveCoin(props: Props) {
  const classes = useStyles();
  const { t, isMobile } = props;

  const [cointSelected, setCointSelected] = useState<number | string>('');

  const onGetCoint = () => {
    setCointSelected(ClaimDate[0].coin);
    firebaseLogEventRequest('dashboard_screen', 'claim_point');
  };

  const getCointSuccess = () => setCointSelected('');

  return (
    <Card
      className={classes.background}
      t={t}
      isPadding={true}
      isMobile={isMobile}
    >
      <div className={classes.content}>
        <div className={classes.title}>{t('wallet:login_everyday')}</div>
        <div className={classes.step}>
          {ClaimDate.map(item => (
            <Day key={item.day} isMobile={isMobile}>
              <Coin isClaimed={item.status === 'claimed'}>
                <img src="./images/coin.svg" alt="" className={classes.img} />
                <p className={classes.coinPoint}>{item.coin}</p>
              </Coin>
              <div
                className={`${classes.itemTitle} ${
                  item.status === 'claimed' && classes.claimed
                }`}
              >
                {item.title}
              </div>
            </Day>
          ))}
        </div>
        <div>
          <Button
            classes={classes.btnBackground}
            text={t('wallet:claim_point', { point: 15 })}
            onClick={onGetCoint}
          />
        </div>
        {cointSelected && (
          <ClaimPointModal
            t={t}
            open={!!cointSelected}
            onClose={getCointSuccess}
            point={cointSelected}
          />
        )}
      </div>
    </Card>
  );
}
