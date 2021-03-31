import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FaGooglePlusG } from 'react-icons/fa';

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

export default function Login(props: ILoginPage.IProps) {
  const { t, resetErrorAction, loginSocialNetworkRequestAction } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [session] = useSession();

  firebaseLogEventRequest('login_page', '');

  useEffect(() => {
    if (session && session.accessToken) {
      const configData = {
        accessToken:
          'EAADr8F9pl4cBAPe46RZBGiMKXkr0L9PIxr2CKBSVWGnOUJT8aaPa0PuZBfnke8oILfDW5YJcs8BZBVxCY6KNzUr8Q9OTCUJBE0a1cIkiZAbVZAvceErtrigHB1ybOO7porPTwZBZA0JkdpsoNM82Gc5I1Da4hOrj5wn0tgCdcK7GoSDKeObGmMmSn93mv9kg7CGfyYGp8wrhJDS1MjkDznMZAwqqpOPEOMMZD',
        whiteLabel:
          process.env.NEXT_PUBLIC_API_URL === 'https://api.dev.tracki.com/api'
            ? 'TRACKI'
            : 'TRACKI',
        client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
      };
      loginSocialNetworkRequestAction(session.accessToken.provider, configData);
    }
  }, [session, loginSocialNetworkRequestAction]);

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

          <Link href="/api/auth/signin/facebook">
            <Button
              className={classes.fbButton}
              variant="outlined"
              text="Login with Facebook"
              startIcon={<FacebookIcon className={classes.fbIcon} />}
            />
          </Link>
          <Link href="/api/auth/signin/google">
            <Button
              className={classes.ggButton}
              variant="outlined"
              text="Login with Google"
              startIcon={<FaGooglePlusG size={28} />}
            />
          </Link>
          <Link href="/create-account">
            <Button
              className={classes.blackBtn}
              variant="outlined"
              text={t('auth:create_new_tracki_account')}
              onClick={onCreateNewAccount}
            />
          </Link>
          {!!session && <p>Signed in as {session.user.email} </p>}
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
