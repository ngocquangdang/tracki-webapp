import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import { FiChevronLeft } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { Button } from '@Components/buttons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';

import { paymentService } from '../services/payment';
import LayoutConfirm from './components';
import PaymentConfirmContainer from './PaymentConfirm';
import ReferralCodeContainer from './ReferalCode';
import CongratulationContainer from './Congratulation';

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
  Text,
  Container,
  Logo,
  HeaderNav,
  Content,
  ButtonStyle,
} from './styles';

interface Props {
  t(key: string, format?: object): string;
  updateStepChild: Function;
  trackerPlan: any;
  formData: any;
  updateStore(value): void;
  account_id: number;
  getSubAccountAction(account_id, device_id): void;
  onSetPaymentData(event, id): void;
  isMobile: boolean;
  braintreeDropinAction(formData, callback): void;
  renewDeviceAction(formData, account_id, paymentData): void;
  isRequesting: boolean;
  showSnackbar(data: SNACK_PAYLOAD): void;
}

export default function RenewPayment(props: Props) {
  const classes = useStyles();
  const {
    t,
    trackerPlan,
    formData,
    updateStore,
    account_id,
    isMobile,
    braintreeDropinAction,
    renewDeviceAction,
    isRequesting,
    showSnackbar,
  } = props;

  const { planIds = [], plans = {}, id } = trackerPlan;

  const dataPlan = {
    256: {
      id: 256,
      month: 1,
      priceOneMonth: 19.95,
      subScript: `${t('tracker:one_month_subcription')} 8000-220-4999`,
    },
    263: {
      id: 263,
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
      id: 259,
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
      id: 269,
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
  const [stepChild, updateStepChild] = useState('');
  const [isLoadingGateway, setLoadingGateway] = useState(true);

  const onChangePaymentPlan = (id: number, index) => () => {
    setShowOtherPlan(true);
    setPaymentPlan(id);

    if (plans[id].paymentPlatform === 'PREPAID') {
      updateStore({ ...formData, selectedPlan: plans[id] });
      setLoadingGateway(true);
      BraintreePaymentGateway(
        plans[id],
        account_id,
        setLoadingPaymentgateway,
        showSnackbar
      );
    } else if (plans[id].paymentPlatform === 'NONCE') {
      updateStore({ ...formData, selectedPlan: plans[id] });
      setDisableSubmitCard(true);
      BraintreePaymentGateway(
        plans[id],
        account_id,
        setLoadingPaymentgateway,
        showSnackbar
      );
    }
  };

  const onPaymentSubmit = () => {
    if (plans[paymentPlan].paymentPlatform === 'PREPAID') {
      const paymentInfo = {
        nonce: '',
        plan_id: paymentPlan,
        email: formData.email || 'trackimo.home@gmail.com',
        first_name: formData.firstName || 'Trackimo',
        last_name: formData.lastName || 'home',
      };
      return renewDeviceAction(formData, account_id, paymentInfo);
    }
    return braintreeDropinAction(formData, updateStepChild);
  };

  const setLoadingPaymentgateway = () => {
    setLoadingGateway(false);
  };
  function BraintreePaymentGateway(
    selectedPlan,
    account_id,
    setLoadingPaymentgateway,
    showSnackbar
  ) {
    paymentService().initBraintreeDropIn(
      '#dropin-container',
      '#submit-payment-button',
      formData,
      selectedPlan,
      account_id,
      showSnackbar,
      setLoadingPaymentgateway,
      setDisableSubmitCard
    );
  }

  const onNextStepChild = (stepChild: string) => () => {
    updateStepChild(stepChild);
  };

  const renderStep = () => {
    switch (stepChild) {
      case 'payment_confirm':
        return (
          <PaymentConfirmContainer
            {...props}
            nextStep={onNextStepChild('referral_code')}
          />
        );

      case 'referral_code':
        return (
          <ReferralCodeContainer
            {...props}
            paymentData={formData.creditCard}
            renewDeviceAction={renewDeviceAction}
            NextStepChild={onNextStepChild('congratulation')}
          />
        );
      case 'congratulation':
        return (
          <CongratulationContainer
            {...props}
            paymentData={formData.creditCard}
            renewDeviceAction={renewDeviceAction}
          />
        );
    }
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

  const onHiddenOtherPlan = () => {
    setPaymentPlan(null);
    setShowOtherPlan(false);
  };

  const onBack = () => Router.back();

  return (
    <Container stepChild={stepChild}>
      <HeaderNav>
        <Button
          variant="text"
          classes={classes.backNav}
          startIcon={<FiChevronLeft size={28} />}
          text={stepChild !== '' || !isMobile ? 'back' : 'Renew Tracker'}
          onClick={onBack}
        />
        <Link href="/">
          <Logo src="/images/logo.png" alt="" />
        </Link>
      </HeaderNav>
      <Content>
        {stepChild !== '' ? (
          renderStep()
        ) : (
          <LayoutConfirm title={t('tracker:renew_tracker')}>
            <div className={classes.container}>
              <Header>
                <Typography>{t('tracker:update_plan')}</Typography>
                {isShowOtherPlan ? (
                  <ButtonStyle
                    variant="text"
                    className={classes.backBtn}
                    style={{ marginRight: 0 }}
                    startIcon={<FiChevronLeft size={28} />}
                    text={t('tracker:choose_differant_plan')}
                    onClick={onHiddenOtherPlan}
                  />
                ) : (
                  <Image>
                    <img src="/images/cards.png" alt="" />
                  </Image>
                )}
              </Header>
              <GroupCard>
                {isRequesting || trackerPlan === [] ? (
                  <CircularProgress />
                ) : (
                  <>
                    {id === 69 ? (
                      <>
                        {planIds.map((id, index) => (
                          <Card
                            className={getCardClass(id)}
                            key={id}
                            onClick={onChangePaymentPlan(id, index)}
                          >
                            <CardHeaderStyle
                              title={`${dataPlan[id]?.month} ${
                                dataPlan[id]?.month === 1
                                  ? t('tracker:month')
                                  : t('tracker:months')
                              }`}
                              className={classes.headerCard}
                            />
                            <CardContent>
                              <CardDescription>
                                <strong>${dataPlan[id]?.priceOneMonth}</strong>/
                                {t('tracker:month')}
                                {dataPlan[id]?.subScript}
                                <br />
                                <strong
                                  style={{
                                    display: `${
                                      dataPlan[id]?.save ? 'block' : 'none'
                                    }`,
                                  }}
                                >
                                  {t('tracker:save')} ${dataPlan[id]?.save}
                                </strong>
                              </CardDescription>
                            </CardContent>
                            <Paner mostPopular={dataPlan[id]?.most_popular}>
                              {isMobile ? '20%' : t('tracker:most_popular')}
                            </Paner>
                          </Card>
                        ))}
                      </>
                    ) : (
                      planIds.map((id, index) => (
                        <Card
                          className={getCardClass(id)}
                          key={id}
                          onClick={onChangePaymentPlan(id, index)}
                        >
                          <CardHeaderStyle
                            title={plans[id].name}
                            className={classes.headerCard}
                          />
                          <CardContent>
                            <CardDescription>
                              {plans[id].caption}
                            </CardDescription>
                          </CardContent>
                          <Paner mostPopular={plans[id]?.most_popular}>
                            {isMobile ? '20%' : t('tracker:most_popular')}
                          </Paner>
                        </Card>
                      ))
                    )}
                  </>
                )}
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
                <img src="/images/guarantee-safe.png" alt="" />
              </Image2>
              <div className={`${!isShowOtherPlan ? classes.hidden : ''}`}>
                <div id="dropin-container"></div>
                <div className={!isLoadingGateway ? classes.hidden : ''}>
                  <CircularProgress />
                </div>
                <Text>All transactions are secure and encrypted.</Text>
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
          </LayoutConfirm>
        )}
      </Content>
    </Container>
  );
}
