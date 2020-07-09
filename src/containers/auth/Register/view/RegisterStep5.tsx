import React from 'react';
import {
  Container,
  TitleZipCode,
  ContainerText,
  TextGmail,
  ContainerForm,
  useStyles,
} from './styles';
import Slide from '@material-ui/core/Slide';
import IRegisterPage from '../interfaces';
import { RegisterFormStep5 } from './form';
import { FaCheckCircle } from 'react-icons/fa';

function RegisterStep5(props: IRegisterPage.IProps) {
  const { t, formData } = props;
  const classes = useStyles();

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Container isSucces>
        <FaCheckCircle className={classes.checkIcon} />
        <TitleZipCode isStep5>{t('auth:creation_success')}</TitleZipCode>
        <ContainerText>
          {t('auth:click_was_sent')}
          <TextGmail>{formData.username}</TextGmail>
          {t('auth:check_secondary')}
          <ContainerForm>
            <RegisterFormStep5 {...props} />
          </ContainerForm>
        </ContainerText>
      </Container>
    </Slide>
  );
}

export default RegisterStep5;
