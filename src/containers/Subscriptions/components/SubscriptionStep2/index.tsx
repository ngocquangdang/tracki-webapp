import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PaymentOption from '@Components/Payment';

import {
  Container,
  ControlChangePlan,
  TextChange,
  InfoSubcription,
  Country,
  DetailIncrease,
  TypeMessage,
  Price,
  SelectPayment,
  useStyles,
} from './styles';

interface DetailMessage {
  currency: string;
  groupId: number;
  planId: number;
  price: number;
  smsLimit: number;
}

interface Props {
  detailMessage: DetailMessage;
  isMobile: boolean;
  onChangePlan(): void;
  selectedCountry: string;
  t(key: string): string;
}
function SubscriptionStep2(props: Props) {
  const { isMobile, detailMessage, selectedCountry, onChangePlan, t } = props;
  const classes = useStyles();
  return (
    <Container>
      <ControlChangePlan onClick={onChangePlan}>
        <ArrowBackIosIcon className={classes.backBtn} />
        <TextChange>{t('subscription:change_plan')}</TextChange>
      </ControlChangePlan>
      <InfoSubcription>
        <Country>{selectedCountry}</Country>
        <DetailIncrease>
          <TypeMessage>
            {`${t('subscription:text_plan')} ${detailMessage.smsLimit} ${t(
              'subscription:monthly'
            )}`}
          </TypeMessage>
          <Price>
            {detailMessage.price} {detailMessage.currency}
          </Price>
        </DetailIncrease>
      </InfoSubcription>
      <SelectPayment>
        {isMobile ? null : (
          <PaymentOption
            handleClickPayment={() => console.log('xxxxxxxxx')}
            isMobile={isMobile}
            t={t}
          />
        )}
      </SelectPayment>
    </Container>
  );
}

export default SubscriptionStep2;
