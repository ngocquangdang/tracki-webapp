import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FaGooglePlusG, FaApple } from 'react-icons/fa';

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
import { useTranslation } from 'next-i18next';

export default function Login(props: ILoginPage.IProps) {
  const { resetErrorAction, loginSocialNetworkRequestAction } = props;

  const { t } = useTranslation('auth');
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const session = useSession();

  firebaseLogEventRequest('login_page', '');

  useEffect(() => {
    if (session && session.data) {
      const configData = {
        accessToken: session.data.accessToken,
        whiteLabel: 'TRACKI',
        client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
      };
      loginSocialNetworkRequestAction(
        session.data.provider as string,
        configData
      );
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
          <LoginForm {...props} t={t} />
          <Line>{t('or')}</Line>
          <Button
            className={classes.appleButton}
            variant="outlined"
            text="Login with Apple"
            startIcon={<FaApple size={28} />}
            onClick={() => signIn('apple')}
          />
          <Button
            className={classes.fbButton}
            variant="outlined"
            text="Login with Facebook"
            startIcon={<FacebookIcon className={classes.fbIcon} />}
            onClick={() => signIn('facebook')}
          />
          <Button
            className={classes.ggButton}
            variant="outlined"
            text="Login with Google"
            startIcon={<FaGooglePlusG size={28} />}
            onClick={() => signIn('google')}
          />
          <Link href="/create-account">
            <Button
              className={classes.blackBtn}
              variant="outlined"
              text={t('auth:create_new_tracki_account')}
              onClick={onCreateNewAccount}
            />
          </Link>
        </Content>
        <Footer>
          <Contact>
            <Signature>© 2022 Tracki. All rights reserved.</Signature>
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
