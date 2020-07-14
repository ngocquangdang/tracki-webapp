import React from 'react';
import { Container, ContainerText, TextGmail, ContainerForm } from './styles';
import Slide from '@material-ui/core/Slide';
import IRegisterPage from '../interfaces';
import { RegisterFormStep6 } from './form';

function RegisterStep5(props: IRegisterPage.IProps) {
  const { t, formData } = props;

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Container isSucces>
        <ContainerText>
          {t('auth:email_cannot_use')}
          <TextGmail>{formData.username}</TextGmail>
          {t('auth:choose_following')}
          <ContainerForm>
            <RegisterFormStep6 {...props} />
          </ContainerForm>
        </ContainerText>
      </Container>
    </Slide>
  );
}

export default RegisterStep5;
