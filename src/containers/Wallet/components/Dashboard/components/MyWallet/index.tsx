import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Card from '../Card';
import { useStyles } from './styles';

interface Props {
  myWallet: {
    point?: number | string;
    my_wallet?: number | string;
  };
  t(key: string, format?: object): string;
  onChangeTab: (id: number) => void;
  isMobile?: boolean;
  setHiddenHeader: (type: boolean) => void;
}

export default function MyWallet(props: Props) {
  const classes = useStyles();

  const { t, myWallet, onChangeTab, isMobile, setHiddenHeader } = props;
  const { point = 0, my_wallet = 0 } = myWallet;

  // const [isMyPointDetail, setIsMypointDetail] = useState(false);

  const onMyWallet = () => onChangeTab(1);

  const onShowMyPoint = () => {
    setHiddenHeader(true);
  };

  // const onBackDetail = () => {
  //   setIsMypointDetail(false);
  //   setHiddenHeader(false);
  // };

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
              src="./images/tracki-device.png"
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
            <p className={classes.cast} onClick={onMyWallet}>
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
        src="./images/coin-points.svg"
        alt=""
        className={classes.normalCoin}
      />
      {t('wallet:redeem_my_poin')}
      <ChevronRightIcon />
      <img src="./images/money.svg" alt="" className={classes.moneyIcon} />
    </div>
  );
}
