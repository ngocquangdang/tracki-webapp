import React, { createRef, useState } from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';

import { AuthLayout } from '@Layouts';
import Button from '@Components/buttons/Button';
import {TextInput} from '@Components/inputs';

import {
  Container,
  Logo,
  Title,
  SubTitle,
  Form,
  useStyles,
} from './styles';
import IForgotPage from '../interfaces';

function ForgotPassword(props: IForgotPage.IProps) {
  const { t, errors, email, isRequesting, forgotRequestAction, confirmCodeRequestAction } = props;
  const classes = useStyles();
  const ref = createRef();
  const [emailInput, updateEmailInput] = useState('');
  const [codeInput, updateCodeInput] = useState('');

  const handleChangeInput = (key: string) => ({ target }: any) => {
    key === 'email' ? updateEmailInput(target.value) : updateCodeInput(target.value);
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
      <Container className={classes.media}>
        <Logo src='images/logo.png' alt=''></Logo>
        <Title>{t('auth:forgot_password')}</Title>
        {!email && (
          <SubTitle>
            {t('auth:forgot_password_description')}
          </SubTitle>
        )}
        <Form onSubmit={handleSubmit}>
          {email ? (
            <>
              <Typography className={classes.text}>{t('auth:sent_email_to', { text: email })}</Typography>
              <Typography className={classes.text}>{t('auth:sent_email_description')}</Typography>
              <TextInput
                className={classes.margin}
                label={t('auth:code')}
                value={codeInput}
                onChange={handleChangeInput('code')}
                variant="outlined"
              />
            </>
          ) : (
            <TextInput
              className={classes.margin}
              label={t('auth:email')}
              value={emailInput}
              onChange={handleChangeInput('email')}
              variant="outlined"
            />
          )}
          <Button
            classes={`${classes.margin}, ${classes.btn}`}
            text={t(email ? 'auth:confirm_code' : 'auth:reset_password')}
            isLoading={isRequesting}
            color="primary"
            onClick={handleSubmit}
            type="submit"
            variant="outlined"
          />
          <Link href="/login">
            <Button className={`${classes["btn-cancel"]}`} ref={ref} variant="outlined" text={t('common:cancel')} />
          </Link>
        </Form>
      </Container>
    </AuthLayout>
  );
}

export default ForgotPassword;
