import { Subject } from 'rxjs';
import dropin from 'braintree-web-drop-in';
import * as apiServices from './index';

const paymentService = () => {
  // let subscriberBraintreeNonce;

  //mastercard: 5460 3418 6782 9897 date: 08/2023 cvv: 998
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
            // btnGo.addEventListener('click');
            btnGo.addEventListener('click', () => {
              if (dropIn.isPaymentMethodRequestable()) {
                requestPaymentMethod(dropIn)
                  .then(payload => {
                    payload$.next({ type: 'payload', payload });
                  })
                  .catch(console.error);
              }
            });

            dropIn.on('paymentMethodRequestable', event => {
              // console.log(TAG, 'event - paymentMethodRequestable', event, dropIn.isPaymentMethodRequestable());
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
          })
          .catch(`${console.error} error 1`);
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

  // function init($scope, $state, paymentType, tabs, plan) {
  //   $scope.paymentType = paymentType;
  //   $state.go(tabs[$scope.currentTab], { type: paymentType });
  //   if (plan && settingsService.isNonce()) {
  //     $scope.loading = true;
  //     $scope.paymentMethodAvailable = false;
  //     $scope.braintTreeNonceError = null;
  //     initBraintreeDropIn(
  //       SELECTOR.CONTAINER,
  //       SELECTOR.BUTTON,
  //       plan,
  //       $scope.deviceId
  //     ).subscribe(event => {
  //       $scope.braintTreeNonceError = null;
  //       switch (event.type) {
  //         case EVENT.TOKEN:
  //           $timeout(() => ($scope.loading = false), 1000);
  //           break;
  //         case EVENT.AVAILABLE:
  //           $scope.paymentMethodAvailable = true;
  //           break;
  //         case EVENT.NOT_AVAILABLE:
  //           $scope.paymentMethodAvailable = false;
  //           break;
  //         case EVENT.ERROR:
  //           console.error(event.error);
  //           break;
  //         case EVENT.PAYLOAD:
  //           let data = {
  //             nonce: event.payload.nonce,
  //             plan_id: plan.id,
  //             email: event.payload.details.email || '',
  //             first_name: event.payload.details.firstName || '',
  //             last_name: event.payload.details.lastName || '',
  //           };
  //           $scope.loading = true;
  //           if (subscriberBraintreeNonce) {
  //             subscriberBraintreeNonce.unsubscribe();
  //           }
  //           subscriberBraintreeNonce = Api.setBraintreeNoncePlanToDevice(
  //             $scope.deviceId,
  //             data
  //           ).subscribe(
  //             data => {
  //               $scope.loading = false;
  //               $scope.next();
  //             },
  //             err => {
  //               $scope.braintTreeNonceError = err.response;
  //               $scope.loading = false;
  //             }
  //           );
  //           break;
  //       }
  //     });
  //   }
  // }
  return { initBraintreeDropIn };
};

export { paymentService };
