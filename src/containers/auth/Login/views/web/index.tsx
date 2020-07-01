import React from 'react';

import { AuthLayout } from '@Layouts';
import { Button } from '@Components/buttons';

import {
  Container,
  Logo,
  SubTitle,
  Footer,
  GroupButton,
  useStyles,
} from './styles';
import ILoginPage from '../../interfaces';
import LoginForm from '../form';

export default function Login(props: ILoginPage.IProps) {
  const { t } = props;
  const classes = useStyles();

  return (
    <AuthLayout>
      <Container>
        <Logo src="images/logo.png" alt="" />
        <LoginForm {...props} />
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
