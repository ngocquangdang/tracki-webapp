import React from 'react';
import Slide from '@material-ui/core/Slide';
import { Container, Title } from './styles';
import IRegisterPage from '../interfaces';
import { RegisterFormStep3 } from './form';

function RegisterStep3(props: IRegisterPage.IProps) {
  const { t } = props;

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Container>
        <Title>{t('auth:create_account_step_3')}</Title>
        <RegisterFormStep3 {...props} />
      </Container>
    </Slide>
  );
}

export default RegisterStep3;
