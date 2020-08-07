import { Subject } from 'rxjs';
import dropin from 'braintree-web-drop-in';
import * as apiServices from './index';

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
        let btnGo = document.querySelector(buttonSelector);
        payload$.next({ type: 'token' });
        console.log('token', token);
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
            console.log('paymentService -> dropIn', dropIn);

            btnGo.addEventListener('click', () => {
              if (dropIn.isPaymentMethodRequestable()) {
                console.log('clicked');
                requestPaymentMethod(dropIn)
                  .then(payload => {
                    payload$.next({ type: 'payload', payload });
                  })
                  .catch(console.error);
              }
            });
            dropIn.on('paymentMethodRequestable', event => {
              if (dropIn.isPaymentMethodRequestable()) {
                console.log('clickeddd');
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
              console.log('clicked');

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
          .catch(console.error);
      })
      .catch(console.error);

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
