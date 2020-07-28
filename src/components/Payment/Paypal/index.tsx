import React from 'react';
import {
  Container,
  Logo,
  CheckoutLogo,
  Checkout,
  ContainerCheckoutLogo,
  Text,
} from './styles';
import Fade from '@material-ui/core/Fade';

interface Props {
  onClickPaypal(): void;
  isMobile: boolean;
  t(key: string): string;
}
function Paypal(props: Props) {
  const { onClickPaypal, t, isMobile } = props;
  return (
    <Fade in unmountOnExit mountOnEnter>
      <Container>
        <ContainerCheckoutLogo>
          <Logo src="/images/logo-paypal.png" />
        </ContainerCheckoutLogo>
        <Checkout>
          <CheckoutLogo
            src="/images/paypal-checkout.png"
            onClick={onClickPaypal}
          />
          <Text>
            {isMobile
              ? t('subscription:description_paypal_pay_mobile')
              : t('subscription:description_paypal_pay_pc')}
          </Text>
        </Checkout>
      </Container>
    </Fade>
  );
}

export default Paypal;
