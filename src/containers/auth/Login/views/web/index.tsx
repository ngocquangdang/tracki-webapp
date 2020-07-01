import React, { useState } from 'react';
import Link from 'next/link';

import { AuthLayout } from '@Layouts';
import { TextInput, PasswordInput } from '@Components/inputs';
import { Button } from '@Components/buttons';

import {
  Container,
  Logo,
  SubTitle,
  Form,
  Label,
  Footer,
  GroupButton,
  useStyles,
} from './styles';
import ILoginPage from '../../interfaces';

export default function Login(props: ILoginPage.IProps) {
  const { t } = props;
  const classes = useStyles();
  const [values, setValues] = useState<ILoginPage.IStateLogin>({
    email: '',
    password: '',
  });

  const handleChange = (data: any) => {
    setValues({ ...values, ...data });
  };

  return (
    <AuthLayout>
      <Container>
        <Logo src="images/logo.png" alt=""/>
        <Form>
          <TextInput
            className={`${classes.margin}`}
            label={t('email')}
            name="email"
            value={values.email}
            onChange={handleChange}
            variant="outlined"
          />
          <PasswordInput
            className={`${classes.margin}`}
            label={t('password')}
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <Button
            classes={`${classes.margin} ${classes.btn}`}
            text={t('log_in')}
            color="primary"
            variant="outlined"
          />
          <Link href="/forgot-password">
            <Label>{t('forgot_password')}?</Label>
          </Link>
        </Form>
        <Footer>
          <GroupButton>
            <SubTitle>{t('new_to_tracki')}?</SubTitle>
            <Button
              classes={classes.blackBtn}
              variant="outlined"
              text={t('create_account')}
            />
          </GroupButton>
        </Footer>
      </Container>
    </AuthLayout>
  );
}
