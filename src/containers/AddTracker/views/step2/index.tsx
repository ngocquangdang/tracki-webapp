import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { FiChevronLeft } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { Button } from '@Components/buttons';
import { paymentService } from '../../services/payment';
// import * as apiServices from '../../services';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
  t(key: string, format?: object): string;
  updateStepChild: Function;
  trackerPlan: any;
  formData: any;
  updateStore(value): void;
  account_id: number;
  onNextStep(): void;
  getSubAccountAction(account_id, device_id): void;
  onSetPaymentData(event, id): void;
  isMobile: boolean;
  braintreeDropinAction(formData, callback): void;
}

export default function Step2(props: Props) {
  const classes = useStyles();
  const {
    t,
    trackerPlan,
    formData,
    updateStore,
    account_id,
    onNextStep,
    isMobile,
    braintreeDropinAction,
  } = props;

  const dataPlan = {
    256: {
      month: 1,
      priceOneMonth: 19.95,
      subScript: `${t('tracker:one_month_subcription')} 8000-220-4999`,
    },
    263: {
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
    259: {
      month: 12,
      save: 72,
      priceOneMonth: 13.95,
      priceFullMonth: 167.4,
      subScript: `${t('tracker:prepaid_for', {
        month: 12,
        price: 167.4,
      })}`,
    },
    269: {
      month: 24,
      save: 239.4,
      priceOneMonth: 9.95,
      priceFullMonth: 239.4,
      subScript: `${t('tracker:prepaid_for', {
        month: 24,
        price: 239.4,
      })}`,
    },
  };

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
  const [paymentPlan, setPaymentPlan]: any = useState(null);
  const [disablePayment, setDisableSubmitCard] = useState(false);

  const onChangePaymentPlan = (id: number, index) => () => {
    setShowOtherPlan(true);
    setPaymentPlan(id);

    if (trackerPlan[index].paymentPlatform === 'PREPAID') {
      updateStore({ ...formData, selectedPlan: trackerPlan[index] });
      onNextStep();
    } else if (trackerPlan[index].paymentPlatform === 'NONCE') {
      updateStore({ ...formData, selectedPlan: trackerPlan[index] });
      setDisableSubmitCard(true);
      BraintreePaymentGateway(trackerPlan[index], account_id);
    }
  };

  const onPaymentSubmit = () => {
    braintreeDropinAction(formData, onNextStep);
  };

  function BraintreePaymentGateway(selectedPlan, account_id) {
    let subscriberBraintreeNonce;
    paymentService()
      .initBraintreeDropIn(
        '#dropin-container',
        '#submit-payment-button',
        formData,
        selectedPlan,
        account_id
      )
      .subscribe((event: any) => {
        switch (event.type) {
          case 'token':
            break;
          case 'available':
            setDisableSubmitCard(false);
            break;
          case 'notAvailable':
            setDisableSubmitCard(true);
            break;
          case 'payload':
            if (subscriberBraintreeNonce) {
              subscriberBraintreeNonce.unsubscribe();
            }
            break;
        }
      });
  }

  const getCardClass = (id: number) => {
    if (paymentPlan) {
      if (paymentPlan === id) {
        return `${classes.card} ${classes.fullWidth}`;
      }
      return `${classes.card} ${classes.hiddenCard}`;
    }
    return classes.card;
  };

  // const renderStep = () => {
  //   switch (step) {
  //     case 'payment_confirm':
  //       return updateStepChild('payment_confirm');
  //     case 'referral_code':
  //       return updateStepChild('referral_code');
  //     case 'congratulation':
  //       return updateStepChild('congratulation');
  //     default:
  //       return 'no case';
  //   }
  // };

  const onHiddenOtherPlan = () => {
    setPaymentPlan(null);
    setShowOtherPlan(false);
  };
  return (
    <div>
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
        {trackerPlan.map((card, index) => (
          <Card
            className={getCardClass(card.id)}
            key={card.id}
            onClick={onChangePaymentPlan(card.id, index)}
          >
            <CardHeaderStyle
              title={`${dataPlan[card.id]?.month} ${
                dataPlan[card.id]?.month === 1
                  ? t('tracker:month')
                  : t('tracker:months')
              }`}
              className={classes.headerCard}
            />
            <CardContent>
              <CardDescription>
                <strong>${dataPlan[card.id]?.priceOneMonth}</strong>/
                {t('tracker:month')}
                {dataPlan[card.id]?.subScript}
                <br />
                <strong
                  style={{
                    display: `${dataPlan[card.id]?.save ? 'block' : 'none'}`,
                  }}
                >
                  {t('tracker:save')} ${dataPlan[card.id]?.save}
                </strong>
              </CardDescription>
            </CardContent>
            <Paner mostPopular={dataPlan[card.id]?.most_popular}>
              {t('tracker:most_popular')}
            </Paner>
          </Card>
        ))}
      </GroupCard>

      <Letter className={`${isShowOtherPlan ? classes.hidden : ''}`}>
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
      <Image2 className={`${isShowOtherPlan ? classes.hidden : ''}`}>
        <img src="./images/guarantee-safe.png" alt="" />
      </Image2>
      <div className={`${!isShowOtherPlan ? classes.hidden : ''}`}>
        <div id="dropin-container"></div>
        <p>All transactions are secure and encrypted.</p>
        <Button
          onClick={onPaymentSubmit}
          disabled={disablePayment}
          id="submit-payment-button"
          color="primary"
          variant="contained"
          type="submit"
          text={
            isMobile
              ? t('subscription:credit_card_pay_now')
              : t('subscription:credit_card_proceed')
          }
          endIcon={isMobile ? null : <ArrowForwardIosIcon />}
        />
      </div>
    </div>
  );
}
