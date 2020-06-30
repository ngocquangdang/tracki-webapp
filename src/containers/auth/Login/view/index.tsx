import React, { memo, useState } from 'react';

import Link from 'next/link';
import { AuthLayout } from '@Layouts';

import {
  Container,
  Logo,
  SubTitle,
  Form,
  InputText,
  Label,
  Footer,
  Contact,
  Item,
  Line,
  GroupButton,
  useStyles,
  FormPassword,
} from './styles';
import {
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ILoginPage from '../interfaces';

import TextFieldComp from '../../../../comps/inputs/TextField';
import PasswordFieldComp from 'src/comps/inputs/PasswordField';

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

  console.log('___VAL', values);

  return (
    <AuthLayout>
      <Container className={classes.media}>
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
            <SubTitle>{t('new_to_tracki')}?</SubTitle>
            <Button className={`${classes['btn-black']}`} variant="outlined">
              {t('create_account')}
            </Button>
          </GroupButton>
          <Contact>
            <Item></Item>
          </Contact>
        </Footer>
      </Container>
    </AuthLayout>
  );
}
