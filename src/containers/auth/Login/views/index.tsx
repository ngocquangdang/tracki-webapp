import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

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
import ChatUs from '../components/ChatUS';
import Modal from '@Components/modals';
import { firebaseLogEventRequest } from '@Utils/firebase';
import axios from '@Utils/axios';

export default function Login(props: ILoginPage.IProps) {
  const { t, resetErrorAction } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [session] = useSession();

  firebaseLogEventRequest('login_page', '');

  useEffect(() => {
    if (session && session.accessToken) {
      console.log(
        '🚀 ~ file: index.tsx ~ line 37 ~ useEffect ~ session.accessToken',
        session.accessToken.accessToken
      );
      const configData = {
        accessToken: session.accessToken.accessToken,
        whiteLabel: 'TRACKIMO',
        client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
      };
      axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/v1/social/login/google',
        configData
      );
    }
  }, [session]);

  const handleOpenModal = () => {
    setOpen(true);
    resetErrorAction();
    firebaseLogEventRequest('login_page', 'chat_with_support');
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const onCreateNewAccount = () => {
    resetErrorAction();
    firebaseLogEventRequest('login_page', 'create_account');
  };

  return (
    <AuthLayout>
      <Container>
        <Content>
          <Logo src="/images/logo.png" alt="" />
          <Title>{t('login_into_tracki')}</Title>
          <Description>{t('login_description')}</Description>
          <LoginForm {...props} />
          <Line>{t('or')}</Line>
          <Link href="/create-account">
            <Button
              className={classes.blackBtn}
              variant="outlined"
              text={t('auth:create_new_tracki_account')}
              onClick={onCreateNewAccount}
            />
          </Link>
          {!session && (
            <>
              Not signed in <br />
              <a href="/api/auth/signin">sss</a>
              {/* <button onClick={() => signIn()}>Sign in</button> */}
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br />
              <a href="/api/auth/signout">sss</a>
            </>
          )}
          <iframe src="/api/auth/session" />
        </Content>
        <Footer>
          <Contact>
            <Signature>© 2020 Tracki. All rights reserved.</Signature>
            <GroupButton>
              <Button color="primary" text={t('call_us')} />
              <Button
                color="primary"
                text={t('chat_us')}
                onClick={handleOpenModal}
              />
            </GroupButton>
          </Contact>
        </Footer>
        <Modal
          open={open}
          handleClose={handleCloseModal}
          title={t('live_chat_support')}
        >
          <ChatUs {...props} />
        </Modal>
      </Container>
    </AuthLayout>
  );
}
