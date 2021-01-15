import { Button } from '@Components/buttons';
import React from 'react';
import Card from '../Card';

import { useStyles, Coin, Day } from './styles';

interface Props {
  t(key: string, format?: object): string;
  myWallet: {
    point?: number | string;
    my_wallet?: number | string;
  };
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
  const { t } = props;

  return (
    <Card className={classes.background} t={t} isPadding={true}>
      <div className={classes.content}>
        <div className={classes.title}>{t('wallet:login_everyday')}</div>
        <div className={classes.step}>
          {ClaimDate.map(item => (
            <Day key={item.day}>
              <Coin isClaimed={item.status === 'claimed'}>
                <img src="./images/coin.svg" alt="" />
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
          />
        </div>
      </div>
    </Card>
  );
}
