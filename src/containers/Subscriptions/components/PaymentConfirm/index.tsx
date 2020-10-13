import React from 'react';
import moment from 'moment-timezone';

import PaymentConfirm from '@Components/PaymentConfirm';

interface Props {
  t(key: string): string;
  nextStep(): void;
  formData: any;
  isRequesting?: boolean;
}

export default function PaymentConfirmContainer(props: Props) {
  const { t, nextStep, formData, isRequesting } = props;

  const planUntil = () => {
    const created_at = moment();

    var futureMonth = moment(created_at).add(1, 'months');
    var futureMonthEnd = moment(futureMonth).endOf('month');
    return created_at.date() !== futureMonth.date() &&
      futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
      ? futureMonth.add(1, 'd')
      : futureMonth;
  };

  const getPlan = () => {
    if (formData.subscriptionType === 'fast-tracking') {
      return formData.selectedPlan.planDTO.name;
    }
    return (
      <span>
        <strong>${formData.selectedPlan.price} month</strong> to{' '}
        {formData.selectedPlan.smsLimit} SMS Monthly
      </span>
    );
  };
  return (
    <PaymentConfirm
      t={t}
      today={moment().tz('America/Los_Angeles').format('LLL z')}
      device_id={formData.device_id}
      price={getPlan()}
      activation_date={'March 27, 2020'}
      subscription_expiration={moment(planUntil())
        .tz('America/Los_Angeles')
        .format('LLL z')}
      type_payment={formData.creditCard.type}
      visa_last_4={formData.creditCard.details.lastFour}
      total_amount={`$ ${formData.selectedPlan.price} ${formData.selectedPlan.currency}`}
      nextStep={nextStep}
      isRequesting={isRequesting}
    />
  );
}
