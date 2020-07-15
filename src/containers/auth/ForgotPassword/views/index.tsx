import React, { useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

import { AuthLayout } from '@Layouts';
import Button from '@Components/buttons/Button';

import {
  Container,
  Footer,
  Contact,
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
import EmailFrom from './form/EmailForm';
import CodeFrom from './form/CodeForm';
import ForgotPasswordForm from './form/ChangePasswordForm';

function ForgotPassword(props: IForgotPage.IProps) {
  const { t, email, code, resetStore } = props;
  const classes = useStyles();

  useEffect(() => {
    return () => {
      resetStore();
    };
  }, []);

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
          <Link href="/login">
            <Logo src="images/logo.png" className={classes.logo} alt="" />
          </Link>
        </Header>
        <Content>
          <Logo src="images/logo.png" alt="" className={classes.logo2} />
          <Title>{t('auth:forgot_password')}</Title>
          {!email && (
            <SubTitle className={classes.desc1}>
              {t('auth:forgot_password_description')}
            </SubTitle>
          )}
          <div>
            {email && code ? (
              <ForgotPasswordForm {...props} />
            ) : email ? (
              <CodeFrom {...props} />
            ) : (
              <EmailFrom {...props} />
            )}
            {!email && (
              <SubTitle className={classes.desc2}>
                {t('auth:forgot_password_description')}
              </SubTitle>
            )}
          </div>
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
