import { Subject } from 'rxjs';
import dropin from 'braintree-web-drop-in';
import * as apiServices from './index';

declare global {
  interface Window {
    dropinIntance: object;
  }
}

const paymentService = () => {
  const initBraintreeDropIn = (
    containerSelector,
    buttonSelector,
    data,
    selectedPlan,
    account_id
  ) => {
    let payload$ = new Subject();
    let dropIn;
    apiServices
      .getTokenForPayment(data, selectedPlan.id, account_id)
      .then(token => {
        payload$.next({ type: 'token' });
        dropin
          .create({
            authorization: token.data,
            container: containerSelector,
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
              amount: data.selectedPlan.amount,
              currency: data.selectedPlan.currency,
            },
          })
          .then(instance => {
            dropIn = instance;

            dropIn.on('paymentMethodRequestable', event => {
              if (dropIn.isPaymentMethodRequestable()) {
                switch (event.type) {
                  case 'PayPalAccount':
                    requestPaymentMethod(dropIn)
                      .then(payload => {
                        payload$.next({ type: 'payload', payload });
                      })
                      .catch(console.error);
                    break;
                  case 'CreditCard':
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
