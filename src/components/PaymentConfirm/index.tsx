import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import {
  FormInfo,
  Subcription,
  BigTitle,
  TitleContent,
  Date,
  Payment,
  SubItem,
  Line,
  Header,
  Icon,
  Title,
  SubTitle,
  Container,
  Footer,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';

interface Props {
  t(key: string, format?: object): string;
  today: string;
  device_id: number | string;
  price: number | string | JSX.Element;
  activation_date: string;
  subscription_expiration: string;
  type_payment: string;
  nextStep(): void;
}

export default function PaymentConfrim(props: Props) {
  const {
    t,
    today,
    device_id,
    price,
    activation_date,
    subscription_expiration,
    type_payment,
    nextStep,
  } = props;
  const classes = useStyles();
  return (
    <>
      <Header>
        <Icon>
          <FaCheckCircle className={classes.icon} />
        </Icon>
        <Title>{t('tracker:payment_confirmed')}</Title>
        <SubTitle>{t('tracker:your_payment_was_successful')}</SubTitle>
      </Header>
      <Container>
        <FormInfo>
          <Subcription>
            <BigTitle>
              <TitleContent>{t('tracker:subscription_details')}</TitleContent>
              <Date>{today}</Date>
            </BigTitle>
            <SubItem>
              {t('tracker:device_id')}: {device_id}
            </SubItem>
            <SubItem>
              {t('tracker:device_plan')} {price}
            </SubItem>
            <SubItem>
              {t('tracker:activation_date', { date: activation_date })}
            </SubItem>
            <SubItem>
              {t('tracker:subscription_expiration', {
                date: subscription_expiration,
              })}
            </SubItem>
          </Subcription>
          <Line />
          <Payment>
            <BigTitle>
              <TitleContent>{t('tracker:payment_details')}</TitleContent>
            </BigTitle>
            <SubItem>
              {t('tracker:payment_via', { payment: type_payment })}
            </SubItem>
          </Payment>
        </FormInfo>
      </Container>
      <Footer>
        {' '}
        <Button
          color="primary"
          type="submit"
          variant="contained"
          text={t('tracker:continue')}
          className={classes.widthBtn}
          onClick={nextStep}
        />
      </Footer>
    </>
  );
}
