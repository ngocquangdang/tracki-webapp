import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { FiChevronLeft } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { Button } from '@Components/buttons';
import Payment from '@Components/Payment';
import { paymentService } from '../../services/payment';
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
  trackerPlan: any;
  formData: any;
  updateStore(value): void;
  account_id: number;
}

export default function Step2(props: Props) {
  console.log('props', props);
  const classes = useStyles();
  const {
    t,
    updateStepChild,
    trackerPlan,
    formData,
    updateStore,
    account_id,
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
  // const [isShowPayment, SetShowPayment] = useState(false);
  const [step] = useState('payment_confirm');
  const [paymentPlan, setPaymentPlan]: any = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(false);
  // const [openPgateway, setOpenPgateway] = useState('');
  const onChangePaymentPlan = (id: number, index) => () => {
    updateStore({ ...formData, selectedPlan: trackerPlan[index] });
    // getTokenForPaymentAction(formData);

    setShowOtherPlan(true);
    setSelectedPlan(true);
    setPaymentPlan(id);

    // setOpenPgateway('out');

    if (trackerPlan[index].paymentPlatform === 'PREPAID') {
      setSelectedPlan(true);
      updateStore({ ...formData, selectedPlan: trackerPlan[index] });
      // assignedDevice();
    } else if (trackerPlan[index].paymentPlatform === 'NONCE') {
      setSelectedPlan(true);
      BraintreePaymentGateway(trackerPlan[index], account_id);
      // setOpenPgateway('in');
    }
  };

  function BraintreePaymentGateway(selectedPlan, account_id) {
    console.log('payment gateway');
    // let subscriberBraintreeNonce;
    // let loading = true;
    // let paymentMethodAvailable = false;
    // let braintTreeNonceError = null;
    // let plan = selectedPlan;
    paymentService()
      .initBraintreeDropIn(
        '#dropin-container',
        '#submit-button',
        formData,
        selectedPlan,
        account_id
      )
      .subscribe((event: any) => {
        // braintTreeNonceError = null;
        console.log('payment gateway2', event);

        switch (event.type) {
          case 'token':
            console.log('sau do vao day');
            // setTimeout(() => (loading = false), 1000);
            break;
          case 'available':
            console.log('sau do vao day2');
            // paymentMethodAvailable = true;
            break;
          case 'notAvailable':
            console.log('sau do vao day3');
            // paymentMethodAvailable = false;
            break;
          case 'payload':
            console.log('sau do vao day4');

            // let data = {
            //   nonce: event.payload.nonce,
            //   plan_id: plan.id,
            //   email: event.payload.details.email || '',
            //   first_name: event.payload.details.firstName || '',
            //   last_name: event.payload.details.lastName || '',
            // };
            // loading = true;
            // if (subscriberBraintreeNonce) {
            //   console.log('sau do vao day k ');

            //   subscriberBraintreeNonce.unsubscribe();
            // }
            // console.log('data', data);
            // paymentMethodAvailable = false;
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
      <div className={`${!selectedPlan ? classes.hiddenLetter : ''}`}>
        <Payment t={t} handleClickPayment={renderStep} isMobile={true} />
      </div>
    </>
  );
}
