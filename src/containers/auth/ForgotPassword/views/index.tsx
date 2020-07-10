import React, { createRef, useState } from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { FiChevronLeft } from 'react-icons/fi';

import { AuthLayout } from '@Layouts';
import Button from '@Components/buttons/Button';
import { TextInput } from '@Components/inputs';

import {
  Container,
  Footer,
  Contact,
  Form,
  GroupButton,
  Signature,
  Logo,
  Content,
  Title,
  SubTitle,
  Header,
  useStyles,
} from './styles';
import IForgotPage from '../interfaces';

function ForgotPassword(props: IForgotPage.IProps) {
  const {
    t,
    errors,
    email,
    isRequesting,
    forgotRequestAction,
    confirmCodeRequestAction,
    resetErrorAction,
  } = props;
  const classes = useStyles();
  const ref = createRef();
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
    resetErrorAction();
  };

  return (
    <AuthLayout>
      <Container>
        <Header>
          <Link href="/login">
            <Button
              variant="text"
              classes={classes.backBtn}
              startIcon={<FiChevronLeft size={28} />}
              text={t('back')}
            />
          </Link>
          <Logo src="images/logo.png" className={classes.logo} alt="" />
        </Header>
        <Content>
          <Logo src="images/logo.png" alt="" />
          <Title>{t('auth:forgot_password')}</Title>
          {!email && (
            <SubTitle>{t('auth:forgot_password_description')}</SubTitle>
          )}
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
                  className={classes.margin}
                  label={t('auth:code')}
                  value={codeInput}
                  errorInput={errors.code}
                  onChange={handleChangeInput('code')}
                  variant="outlined"
                />
              </>
            ) : (
              <TextInput
                className={classes.margin}
                label="Email"
                errorInput={errors.email}
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
              <Button color="primary" ref={ref} text={t('common:cancel')} />
            </Link>
          </Form>
        </Content>
        <Footer>
          <Contact>
            <Signature>© 2020 Tracki. All rights reserved.</Signature>
            <GroupButton>
              <Button color="primary" text={t('call_us')} />
              <Button color="primary" text={t('chat_us')} />
            </GroupButton>
          </Contact>
        </Footer>
      </Container>
    </AuthLayout>
  );
}

export default ForgotPassword;
