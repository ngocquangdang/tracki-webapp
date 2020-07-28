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
  t(key: string): string;
}
function Subscription(props: Props) {
  const { isMobile, t } = props;
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [dataMessage, setDataMessage] = useState({
    currency: '',
    groupId: 2,
    planId: 1,
    price: 3.95,
    smsLimit: 50,
  });
  const handleClickItemMessage = (item, country) => {
    setDataMessage(item);
    setSelectedCountry(country.description);
    updateStep(2);
  };
  const [step, updateStep] = useState(1);
  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <SubscriptionStep2
            isMobile={isMobile}
            onChangePlan={() => updateStep(1)}
            detailMessage={dataMessage}
            selectedCountry={selectedCountry}
            t={t}
          />
        );
      default:
        return (
          <SubscriptionStep1
            onClickItemMessage={handleClickItemMessage}
            t={t}
          />
        );
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
            t={t}
          />
        )}
      </Content>
    </Container>
  );
}

export default Subscription;
