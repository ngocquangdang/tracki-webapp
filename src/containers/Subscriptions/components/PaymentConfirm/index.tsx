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
  return (
    <PaymentConfirm
      t={t}
      today={moment().tz('America/Los_Angeles').format('LLL z')}
      device_id={formData.device_id}
      price={
        <span>
          <strong>${formData.selectedPlan.price} month</strong> to{' '}
          {formData.selectedPlan.smsLimit} SMS Monthly
        </span>
      }
      activation_date={'March 27, 2020'}
      subscription_expiration={'March 27, 2020'}
      type_payment={formData.creditCard.type}
      nextStep={nextStep}
      isRequesting={isRequesting}
    />
  );
}
