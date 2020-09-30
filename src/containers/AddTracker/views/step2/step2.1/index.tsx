import React from 'react';
import moment from 'moment-timezone';

import PaymentConfirm from '@Components/PaymentConfirm';

interface Props {
  t(key: string): string;
  nextStep(): void;
  formData: any;
  endStepChild?(): void;
  trackerPlans: any;
  trackers: any;
}
export default function PaymentConfirmContainer(props: Props) {
  const { t, nextStep, formData, endStepChild, trackerPlans, trackers } = props;
  const current_plan = trackers[formData.device_id]?.current_device_plan;
  const expiration = trackerPlans[current_plan]?.expiration_date;

  const getPrice = () => {
    switch (formData.selectedPlan.id) {
      case 256:
        return '$19.95';

      case 263:
        return '$16.60';

      case 259:
        return '$13.95';

      case 269:
        return '$9.95';
    }
  };
  return (
    <PaymentConfirm
      t={t}
      today={moment().tz('America/Los_Angeles').format('LLL z')}
      device_id={formData.device_id}
      price={formData.selectedPlan.name}
      subscription_expiration={
        expiration
          ? moment(expiration).tz('America/Los_Angeles').format('LLL z')
          : '-'
      }
      type_payment={formData.creditCard.type}
      visa_last_4={formData.creditCard.details.lastFour}
      total_amount={getPrice()}
      nextStep={nextStep}
      endStepChild={endStepChild}
    />
  );
}
