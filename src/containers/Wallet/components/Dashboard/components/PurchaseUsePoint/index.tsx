import React, { useState } from 'react';
import {
  TrackerIcon,
  SubscriptionIcon,
  PhoneIcon,
  Accessoricon,
} from '@Components/Icon';

import { useStyles } from './styles';
import Card from './Card';
import { Button } from '@Components/buttons';
import PurchaseModal from './PurchaseModal';

interface Props {
  t(key: string, format?: object): string;
  trackerProduct: {
    trackers: object;
    trackerIds: number[];
  };
  accesoryProduct: {
    accesories: object;
    accesoryIds: number[];
  };
  subscriptionPlan: object[];
  smsPlan: object[];
}

const OPTIONS = [
  { title: 'trackers', icon: <TrackerIcon /> },
  { title: 'accesories', icon: <Accessoricon /> },
  {
    title: 'subscription',
    icon: <SubscriptionIcon />,
  },
  { title: 'sms_plan', icon: <PhoneIcon /> },
];

function PurchaseUsePoint(props: Props) {
  const classes = useStyles();
  const {
    t,
    trackerProduct,
    accesoryProduct,
    subscriptionPlan,
    smsPlan,
  } = props;

  const [typeActive, setTypeActive] = useState(OPTIONS[0].title);

  const onActive = title => () => setTypeActive(title);

  return (
    <div className={classes.cardContainer}>
      <div className={classes.header}>
        <p className={classes.title}>{t('wallet:purchase_using_points')}</p>
        <p className={classes.viewMore}>{t('wallet:see_more')}</p>
      </div>
      <div className={classes.content}>
        <div className={classes.itemList}>
          {OPTIONS.map(item => (
            <div
              className={`${classes.item} ${
                typeActive === item.title && classes.isActive
              }`}
              onClick={onActive(item.title)}
              key={item.title}
            >
              {item.icon}
              <p className={classes.itemTitle}>{t(`wallet:${item.title}`)}</p>
            </div>
          ))}
        </div>
        {typeActive === 'trackers' && (
          <TrackerList trackerProduct={trackerProduct} t={t} />
        )}
        {typeActive === 'accesories' && (
          <AccesoryList accesoryProduct={accesoryProduct} t={t} />
        )}
        {typeActive === 'subscription' && (
          <SubsciptionPlan subscriptionPlan={subscriptionPlan} t={t} />
        )}
        {typeActive === 'sms_plan' && <SMSPlan smsPlan={smsPlan} t={t} />}
      </div>
    </div>
  );
}

function TrackerList(props) {
  const classes = useStyles();

  const { trackerProduct, t } = props;
  const { trackers = {}, trackerIds = [] } = trackerProduct;
  const [isOpen, setIsOpen] = useState('');

  const limittrackerId = trackerIds.slice(0, 6);

  const onSelectedId = id => () => setIsOpen(id);
  const onCloseModal = () => setIsOpen('');

  return (
    <div className={classes.cardList}>
      {limittrackerId.map(id => (
        <Card
          className={classes.cardItem}
          header={
            <img src={trackers[id].icon} alt="" className={classes.img} />
          }
          key={id}
        >
          <div>
            <p className={classes.titleCard}>{trackers[id].name}</p>
            <div className={`${classes.flexBox} ${classes.cointLine}`}>
              <img src="./images/coin-points.svg" alt="" />
              <p className={`${classes.flexBox} ${classes.coin}`}>
                {trackers[id].point}
              </p>{' '}
              <span className={classes.point}>{t('wallet:points')}</span>
            </div>
            <Button
              classes={classes.btnBackground}
              text={t('wallet:purchase')}
              onClick={onSelectedId(id)}
            />
          </div>
        </Card>
      ))}
      {!!isOpen && (
        <PurchaseModal
          open={!!isOpen}
          onClose={onCloseModal}
          t={t}
          name={trackers[isOpen].name}
          isImg={true}
          img={trackers[isOpen].icon}
          point={trackers[isOpen].point}
        />
      )}
    </div>
  );
}

