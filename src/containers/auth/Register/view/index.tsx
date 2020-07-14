import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { AuthLayout } from '@Layouts';
import { Button } from '@Components/buttons';

import { Header, useStyles, Logo, Content } from './styles';
import IRegisterPage from '../interfaces';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';
import RegisterStep5 from './RegisterStep5';
import RegisterStep6 from './RegisterStep6';

function RegisterView(props: IRegisterPage.IProps) {
  const { t, errors, resetFormData } = props;
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
  const onChangeStep4 = (isSuccess: boolean) => {
    !isSuccess ? updateStep(6) : updateStep(5);
  };
  const handleChangeStep = (step: number) => () => {
    resetFormData();
    updateStep(step);
  };
  const renderStep = () => {
    switch (step) {
      case 2:
        return <RegisterStep2 {...props} onNextStep={onChangeStep(3)} />;
      case 3:
        return <RegisterStep3 {...props} onNextStep={onChangeStep(4)} />;
      case 4:
        return <RegisterStep4 {...props} onNextStep={onChangeStep4} />;
      case 5:
        return <RegisterStep5 {...props} />;
      case 6:
        return <RegisterStep6 {...props} onNextStep={handleChangeStep(1)} />;
      default:
        return <RegisterStep1 {...props} onNextStep={onChangeStep(2)} />;
    }
  };

  return (
    <AuthLayout isShowBG={step === 1}>
      <Content>
        {(step === 1 || step === 2 || step === 6) && (
          <Header>
            <Link href={step === 1 ? '/login' : '/create-account'}>
              <Button
                variant="text"
                classes={classes.backBtn}
                startIcon={<FiChevronLeft size={28} />}
                text={t('back')}
                onClick={() => updateStep(1)}
              />
            </Link>
            <Link href="/">
              <Logo
                src="images/logo.png"
                className={step === 1 ? classes.logo : classes.logo2}
                alt=""
              />
            </Link>
          </Header>
        )}
        {renderStep()}
      </Content>
    </AuthLayout>
  );
}

export default RegisterView;
