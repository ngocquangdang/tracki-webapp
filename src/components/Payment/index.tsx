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
  t(key: string, format?: object): string;
}

function PaymentOption(props: Props) {
  const { handleClickPayment, isMobile, t } = props;
  const classes = useStyles();
  const [option, setOption] = useState(1);

  const renderPaymentOption = () => {
    switch (option) {
      case 2:
        return (
          <CreditCard
            onClickCreditCard={handleClickPayment}
            isMobile={isMobile}
            t={t}
          />
        );
      case 3:
        return (
          <Paypal
            onClickPaypal={handleClickPayment}
            isMobile={isMobile}
            t={t}
          />
        );
      case 4:
        return <AmazonPay onClickAmazonPay={handleClickPayment} t={t} />;
    }
  };
  return (
    <Container>
      <Title isMobile={isMobile}>
        {isMobile
          ? t('subscription:choose_payment')
          : t('subscription:payment_opton')}
      </Title>
      <Content isOption1={option === 1}>
        {option === 1 ? (
          <ContentOption1>
            <OptionPay>
              <ControlPayment onClick={() => setOption(2)}>
                <CreditCardIcon className={classes.creditLogo} />
                <SubText>{t('subscription:credit_card')}</SubText>
              </ControlPayment>
              <ControlPayment onClick={() => setOption(3)}>
                <Logo src="static/images/logo-paypal.png" />
              </ControlPayment>
              <ControlPayment onClick={() => setOption(4)}>
                <Logo src="static/images/logo-amazon.png" />
              </ControlPayment>
            </OptionPay>
            <TextFooter>{t('subscription:all_transaction')}</TextFooter>
          </ContentOption1>
        ) : (
          <Fragment>
            <OptionPayment>{renderPaymentOption()}</OptionPayment>
            <AnotherWayPay onClick={() => setOption(1)}>
              {t('subscription:choose_another_payment')}
            </AnotherWayPay>
          </Fragment>
        )}
      </Content>
    </Container>
  );
}

export default PaymentOption;
