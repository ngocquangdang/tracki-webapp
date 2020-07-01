import React, { useState } from 'react';
import Link from 'next/link';
import { Typography, IconButton } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { AuthLayout } from '@Layouts';

import Button from '@Components/buttons/Button';
import { TextInput } from '@Components/inputs';
import {
  Container,
  Logo,
  Title,
  SubTitle,
  Form,
  Header,
  useStyles,
} from './styles';
import IForgotPage from '../../interfaces';

function ForgotPassword(props: IForgotPage.IProps) {
  const {
    t,
    errors,
    email,
    isRequesting,
    forgotRequestAction,
    confirmCodeRequestAction,
  } = props;
  const classes = useStyles();
  const [emailInput, updateEmailInput] = useState('');
  const [codeInput, updateCodeInput] = useState('');

  const handleChangeInput = (key: string) => ({ target }: any) => {
    key === 'email'
      ? updateEmailInput(target.value)
      : updateCodeInput(target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      return confirmCodeRequestAction({ email, code: codeInput });
    }
    forgotRequestAction({ email: emailInput });
  };

  return (
    <AuthLayout>
      <Header>
        <Link href="/login">
          <IconButton style={{ padding: 0 }}>
            <KeyboardArrowLeft />
          </IconButton>
        </Link>
        <Logo src="images/logo.png" alt="" />
      </Header>
      <Container>
        <Title>{t('auth:forgot_password')}</Title>
        <Form onSubmit={handleSubmit}>
          {email ? (
            <>
              <Typography className={classes.text}>
                {t('auth:sent_email_to', { text: email })}
              </Typography>
              <Typography className={classes.text}>
                {t('auth:sent_email_description')}
              </Typography>
              <TextInput
                label={t('auth:code')}
                errorInput={errors.code}
                value={codeInput}
                onChange={handleChangeInput('code')}
                variant="outlined"
              />
            </>
          ) : (
            <TextInput
              label={t('auth:email')}
              value={emailInput}
              errorInput={errors.email}
              onChange={handleChangeInput('email')}
              variant="outlined"
            />
          )}
          {!email && (
            <SubTitle>{t('auth:forgot_password_description')}</SubTitle>
          )}
          <Button
            classes={`${classes.margin} ${classes.btn}`}
            text={t(email ? 'auth:confirm_code' : 'auth:reset_password')}
            isLoading={isRequesting}
            color="primary"
            onClick={handleSubmit}
            type="submit"
            variant="outlined"
          />
        </Form>
      </Container>
    </AuthLayout>
  );
}

export default ForgotPassword;
