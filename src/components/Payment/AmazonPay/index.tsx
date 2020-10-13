import React from 'react';
import {
  Container,
  Logo,
  CheckoutLogo,
  Checkout,
  Text,
  ContainerCheckoutLogo,
} from './styles';
import Fade from '@material-ui/core/Fade';

interface Props {
  onClickAmazonPay(): void;
  t(key: string, format?: object): string;
}
function AmazonPay(props: Props) {
  const { onClickAmazonPay, t } = props;
  return (
    <Fade in unmountOnExit mountOnEnter>
      <Container>
        <ContainerCheckoutLogo>
          <Logo src="/images/logo-amazon.png" />
        </ContainerCheckoutLogo>
        <Checkout>
          <CheckoutLogo
            src="/images/amazon-checkout.png"
            onClick={onClickAmazonPay}
          />
          <Text>{t('subscription:description_amazon_pay')}</Text>
        </Checkout>
      </Container>
    </Fade>
  );
}

export default AmazonPay;
