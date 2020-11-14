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
  const { t, nextStep, formData, endStepChild } = props;

  const getPrice = () => {
    switch (formData.selectedPlan.id) {
      case 256:
        return '$19.95';

      case 263:
        return `$ ${Math.round(16.6 * 6 * 100) / 100}`;

      case 259:
        return `$ ${Math.round(13.95 * 12 * 100) / 100}`;

      case 269:
        return `$ ${Math.round(9.95 * 24 * 100) / 100}`;
    }
  };
  const planUntil = (month: number, type) => {
    const created_at = moment();

    var futureMonth = moment(created_at).add(month, type);
    var futureMonthEnd = moment(futureMonth).endOf('month');
    return created_at.date() !== futureMonth.date() &&
      futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
      ? futureMonth.add(1, 'd')
      : futureMonth;
  };

  const getMonthUntil = () => {
    switch (formData.selectedPlan.id) {
      case 256:
        return planUntil(1, 'M');
      case 263:
        return planUntil(6, 'M');
      case 259:
        return planUntil(1, 'y');
      case 269:
        return planUntil(2, 'y');
    }
  };
  return (
    <PaymentConfirm
      t={t}
      today={moment().tz('America/Los_Angeles').format('LLL z')}
      device_id={formData.device_id}
      price={formData.selectedPlan.name}
      subscription_expiration={moment(getMonthUntil())
        .tz('America/Los_Angeles')
        .format('LLL z')}
      type_payment={formData.creditCard.type}
      visa_last_4={formData.creditCard.details.lastFour}
      total_amount={getPrice()}
      nextStep={nextStep}
      endStepChild={endStepChild}
    />
  );
}
