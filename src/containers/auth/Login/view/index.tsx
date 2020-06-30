import React, { memo } from 'react';

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
import { Button } from '@material-ui/core';

export default function Login({}) {
  const classes = useStyles();

  return (
    <AuthLayout>
      <Container>
        <Logo src='images/logo.png' alt=''></Logo>
        <Title>Forgotten Password</Title>
        <SubTitle>
          {' '}
          Enter the email address associated with your account and we will send
          you instructions how to reset your password
        </SubTitle>
        <Form>
          <InputText
            className={classes.margin}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <Button
            className={`${classes.margin}, ${classes.btn}`}
            color="primary"
            variant="outlined"
          >
            reset password
          </Button>
          <Button className={`${classes["btn-cancel"]}`} variant="outlined">
            cancel
          </Button>
        </Form>
      </Container>
    </AuthLayout>
  );
}
