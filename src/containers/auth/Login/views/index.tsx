import React from 'react';
import Link from 'next/link';

import { AuthLayout } from '@Layouts';
import { Button } from '@Components/buttons';

import {
  Container,
  Footer,
  Contact,
  Line,
  GroupButton,
  Signature,
  Logo,
  Title,
  Description,
  Content,
  useStyles,
} from './styles';
import ILoginPage from '../interfaces';
import LoginForm from './form';

export default function Login(props: ILoginPage.IProps) {
  const { t } = props;
  const classes = useStyles();

  return (
    <AuthLayout>
      <Container>
        <Content>
          <Logo src="images/logo.png" alt="" />
          <Title>{t('login_into_tracki')}</Title>
          <Description>{t('login_description')}</Description>
          <LoginForm {...props} />
          <Line>{t('or')}</Line>
          <Link href="/create-account">
            <Button
              className={classes.blackBtn}
              variant="outlined"
              text={t('auth:create_account')}
            />
          </Link>
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
