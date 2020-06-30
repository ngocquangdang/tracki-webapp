import React from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';

import { AuthLayout } from '@Layouts';
import {
  Container,
  Logo,
  Title,
  SubTitle,
  Form,
  InputText,
  useStyles,
} from './styles';
import IForgotPage from '../interfaces';

function ForgotPassword(props: IForgotPage.IProps) {
  const { t } = props;
  const classes = useStyles();

  return (
    <AuthLayout>
      <Container className={classes.media}>
        <Logo src='images/logo.png' alt=''></Logo>
        <Title>{t('forgot_password')}</Title>
        <SubTitle>
          {t('forgot_password_description')}
        </SubTitle>
        <Form>
          <InputText
            className={classes.margin}
            label="Email"
            variant="outlined"
          />
          <Button
            className={`${classes.margin}, ${classes.btn}`}
            color="primary"
            variant="outlined"
          >
            {t('reset_password')}
          </Button>
          <Link href="/login">
            <Button className={`${classes["btn-cancel"]}`} variant="outlined">
              {t('cancel')}
          </Button>
          </Link>
        </Form>
      </Container>
    </AuthLayout>
  );
}

export default ForgotPassword;
