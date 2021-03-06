import { Subject } from 'rxjs';
import dropin from 'braintree-web-drop-in';
import * as apiServices from './index';
import { firebaseLogEventRequest } from '@Utils/firebase';

declare global {
  interface Window {
    dropinIntance: object;
  }
}

const paymentService = () => {
  const initBraintreeDropIn = (
    dropInContainer,
    data,
    selectedPlan,
    planId,
    account_id
  ) => {
    let payload$ = new Subject();
    let dropIn;
    apiServices
      .getTokenForPayment(data, planId, account_id)
      .then(token => {
        payload$.next({ type: 'token' });
        dropin
          .create({
            authorization: token.data,
            container: dropInContainer,
            translations: {
              chooseAWayToPay: 'Payment Option',
              Card: 'Credit Card',
              PayPal: 'PayPal',
              cardNumberLabel: 'Credit Card Number',
              payingWith: 'Credit Card',
            },
            card: {
              overrides: {
                fields: {
                  cvv: {
                    type: 'password',
                  },
                },
              },
            },
            paypal: {
              flow: 'vault',
              amount: selectedPlan.amount,
              currency: selectedPlan.currency,
            },
          })
          .then(instance => {
            dropIn = instance;
            payload$.next({ type: 'available' });
            dropIn.on('paymentMethodRequestable', event => {
              if (dropIn.isPaymentMethodRequestable()) {
                switch (event.type) {
                  case 'PayPalAccount':
                    firebaseLogEventRequest(
                      'payment_form',
                      'payment_method_paypal'
                    );
                    requestPaymentMethod(dropIn)
                      .then(payload => {
                        payload$.next({ type: 'payload', payload });
                      })
                      .catch(console.error);
                    break;
                  case 'CreditCard':
                    firebaseLogEventRequest(
                      'payment_form',
                      'payment_method_credit_card'
                    );
                    payload$.next({ type: 'available' });
                    break;
                }
              }
            });

            dropIn.on('paymentOptionSelected', event => {
              // console.log(TAG, 'event - paymentOptionSelected', event);
              switch (event.paymentOption) {
                case 'paypal':
                  break;
                case 'card':
                  break;
              }
              dropIn.clearSelectedPaymentMethod();
            });

            dropIn.on('noPaymentMethodRequestable', () => {
              // console.log(TAG, 'event - noPaymentMethodRequestable');
              payload$.next({ type: 'notAvailable' });
            });
            window.dropinIntance = dropIn || {};
          })
          .catch(error => error);
      })
      .catch(error => error);

    return payload$;
  };

  function requestPaymentMethod(dropIn) {
    return dropIn
      .requestPaymentMethod()
      .then(payload => {
        // console.log(TAG, payload, dropIn);
        return payload;
      })
      .catch(console.error);
  }

  return { initBraintreeDropIn };
};

export { paymentService };
