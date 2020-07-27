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

interface Props {
  isMobile: boolean;
  onChangePlan(): void;
}
function SubscriptionStep2(props: Props) {
  const { isMobile, onChangePlan } = props;
  const classes = useStyles();
  return (
    <Container>
      <ControlChangePlan onClick={onChangePlan}>
        <ArrowBackIosIcon className={classes.backBtn} />
        <TextChange>Change Plan</TextChange>
      </ControlChangePlan>
      <InfoSubcription>
        <Country>USA/Canada (+1)</Country>
        <DetailIncrease>
          <TypeMessage>Plan 50 SMS Monthly </TypeMessage>
          <Price> 3.95 USD</Price>
        </DetailIncrease>
      </InfoSubcription>
      <SelectPayment>
        {isMobile ? null : (
          <PaymentOption
            handleClickPayment={() => console.log('xxxxxxxxx')}
            isMobile={isMobile}
          />
        )}
      </SelectPayment>
    </Container>
  );
}

export default SubscriptionStep2;
