import React from 'react';
import Slide from '@material-ui/core/Slide';
import { Container, TitleZipCode } from './styles';
import IRegisterPage from '../interfaces';
import { RegisterFormStep4 } from './form';

function RegisterStep4(props: IRegisterPage.IProps) {
  const { t } = props;

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Container>
        <TitleZipCode>{t('auth:create_account_step_4')}</TitleZipCode>
        <RegisterFormStep4 {...props} />
      </Container>
    </Slide>
  );
}

export default RegisterStep4;
