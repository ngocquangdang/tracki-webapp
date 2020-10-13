import React from 'react';
import moment from 'moment-timezone';

import PaymentConfirm from '@Components/PaymentConfirm';

interface Props {
  t(key: string): string;
  nextStep(): void;
  formData: any;
}
export default function PaymentConfirmContainer(props: Props) {
  const { t, nextStep, formData } = props;
  return (
    <PaymentConfirm
      t={t}
      today={moment().tz('America/Los_Angeles').format('LLL z')}
      device_id={formData.device_id}
      price={formData.selectedPlan.name}
      activation_date={'March 27, 2020'}
      subscription_expiration={'March 27, 2020'}
      type_payment={formData.creditCard.type}
      nextStep={nextStep}
    />
  );
}
