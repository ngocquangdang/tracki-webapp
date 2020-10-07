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
  activation_date?: string;
  subscription_expiration: string;
  type_payment: string;
  nextStep(): void;
  isRequesting?: boolean;
  endStepChild?(): void;
  visa_last_4?: string;
  total_amount?: string | number;
}

export default function PaymentConfrim(props: Props) {
  const {
    t,
    today,
    device_id,
    price,
    subscription_expiration,
    nextStep,
    isRequesting,
    endStepChild,
    visa_last_4,
    total_amount,
  } = props;
  const classes = useStyles();

  const onNextStep = () => {
    nextStep();
    endStepChild && endStepChild();
  };
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
            <SubItem>{t('tracker:activation_date', { date: today })}</SubItem>
            <SubItem>
              {t('tracker:plan_paid_until', {
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
              {/* {t('tracker:payment_via', { payment: type_payment })} */}
              Visa Last 4: {visa_last_4}
            </SubItem>
            <SubItem>Total amount paid today: {total_amount}</SubItem>
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
          isLoading={isRequesting}
          className={classes.widthBtn}
          onClick={onNextStep}
        />
      </Footer>
    </>
  );
}
