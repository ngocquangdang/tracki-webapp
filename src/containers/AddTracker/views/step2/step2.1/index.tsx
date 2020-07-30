import React from 'react';

import PaymentConfrim from '@Components/PaymentConfirm';

export default function PaymentConfrimContainer(props: any) {
  const { t, nextStep } = props;
  return (
    <PaymentConfrim
      t={t}
      today={'March 27, 2020'}
      device_id={12123}
      price={12.12}
      activation_date={'March 27, 2020'}
      subscription_expiration={'March 27, 2020'}
      type_payment="Paypal"
      nextStep={nextStep}
    />
  );
}
