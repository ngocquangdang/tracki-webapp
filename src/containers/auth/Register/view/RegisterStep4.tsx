import React from 'react';
import { Container, Title } from './styles';
import IRegisterPage from '../interfaces';
import { RegisterFormStep4 } from './form';

function RegisterStep4(props: IRegisterPage.IProps) {
  const { t } = props;

  return (
    <Container>
      <Title>{t('auth:create_account_step_4')}</Title>
      <RegisterFormStep4 {...props} />
    </Container>
  );
}

export default RegisterStep4;
