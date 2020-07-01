import React, { useState } from 'react';
import Link from 'next/link';

import { AuthLayout } from '@Layouts';
import ILoginPage from '../../interfaces';

import { TextInput, PasswordInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
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
} from './styles';

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
        <Logo src="images/logo.png" alt="" />
        <Form>
          <TextInput
            className={`${classes.margin}`}
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            variant="outlined"
          />
          <PasswordInput
            className={`${classes.margin}`}
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <Button
            className={`${classes.margin} ${classes.btn}`}
            color="primary"
            variant="outlined"
            text={t('log_in')}
          />
          <Link href="/forgot-password">
            <Label>{t('forgot_password')}?</Label>
          </Link>
        </Form>
        <Footer>
          <Line>{' ' + t('or') + ' '}</Line>
          <GroupButton>
            <Button
              className={classes.blackBtn}
              variant="outlined"
              text={t('create_account')}
            />
          </GroupButton>
          <Contact>
            <Button color="primary" text={t('call_us')} className={classes.textBtn} />
            <Button color="primary" text={t('chat_us')} className={classes.textBtn} />
          </Contact>
        </Footer>
      </Container>
    </AuthLayout>
  );
}
