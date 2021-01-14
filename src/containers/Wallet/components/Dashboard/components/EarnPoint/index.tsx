import { Button } from '@Components/buttons';
import { WalletDataType } from '@Interfaces';
import React from 'react';

import Card from '../Card';
import { useStyles } from './styles';

interface Props {
  t(key: string, format?: object): string;
  adv: WalletDataType;
}

export default function EarnPoint(props: Props) {
  const classes = useStyles();

  const { t, adv } = props;
  const { advs = {}, advIds = [] } = adv;
  return (
    <Card t={t} isHeader={true} title={t('wallet:earn_points')}>
      <>
        {advIds.map(id => (
          <div className={classes.card} key={id}>
            <div>
              <p className={classes.title}>{advs[id].adv_name}</p>
              <div className={`${classes.flexBox} ${classes.cointLine}`}>
                <img src="./images/coin-points.svg" alt="" />
                <p className={`${classes.flexBox} ${classes.coin}`}>
                  {advs[id].point}
                </p>{' '}
                {t('wallet:points')}
              </div>
            </div>
            <Button
              classes={classes.btnBackground}
              text={
                advs[id].type === 'share' ? t('wallet:share') : t('wallet:go')
              }
            />
          </div>
        ))}
      </>
    </Card>
  );
}
