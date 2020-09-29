import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Button } from '@Components/buttons';

import {
  Container,
  ControlChangePlan,
  TextChange,
  InfoSubcription,
  Country,
  DetailIncrease,
  TypeMessage,
  Price,
  SelectPayment,
  useStyles,
} from './styles';
import { BraintreePaymentGateway } from '@Containers/paymentService/braintree';
import { CircularProgress } from '@material-ui/core';

interface DetailMessage {
  currency: string;
  groupId: number;
  planId: number;
  price: number;
  smsLimit: number;
}

interface Props {
  isMobile: boolean;
  onUpdateStep(value): void;
  t(key: string): string;
  formData: any;
}
function SubscriptionStep2(props) {
  const {
    isMobile,
    onUpdateStep,
    t,
    formData,
    braintreeDropInSubscriptionRequest,
  } = props;
  const classes = useStyles();
  const [isLoadingGateway, setLoadingGateway] = useState(true);
  const [disablePayment, setDisableSubmitCard] = useState(true);

  useEffect(() => {
    BraintreePaymentGateway(
      formData,
      formData.selectedPlan,
      formData.selectedPlan.planId,
      formData.account_id,
      setLoadingPaymentgateway,
      setDisableSubmitCard,
      '#dropin-container-web'
    );
  }, [formData]);

  const setLoadingPaymentgateway = () => {
    setLoadingGateway(false);
  };

  const handleChangeStep = (step: number) => () => {
    onUpdateStep(step);
  };
  const onPaymentSubmit = () => {
    braintreeDropInSubscriptionRequest(formData, handleChangeStep(3));
  };

  return (
    <Container>
      <ControlChangePlan onClick={handleChangeStep(1)}>
        <ArrowBackIosIcon className={classes.backBtn} />
        <TextChange>{t('subscription:change_plan')}</TextChange>
      </ControlChangePlan>
      <InfoSubcription>
        <Country>{formData?.country.description}</Country>
        <DetailIncrease>
          <TypeMessage>
            {`${t('subscription:text_plan')} ${
              formData.subscriptionType === 'sms'
                ? formData?.selectedPlan.smsLimit
                : formData?.selectedPlan.fastTrackSeconds + ` Seconds`
            } ${t('subscription:monthly')}`}
          </TypeMessage>
          <Price>
            {formData?.selectedPlan.price} {formData?.selectedPlan.currency}
          </Price>
        </DetailIncrease>
      </InfoSubcription>
      <SelectPayment>
        {!isMobile && (
          <div>
            <div id="dropin-container-web"></div>
            <div className={!isLoadingGateway ? classes.hidden : ''}>
              <CircularProgress />
            </div>
            <p>All transactions are secure and encrypted.</p>
            <Button
              onClick={onPaymentSubmit}
              id="submit-payment-button-web"
              disabled={disablePayment}
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
      </SelectPayment>
    </Container>
  );
}

export default SubscriptionStep2;
