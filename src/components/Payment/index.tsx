import React, { useState, Fragment } from 'react';
import { CreditCard as CreditCardIcon } from '@material-ui/icons';
import CreditCard from './CreditCard';
import AmazonPay from './AmazonPay';
import Paypal from './Paypal';
import {
  Container,
  Title,
  Content,
  AnotherWayPay,
  OptionPayment,
  ControlPayment,
  Logo,
  SubText,
  OptionPay,
  TextFooter,
  ContentOption1,
  useStyles,
} from './styles';

interface Props {
  handleClickPayment(): void;
  isMobile: boolean;
}

function PaymentOption(props: Props) {
  const { handleClickPayment, isMobile } = props;
  const classes = useStyles();
  const [option, setOption] = useState(1);

  const renderPaymentOption = () => {
    switch (option) {
      case 2:
        return (
          <CreditCard
            onClickCreditCard={handleClickPayment}
            isMobile={isMobile}
          />
        );
      case 3:
        return (
          <Paypal onClickPaypal={handleClickPayment} isMobile={isMobile} />
        );
      case 4:
        return <AmazonPay onClickAmazonPay={handleClickPayment} />;
    }
  };
  return (
    <Container>
      <Title isMobile={isMobile}>
        {isMobile ? 'Choose a way to pay' : 'Payment Option'}
      </Title>
      <Content isOption1={option === 1}>
        {option === 1 ? (
          <ContentOption1>
            <OptionPay>
              <ControlPayment onClick={() => setOption(2)}>
                <CreditCardIcon className={classes.creditLogo} />
                <SubText>Credit card</SubText>
              </ControlPayment>
              <ControlPayment onClick={() => setOption(3)}>
                <Logo src="/images/logo-paypal.png" />
              </ControlPayment>
              <ControlPayment onClick={() => setOption(4)}>
                <Logo src="/images/logo-amazon.png" />
              </ControlPayment>
            </OptionPay>
            <TextFooter>All transactions are secure and encrypted.</TextFooter>
          </ContentOption1>
        ) : (
          <Fragment>
            <OptionPayment>{renderPaymentOption()}</OptionPayment>
            <AnotherWayPay onClick={() => setOption(1)}>
              Choose another way to pay
            </AnotherWayPay>
          </Fragment>
        )}
      </Content>
    </Container>
  );
}

export default PaymentOption;
