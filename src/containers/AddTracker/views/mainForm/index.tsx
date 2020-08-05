import React, { useState } from 'react';

import AddTrackerLayout from '../MainLayout';

import Step from '@material-ui/core/Step';
import Step1 from '../step1';
import Step2 from '../step2';
import Step3 from '../step3';
import { Button } from '@Components/buttons';
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
  Congratulation,
  CongratulationTitle,
  CongratulationSubTitle,
  CongratulationTracker,
  CongratulationIcon,
} from './styles';
import { FaPen } from 'react-icons/fa';
import PaymentConfirmContainer from '../step2/step2.1';
import ReferralCodeContainer from '../step2/step2.2';
import CongratulationContainer from '../step2/step2.3';

import { IoMdPin } from 'react-icons/io';

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
    updateStepChild(value);
  };
  const onNextStepChild = (stepChild: string) => () => {
    updateStepChild(stepChild);
  };
  const onNextStep = (step: number) => () => {
    setActiveStep(step);
  };
  const onNextStep1 = (assigned: boolean) =>
    assigned ? setActiveStep(1) : setActiveStep(0);
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 {...props} onNextStep={onNextStep1} />;
      case 1:
        return (
          <Step2
            {...props}
            updateStepChild={onUpdateStepChild}
            onNextStep={onNextStep(2)}
          />
        );
      case 2:
        return <Step3 {...props} onNextStep={onNextStep(3)} />;
      default:
        return 'Unknown step';
    }
  };

  const handleBack = (step: number) => () => setActiveStep(step);

  const renderStep = () => {
    switch (stepChild) {
      case 'payment_confirm':
        return (
          <PaymentConfirmContainer
            {...props}
            nextStep={onNextStepChild('referral_code')}
          />
        );

      case 'referral_code':
        return (
          <ReferralCodeContainer
            {...props}
            EndStepChild={onNextStepChild('')}
            nextStep={onNextStep(2)}
            NextStepChild={onNextStepChild('congratulation')}
          />
        );
      case 'congratulation':
        return (
          <CongratulationContainer
            {...props}
            nextStep={onNextStep(2)}
            NextStepChild={onNextStepChild('')}
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
            <Title>{t('tracker:add_tracker')}</Title>
            <SubTitle>
              {activeStep === steps.length
                ? t('tracker:add_tracker_successed')
                : t('tracker:add_tracker_subcription')}
            </SubTitle>
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
                        className={`${
                          activeStep > index && activeStep !== 0
                            ? classes.show
                            : classes.hidden
                        } ${activeStep === 3 && classes.hidden}`}
                        onClick={handleBack(index)}
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
                  </StepContentStyle>
                </Step>
              ))}
            </StepperStyle>
            {activeStep === steps.length && (
              <Congratulation>
                <CongratulationTitle>
                  {t('tracker:congratulations')}
                </CongratulationTitle>
                <CongratulationSubTitle>
                  {t('tracker:congratulation_subscription')}
                  <br />
                  {t('tracker:view_tracker')}
                </CongratulationSubTitle>
                <CongratulationIcon>
                  <IoMdPin className={classes.icon} />
                </CongratulationIcon>
                <CongratulationTracker>tracker name</CongratulationTracker>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  text={t('tracker:view_tracker_on_map')}
                  className={classes.widthBtn}
                  onClick={props.nextStep}
                />
              </Congratulation>
            )}
          </Content>
        </Container>
      )}
    </AddTrackerLayout>
  );
}
