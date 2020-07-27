import React, { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import InfoIcon from '@material-ui/icons/Info';
import { Button } from '@Components/buttons';
import PaymentOption from '@Components/Payment';

import {
  Container,
  Header,
  Content,
  Logo,
  WrapTitle,
  Title,
  SubTitle,
  TextSub,
  TextNormal,
  TextBold,
  MainContent,
  useStyles,
} from './styles';
import SubscriptionStep1 from './components/SubscriptionStep1';
import SubscriptionStep2 from './components/SubscriptionStep2';

interface Props {
  isMobile: boolean;
}
function Subscription(props: Props) {
  const { isMobile } = props;
  const classes = useStyles();
  const [step, updateStep] = useState(1);
  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <SubscriptionStep2
            isMobile={isMobile}
            onChangePlan={() => updateStep(1)}
          />
        );
      default:
        return <SubscriptionStep1 onClickItemMessage={() => updateStep(2)} />;
    }
  };

  return (
    <Container>
      <Header>
        <Link href="/trackers">
          <Button
            variant="text"
            classes={classes.backBtn}
            startIcon={<FiChevronLeft size={28} />}
            text={isMobile ? 'Increase Text Alert Limit' : 'Back'}
          />
        </Link>
        <Link href="/">
          <Logo src="/images/logo.png" className={classes.logo2} alt="" />
        </Link>
      </Header>
      <Content>
        <WrapTitle>
          <Title>Increase Monthly Text Alert Limit</Title>
          <SubTitle>
            <InfoIcon className={classes.infoIcon} />
            <TextSub>
              <TextNormal>This month you used: </TextNormal>
              <TextBold>0 out of 30 text alerts</TextBold>
            </TextSub>
          </SubTitle>
        </WrapTitle>
        <MainContent isStep2={step === 2}>{renderStep()}</MainContent>
        {isMobile && step === 2 && (
          <PaymentOption
            handleClickPayment={() => console.log('xxxxxxxxx')}
            isMobile={isMobile}
          />
        )}
      </Content>
    </Container>
  );
}

export default Subscription;
