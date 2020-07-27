import React from 'react';
import {
  Container,
  Logo,
  CheckoutLogo,
  Checkout,
  Text,
  ContainerCheckoutLogo,
} from './styles';

interface Props {
  onClickAmazonPay(): void;
}
function AmazonPay(props: Props) {
  const { onClickAmazonPay } = props;
  return (
    <Container>
      <ContainerCheckoutLogo>
        <Logo src="/images/logo-amazon.png" />
      </ContainerCheckoutLogo>
      <Checkout>
        <CheckoutLogo
          src="/images/amazon-checkout.png"
          onClick={onClickAmazonPay}
        />
        <Text>
          After tapping you will be redirected to Amazon to complete your
          purchase securely.
        </Text>
      </Checkout>
    </Container>
  );
}

export default AmazonPay;
