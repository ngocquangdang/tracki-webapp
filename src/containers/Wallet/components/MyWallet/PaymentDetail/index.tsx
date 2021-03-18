import dynamic from 'next/dynamic';
import React from 'react';
const PaymentSuccessPC = dynamic(() => import('./paymentDetailPC'));
const PaymentSuccessSP = dynamic(() => import('./paymentDetailSP'));

function Payment(props) {
  const { isMobile } = props;

  return (
    <>
      {isMobile ? (
        <PaymentSuccessSP {...props} />
      ) : (
        <PaymentSuccessPC {...props} />
      )}
    </>
  );
}

export default Payment;
