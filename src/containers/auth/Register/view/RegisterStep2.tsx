import React from 'react';
import { Slide } from '@material-ui/core';
import { Container, TitleRegisterName, ContainerForm } from './styles';
import IRegisterPage from '../interfaces';
import { RegisterFormStep2 } from './form';

function RegisterStep2(props: IRegisterPage.IProps) {
  const { t } = props;

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Container isTitle>
        <TitleRegisterName>{t('auth:create_account_step_2')}</TitleRegisterName>
        <ContainerForm>
          <RegisterFormStep2 {...props} />
        </ContainerForm>
      </Container>
    </Slide>
  );
}

export default RegisterStep2;
