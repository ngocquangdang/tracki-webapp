import React, { useState } from 'react';

import AddTrackerLayout from '../MainLayout';

import Step from '@material-ui/core/Step';
import Step1 from '../step1';
import Step2 from '../step2';
import Step3 from '../step3';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  LableStyle,
  StepContentStyle,
  StepperStyle,
  Review,
  useStyles,
} from './styles';
import { FaPen } from 'react-icons/fa';
import AddDeviceStep21 from '../step2/step2.1';
import AddDeviceStep22 from '../step2/step2.2';
import AddDeviceStep23 from '../step2/step2.3';

export default function MainForm(props: any) {
  const classes = useStyles();
  const { t } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [stepChild, updateStepChild] = useState('');

  const steps = [
    { step: 'Enter tracker details', activeStep: 0 },
    { step: 'Select plan', activeStep: 1 },
    { step: 'Personalize', activeStep: 2 },
  ];

  const onUpdateStepChild = value => {
    console.log(value);
    updateStepChild(value);
  };
  const onNextStepChild = (stepChild: string) => () => {
    updateStepChild(stepChild);
  };
  const onNextStep = (step: number) => () => {
    console.log('dddddd', step);
    setActiveStep(step);
  };
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Step1
            {...props}
            onNextStep={onNextStep(1)}
            // isActive={onIsActive(steps[step], 0)}
          />
        );
      case 1:
        return <Step2 {...props} updateStepChild={onUpdateStepChild} />;
      case 2:
        return <Step3 {...props} />;
      default:
        return 'Unknown step';
    }
  };

  // const onIsActive = (step, index: number) => () => {
  //   const newState = {}
  //   console.log('onIsActive -> newState', newState);
  //   setSteps();
  // };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const renderStep = () => {
    switch (stepChild) {
      case 'payment_confirm':
        return (
          <AddDeviceStep21
            {...props}
            nextStep={onNextStepChild('referral_code')}
          />
        );
      case 'referral_code':
        return (
          <AddDeviceStep22
            {...props}
            nextStep={onNextStepChild('congratulation')}
          />
        );
      case 'congratulation':
        return (
          <AddDeviceStep23
            {...props}
            nextStep={(onNextStep(2), onNextStepChild(''))}
          />
        );
    }
  };

  return (
    <AddTrackerLayout>
      {stepChild !== '' ? (
        renderStep()
      ) : (
        <Container>
          <Header>
            <Title>Add Tracker</Title>
            <SubTitle>Let's setup your tracking device</SubTitle>
          </Header>
          <Content>
            <StepperStyle
              activeStep={activeStep}
              orientation="vertical"
              style={{ color: 'black' }}
            >
              {steps?.map((steps, index) => (
                <Step key={index}>
                  <LableStyle>
                    {steps.step}
                    {
                      <Review
                        className={
                          activeStep > index && activeStep !== 0
                            ? classes.show
                            : classes.hidden
                        }
                        onClick={handleBack}
                      >
                        <FaPen className={classes.marginIcon} />
                        {t('tracker:review')}
                      </Review>
                    }
                  </LableStyle>
                  <StepContentStyle>
                    <div className="MuiTypography-root MuiTypography-body1">
                      {getStepContent(index)}
                    </div>
                    <div>
                      {/* <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button> */}
                      {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                      {/* </Button> */}
                    </div>
                  </StepContentStyle>
                </Step>
              ))}
            </StepperStyle>
          </Content>
        </Container>
      )}
    </AddTrackerLayout>
  );
}
