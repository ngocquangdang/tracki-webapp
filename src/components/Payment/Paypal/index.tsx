import React from 'react';
import {
  Container,
  Logo,
  CheckoutLogo,
  Checkout,
  ContainerCheckoutLogo,
  Text,
} from './styles';

interface Props {
  onClickPaypal(): void;
  isMobile: boolean;
}
function Paypal(props: Props) {
  const { onClickPaypal, isMobile } = props;
  return (
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
            ? 'After tapping you will be redirected to Paypal to complete yourv purchase securely.'
            : 'The Safer, easier way to pay'}
        </Text>
      </Checkout>
    </Container>
  );
}

export default Paypal;
