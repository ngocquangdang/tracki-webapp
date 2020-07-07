import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { AuthLayout } from '@Layouts';
import { Button } from '@Components/buttons';

import {
  Header,
  useStyles,
  Logo,
  InfoText,
  Content,
  Text,
  Footer,
  InfoTextTerm,
} from './styles';
import IRegisterPage from '../interfaces';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';
import RegisterStep5 from './RegisterStep5';

function RegisterView(props: IRegisterPage.IProps) {
  const { t, errors } = props;
  const classes = useStyles();
  const [step, updateStep] = useState(1);
  useEffect(() => {
    if (errors.password || errors.username) {
      updateStep(1);
    }
    if (errors.first_name || errors.last_name) {
      updateStep(2);
    }
    if (errors.phone) {
      updateStep(3);
    }
    if (errors.zip) {
      updateStep(4);
    }
  }, [errors]);
  const onChangeStep = (step: number) => () => updateStep(step);
  const renderStep = () => {
    switch (step) {
      case 2:
        return <RegisterStep2 {...props} onNextStep={onChangeStep(3)} />;
      case 3:
        return <RegisterStep3 {...props} onNextStep={onChangeStep(4)} />;
      case 4:
        return <RegisterStep4 {...props} onNextStep={onChangeStep(5)} />;
      case 5:
        return <RegisterStep5 {...props} />;
      default:
        return <RegisterStep1 {...props} onNextStep={onChangeStep(2)} />;
    }
  };

  return (
    <AuthLayout isShowBG={step === 1 ? true : false}>
      <Content>
        <Header>
          <Link href="/create-account">
            <Button
              variant="text"
              classes={classes.backBtn}
              startIcon={<FiChevronLeft size={28} />}
              text={t('back')}
            />
          </Link>
          <Logo
            src="images/logo.png"
            className={step === 1 ? classes.logo : ''}
            alt=""
          />
        </Header>
        {renderStep()}
        {step === 1 && (
          <Footer>
            <InfoText>
              {t('register_account_description')}{' '}
              <InfoTextTerm>
                <Link href="/terms">
                  <Text className={classes.link}>{t('terms')}</Text>
                </Link>
                {' ' + t('and') + ' '}
                <Link href="/privacy-policy">
                  <Text className={classes.link}>{t('privacy_policy')}</Text>
                </Link>
              </InfoTextTerm>
            </InfoText>
          </Footer>
        )}
      </Content>
    </AuthLayout>
  );
}

export default RegisterView;
