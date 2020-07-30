import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { FiChevronLeft } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { Button } from '@Components/buttons';

import {
  Header,
  Typography,
  Image,
  Image2,
  GroupCard,
  useStyles,
  CardHeaderStyle,
  CardDescription,
  Lable,
  Letter,
  PlanList,
  PlanItem,
  Paner,
} from './styles';

interface Props {
  t: Function;
  updateStepChild: Function;
}

export default function Step2(props: Props) {
  console.log('props', props);
  const classes = useStyles();
  const { t, updateStepChild } = props;

  const dataPlan = [
    {
      card_id: 1,
      month: 1,
      priceOneMonth: 19.95,
      subScript: `${t('tracker:one_month_subcription')} 8000-220-4999`,
    },
    {
      card_id: 6,
      month: 6,
      save: 20,
      priceOneMonth: 16.6,
      priceFullMonth: 99.6,
      subScript: `${t('tracker:prepaid_for', {
        month: 6,
        price: 99.6,
      })}`,
      most_popular: true,
    },
    {
      card_id: 12,
      month: 12,
      save: 72,
      priceOneMonth: 13.95,
      priceFullMonth: 167.4,
      subScript: `${t('tracker:prepaid_for', {
        month: 12,
        price: 167.4,
      })}`,
    },
    {
      card_id: 24,
      month: 24,
      save: 239.4,
      priceOneMonth: 9.95,
      priceFullMonth: 239.4,
      subScript: `${t('tracker:prepaid_for', {
        month: 24,
        price: 239.4,
      })}`,
    },
  ];
  const planItem = [
    `${t('tracker:coverage_subcription')}`,
    `${t('tracker:gps_tracking_subcription')}`,
    `${t('tracker:notification_subcription')}`,
    `${t('tracker:geo_fence')}`,
    `${t('tracker:5_year_history_report')}`,
    `${t('tracker:wifi_tracking')}`,
    `${t('tracker:lifetime_warranty')}`,
    `${t('tracker:live_customer_service')}`,
    `${t('tracker:no_activation')}`,
  ];

  const [isShowOtherPlan, setShowOtherPlan] = useState(false);
  const [isShowPayment, SetShowPayment] = useState(false);
  const [step] = useState('payment_confirm');
  const [paymentPlan, setPaymentPlan]: any = useState(null);

  const onChangePaymentPlan = (id: number) => () => {
    setShowOtherPlan(true);
    SetShowPayment(true);
    setPaymentPlan(id);
  };

  const getCardClass = (id: number) => {
    if (paymentPlan) {
      if (paymentPlan === id) {
        return `${classes.card} ${classes.fullWidth}`;
      }
      return `${classes.card} ${classes.hiddenCard}`;
    }
    return classes.card;
  };

  const renderStep = () => {
    switch (step) {
      case 'payment_confirm':
        return updateStepChild('payment_confirm');
      case 'referral_code':
        return updateStepChild('referral_code');
      case 'congratulation':
        return updateStepChild('congratulation');
      default:
        return 'no case';
    }
  };

  const onHiddenOtherPlan = () => {
    setPaymentPlan(null);
    setShowOtherPlan(false);
  };
  return (
    <>
      <Header>
        <Typography>{t('tracker:select_your_plan')}</Typography>
        {isShowOtherPlan ? (
          <Button
            variant="text"
            classes={classes.backBtn}
            startIcon={<FiChevronLeft size={28} />}
            text={t('tracker:choose_differant_plan')}
            onClick={onHiddenOtherPlan}
          />
        ) : (
          <Image>
            <img src="./images/cards.png" alt="" />
          </Image>
        )}
      </Header>
      <GroupCard>
        {dataPlan.map((card, index) => (
          <Card
            className={getCardClass(card.card_id)}
            key={index}
            onClick={onChangePaymentPlan(card.card_id)}
          >
            <CardHeaderStyle
              title={`${card.month} ${t('tracker:months')}`}
              className={classes.headerCard}
            />
            <CardContent>
              <CardDescription>
                <strong>${card.priceOneMonth}</strong>/{t('tracker:month')}{' '}
                {t('tracker:prepaid_for', {
                  month: card.month,
                  price: card.priceOneMonth,
                })}
                <br />
                <strong
                  style={{
                    display: `${card.save ? 'block' : 'none'}`,
                  }}
                >
                  {t('tracker:save')} ${card.save}
                </strong>
              </CardDescription>
            </CardContent>
            <Paner mostPopular={card.most_popular}>
              {t('tracker:most_popular')}
            </Paner>
          </Card>
        ))}
      </GroupCard>

      <Letter className={`${isShowOtherPlan ? classes.hiddenLetter : ''}`}>
        <Lable>{t('tracker:dear_customer')}</Lable>
        <Lable>{t('tracker:content_letter')}</Lable>
        <Lable>{t('tracker:plan_included')}</Lable>
        <PlanList>
          {planItem.map((item, index) => (
            <PlanItem key={index}>
              <MdDone /> {item}
            </PlanItem>
          ))}
        </PlanList>
      </Letter>
      <Image2 className={`${isShowOtherPlan ? classes.hiddenLetter : ''}`}>
        <img src="./images/guarantee-safe.png" alt="" />
      </Image2>
      <button
        className={`${!isShowPayment ? classes.hiddenLetter : ''}`}
        onClick={renderStep}
      >
        {' '}
        pay
      </button>
      {/* {renderStep()} */}
    </>
  );
}
