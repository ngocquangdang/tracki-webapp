import React from 'react';
import {
  Container,
  Title,
  ContainerText,
  TextGmail,
  ContainerForm,
  useStyles,
} from './styles';
import IRegisterPage from '../interfaces';
import { RegisterFormStep5 } from './form';
import { FaCheckCircle } from 'react-icons/fa';

function RegisterStep5(props: IRegisterPage.IProps) {
  const { t, formData } = props;
  const classes = useStyles();

  return (
    <Container isSucces>
      <FaCheckCircle className={classes.checkIcon} />
      <Title isStep5>{t('auth:creation_success')}</Title>
      <ContainerText>
        {t('auth:click_was_sent')}
        <TextGmail>{formData.username}</TextGmail>
        {t('auth:check_secondary')}
        <ContainerForm>
          <RegisterFormStep5 {...props} />
        </ContainerForm>
      </ContainerText>
    </Container>
  );
}

export default RegisterStep5;
