import React, { useState, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import InfoIcon from '@material-ui/icons/Info';
import { Button } from '@Components/buttons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Router from 'next/router';

import {
  Container,
  Header,
  Content,
  Logo,
  WrapTitle,
  Title,
  SubTitle,
  TextSub,
  TextNormal,
  TextBold,
  MainContent,
  useStyles,
} from './styles';
import SubscriptionStep1 from '../components/SubscriptionStep1';
import SubscriptionStep2 from '../components/SubscriptionStep2';
import PaymentConfirm from '../components/PaymentConfirm';
import { BraintreePaymentGateway } from '@Containers/paymentService/braintree';
import { SkeletonPaymentForm } from '@Components/Skeletons';

interface Props {
  isMobile: boolean;
  t(key: string): string;
  formData: any;
  braintreeDropInSubscriptionRequest(formData, callback): void;
  smsCounter: {
    smsCounter: number;
    smsLimit: number;
  };
  isRequesting: boolean;
}
function Subscription(props: Props) {
  const {
    isMobile,
    formData,
    braintreeDropInSubscriptionRequest,
    t,
    smsCounter,
    isRequesting,
  } = props;

  const classes = useStyles();
  const [isLoadingGateway, setLoadingGateway] = useState(true);
  const [disablePayment, setDisableSubmitCard] = useState(true);

  const onUpdateStep = step => {
    updateStep(step);
  };
  const onSubmit = () => {
    Router.push('/');
  };

  const [step, updateStep] = useState(1);
  const renderStep = () => {
    switch (step) {
      case 2:
        return <SubscriptionStep2 onUpdateStep={onUpdateStep} {...props} />;
      case 3:
        return <PaymentConfirm {...props} nextStep={onSubmit} />;
      default:
        return <SubscriptionStep1 onUpdateStep={onUpdateStep} {...props} />;
    }
  };
  useEffect(() => {
    if (step === 2) {
      BraintreePaymentGateway(
        formData,
        formData.selectedPlan,
        formData.selectedPlan.planId,
        formData.account_id,
        setLoadingPaymentgateway,
        setDisableSubmitCard,
        '#dropin-container-sp'
      );
    }
  }, [formData, step]);

  const setLoadingPaymentgateway = () => {
    setLoadingGateway(false);
  };
  const onPaymentSubmit = () => {
    braintreeDropInSubscriptionRequest(formData, handleChangeStep(3));
  };
  const handleChangeStep = (step: number) => () => {
    onUpdateStep(step);
  };
  return (
    <Container>
      <Header>
        <Link href="/trackers">
          <Button
            variant="text"
            classes={classes.backBtn}
            startIcon={<FiChevronLeft size={28} />}
            text={isMobile ? 'Increase Text Alert Limit' : 'Back'}
          />
        </Link>
        <Link href="/">
          <Logo src="static/images/logo.png" className={classes.logo2} alt="" />
        </Link>
      </Header>
      <Content>
        <WrapTitle isStep3={step === 3}>
          <Title>
            {formData.subscriptionType === 'sms'
              ? 'Increase Monthly Text Alert Limit'
              : 'Fast Tracking'}
          </Title>
          {formData.subscriptionType === 'sms' && (
            <SubTitle>
              <InfoIcon className={classes.infoIcon} />
              <TextSub>
                <TextNormal>This month you used: </TextNormal>

                <TextBold>
                  {smsCounter.smsCounter || 0} out of {smsCounter.smsLimit || 0}{' '}
                  text alerts
                </TextBold>
              </TextSub>
            </SubTitle>
          )}
        </WrapTitle>
        <MainContent isStep2={step === 2} isStep3={step === 3}>
          {renderStep()}
        </MainContent>
        {isMobile && step === 2 && (
          <div className={classes.fullWidth}>
            <div id="dropin-container-sp"></div>
            <div className={!isLoadingGateway ? classes.hidden : ''}>
              <SkeletonPaymentForm />
            </div>
            <p className={classes.textcolor}>
              All transactions are secure and encrypted.
            </p>
            <Button
              onClick={onPaymentSubmit}
              id="submit-payment-button-sp"
              disabled={disablePayment || isRequesting}
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
        )}
      </Content>
    </Container>
  );
}

export default Subscription;
