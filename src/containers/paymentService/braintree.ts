import { paymentService } from './payment';

export function BraintreePaymentGateway(
  formData,
  selectedPlan,
  planId,
  account_id,
  setLoadingPaymentgateway,
  setDisableSubmitCard,
  dropInContainer
) {
  paymentService()
    .initBraintreeDropIn(
      dropInContainer,
      formData,
      selectedPlan,
      planId,
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
