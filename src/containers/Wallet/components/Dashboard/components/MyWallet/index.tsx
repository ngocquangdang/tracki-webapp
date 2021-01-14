import React from 'react';
import { WalletDataType } from '@Interfaces';

import Card from '../Card';
import { useStyles } from './styles';

interface Props {
  myWallet: WalletDataType;
  t(key: string, format?: object): string;
}

export default function MyWallet(props: Props) {
  const classes = useStyles();

  const { t, myWallet } = props;
  const { point = 0, my_wallet = 0 } = myWallet;

  return (
    <Card isFooter={true} footer={<FooterCard t={t} />} t={t}>
      <div className={classes.content}>
        <div className={classes.item}>
          <p className={classes.title}>{t('wallet:my_points')}</p>
          <div className={classes.flexBox}>
            <img
              src="./images/coin-points.svg"
              alt=""
              className={classes.bigCoin}
            />
            <p>{point}</p>
          </div>
          <p className={classes.point}>$ 10.00</p>
        </div>
        <div className={classes.item}>
          <p>{t('wallet:my_wallets')}</p>
          <p className={classes.money}> ${my_wallet}</p>
          <p className={classes.cast}>
            {t('wallet:cash_out')} {'>'}{' '}
          </p>
        </div>
      </div>
    </Card>
  );
}

function FooterCard(props: any) {
  const classes = useStyles();

  const { t } = props;

  return (
    <div className={classes.footer}>
      <img
        src="./images/coin-points.svg"
        alt=""
        className={classes.normalCoin}
      />
      {t('wallet:redeem_my_poin')}

      <img src="./images/money.svg" alt="" className={classes.moneyIcon} />
    </div>
  );
}
