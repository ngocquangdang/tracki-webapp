import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// component
import Card from '../Card';

// style
import { useStyles } from './styles';
import { firebaseLogEventRequest } from '@Utils/firebase';
import { useRouter } from 'next/router';

// interface
interface Props {
  myWallet: {
    point?: number | string;
    my_wallet?: number | string;
  };
  t(key: string, format?: object): string;
  onChangeTab: (id: number) => void;
  isMobile?: boolean;
}

export default function MyWallet(props: Props) {
  const classes = useStyles();
  const routes = useRouter();

  const { t, myWallet, isMobile } = props;
  const { point = 0, my_wallet = 0 } = myWallet;

  const onMyWallet = () => {
    routes.push('/wallet/my-wallet');
    firebaseLogEventRequest('dashboard_screen', 'select_my_wallet');
  };

  const onShowMyPoint = () => {
    routes.push('/wallet/my-point');
    firebaseLogEventRequest('dashboard_screen', 'select_my_point');
  };

  return (
    <Card
      isFooter={true}
      footer={<FooterCard t={t} />}
      t={t}
      isPadding={true}
      isMobile={isMobile}
    >
      <>
        {isMobile && (
          <div className={classes.userInfo}>
            <img
              src="static/images/tracki-device.png"
              alt=""
              className={classes.img}
            />
            <p className={classes.username}>Steve Rodgers</p>
          </div>
        )}
        <div className={classes.content}>
          <div className={classes.item} onClick={onShowMyPoint}>
            <p className={classes.title}>{t('wallet:my_points')}</p>
            <div className={classes.flexBox}>
              <img
                src="static/images/coin-points.svg"
                alt=""
                className={classes.bigCoin}
              />
              <p>{point}</p>
            </div>
            <p className={classes.point}>$ 10.00</p>
          </div>
          <div className={classes.item} onClick={onMyWallet}>
            <p className={classes.title}>{t('wallet:my_wallets')}</p>
            <p className={classes.money}> ${my_wallet}</p>
            <p className={classes.cast}>
              {t('wallet:cash_out')} {'>'}{' '}
            </p>
          </div>
        </div>
      </>
    </Card>
  );
}

function FooterCard(props: any) {
  const classes = useStyles();

  const { t } = props;

  return (
    <div className={classes.footer}>
      <img
        src="static/images/coin-points.svg"
        alt=""
        className={classes.normalCoin}
      />
      {t('wallet:redeem_my_poin')}
      <ChevronRightIcon />
      <img src="static/images/money.svg" alt="" className={classes.moneyIcon} />
    </div>
  );
}
