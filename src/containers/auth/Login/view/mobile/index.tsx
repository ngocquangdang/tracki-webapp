import React, { useState } from 'react';
import Link from 'next/link';

import { Button } from '@material-ui/core';

import { AuthLayout } from '@Layouts';
import ILoginPage from '../../interfaces';

import TextFieldComp from '../../../../../comps/inputs/TextField';
import PasswordFieldComp from 'src/comps/inputs/PasswordField';
import {
  Container,
  Logo,
  Form,
  Label,
  Footer,
  Contact,
  Line,
  GroupButton,
  useStyles,
} from './stylesMobile';

interface StateLogin {
  email: string;
  password: string;
}

export default function Login(props: ILoginPage.IProps) {
  const { t } = props;
  const classes = useStyles();
  const [values, setValues] = useState<StateLogin>({
    email: '',
    password: '',
  });

  const handleChange = (data: any) => {
    setValues({ ...values, ...data });
  };
  return (
    <AuthLayout>
      <Container>
        <Logo src="images/logo.png" alt=""></Logo>
        <Form>
          <TextFieldComp
            className={`${classes.margin}`}
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            variant="outlined"
          />
          <PasswordFieldComp
            className={`${classes.margin}`}
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          ></PasswordFieldComp>
          <Button
            className={`${classes.margin} ${classes.btn}`}
            color="primary"
            variant="outlined"
          >
            {t('log_in')}
          </Button>
          <Link href="/forgot-password">
            <Label>{t('forgot_password')}?</Label>
          </Link>
        </Form>
        <Footer>
          <Line>OR</Line>
          <GroupButton>
            <Button className={`${classes['btn-black']}`} variant="outlined">
              {t('create_account')}
            </Button>
          </GroupButton>
          <Contact>
            <Button color="primary">{t('call_us')}</Button>
            <Button color="primary">{t('chat_us')}</Button>
          </Contact>
        </Footer>
      </Container>
    </AuthLayout>
  );
}
