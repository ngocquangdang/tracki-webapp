import { paymentService } from './payment';

export function BraintreePaymentGateway(
  formData,
  selectedPlan,
  account_id,
  setLoadingPaymentgateway,
  setDisableSubmitCard,
  dropInContainer
) {
  paymentService()
    .initBraintreeDropIn(
      dropInContainer,
      '#submit-payment-button',
      formData,
      selectedPlan,
      account_id
    )
    .subscribe((event: any) => {
      switch (event.type) {
        case 'token':
          setLoadingPaymentgateway();
          break;
        case 'available':
          setDisableSubmitCard(false);
          break;
        case 'notAvailable':
          setDisableSubmitCard(true);
          break;
        case 'payload':
          break;
      }
    });
}
