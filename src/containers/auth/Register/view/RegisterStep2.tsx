import React from 'react';
import { Container, Title, ContainerForm } from './styles';
import IRegisterPage from '../interfaces';
import { RegisterFormStep2 } from './form';

function RegisterStep2(props: IRegisterPage.IProps) {
  const { t } = props;

  return (
    <Container isTitle>
      <Title>{t('auth:create_account_step_2')}</Title>
      <ContainerForm>
        <RegisterFormStep2 {...props} />
      </ContainerForm>
    </Container>
  );
}

export default RegisterStep2;