function AccesoryList(props) {
  const classes = useStyles();

  const { accesoryProduct, t } = props;
  const { accesories = {}, accesoryIds = [] } = accesoryProduct;
  const [isOpen, setIsOpen] = useState('');

  const onSelectedId = id => () => setIsOpen(id);
  const onCloseModal = () => setIsOpen('');

  const limitAccesoryId = accesoryIds.slice(0, 6);
  return (
    <div className={classes.cardList}>
      {limitAccesoryId.map(id => (
        <Card
          className={classes.cardItem}
          header={
            <img src={accesories[id].icon} alt="" className={classes.img} />
          }
          key={id}
        >
          <div>
            <p className={classes.titleCard}>{accesories[id].name}</p>
            <div className={`${classes.flexBox} ${classes.cointLine}`}>
              <img src="./images/coin-points.svg" alt="" />
              <p className={`${classes.flexBox} ${classes.coin}`}>
                {accesories[id].point}
              </p>{' '}
              <span className={classes.point}>{t('wallet:points')}</span>
            </div>
            <Button
              classes={classes.btnBackground}
              text={t('wallet:purchase')}
              onClick={onSelectedId(id)}
            />
          </div>
        </Card>
      ))}
      {!!isOpen && (
        <PurchaseModal
          open={!!isOpen}
          onClose={onCloseModal}
          t={t}
          name={accesories[isOpen].name}
          isImg={true}
          img={accesories[isOpen].icon}
          point={accesories[isOpen].point}
        />
      )}
    </div>
  );
}

function SubsciptionPlan(props) {
  const classes = useStyles();

  const { subscriptionPlan, t } = props;
  const [isOpen, setIsOpen] = useState('');

  const onSelectedId = id => () => {
    setIsOpen(id);
  };
  const onCloseModal = () => setIsOpen('');

  const subscriptionPlanSelected = subscriptionPlan.find(
    i => i.planId === isOpen
  );
  return (
    <div className={classes.cardSubscription}>
      {subscriptionPlan.map((item, index) => (
        <Card
          className={`${classes.cardItem} ${classes.mr20}`}
          header={
            <div className={classes.bgCard}>
              <p className={classes.planName}>{item.name}</p>
              <p className={classes.caption}>
                {t('wallet:subscription_plan', { price: item.price })}
              </p>{' '}
              <p className={`${classes.mr0} ${classes.subTitle}`}>
                {t('wallet:subscription_for')}
              </p>
              <p className={classes.mr0}>{item.name}</p>
            </div>
          }
          key={index}
        >
          <div>
            <p className={classes.titleCard}>
              {item.name} - {t('wallet:subscription')}
            </p>
            <div className={`${classes.flexBox} ${classes.cointLine}`}>
              <img src="./images/coin-points.svg" alt="" />
              <p className={`${classes.flexBox} ${classes.coin}`}>
                {item.point}
              </p>{' '}
              <span className={classes.point}>{t('wallet:points')}</span>
            </div>
            <Button
              classes={classes.btnBackground}
              text={t('wallet:purchase')}
              onClick={onSelectedId(item.planId)}
            />
          </div>
        </Card>
      ))}
      {!!isOpen && (
        <PurchaseModal
          open={!!isOpen}
          onClose={onCloseModal}
          t={t}
          name={subscriptionPlanSelected.name}
          point={subscriptionPlanSelected.point}
          className={classes.bgCard}
          type="subscription"
        />
      )}
    </div>
  );
}
function SMSPlan(props) {
  const classes = useStyles();

  const { smsPlan, t } = props;
  const [isOpen, setIsOpen] = useState(null);

  const onSelectedId = id => () => setIsOpen(id);
  const onCloseModal = () => setIsOpen(null);

  const smsPlanSelected = smsPlan.find(i => i.planId === isOpen);

  return (
    <div className={classes.cardSubscription}>
      {smsPlan.map((item, index) => (
        <Card
          className={`${classes.cardItem} ${classes.mr20}`}
          header={
            <div className={classes.bgCard}>
              <p className={`${classes.smsTitle} ${classes.mr0}`}>
                {item.sms_limit} SMS
              </p>
              <p className={`${classes.smsPlan} ${classes.mr0}`}>{item.name}</p>
              <p className={`${classes.smsPrice} ${classes.mr0}`}>
                {t(`wallet:sms_plan_price`, { price: item.price })}
              </p>
            </div>
          }
          key={index}
        >
          <div>
            <p className={classes.titleCard}>
              {item.sms_limit} SMS Plan - {item.name}
            </p>
            <div className={`${classes.flexBox} ${classes.cointLine}`}>
              <img src="./images/coin-points.svg" alt="" />
              <p className={`${classes.flexBox} ${classes.coin}`}>
                {item.point}
              </p>{' '}
              <span className={classes.point}>{t('wallet:points')}</span>
            </div>
            <Button
              classes={classes.btnBackground}
              text={t('wallet:purchase')}
              onClick={onSelectedId(item.planId)}
            />
          </div>
        </Card>
      ))}
      {!!isOpen && (
        <PurchaseModal
          open={!!isOpen}
          onClose={onCloseModal}
          t={t}
          name={smsPlanSelected.name}
          point={smsPlanSelected.point}
          className={classes.bgCard}
          type="sms"
          sms_limit={smsPlanSelected.sms_limit}
        />
      )}
    </div>
  );
}
export default PurchaseUsePoint;
