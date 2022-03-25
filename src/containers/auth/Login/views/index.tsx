import React, { useState } from 'react';
import Link from 'next/link';
// import { useSession, signIn, signOut } from 'next-auth/client';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import { FaGooglePlusG } from 'react-icons/fa';

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
  const { resetErrorAction } = props;

  const { t } = useTranslation('auth');
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  firebaseLogEventRequest('login_page', '');

  // useEffect(() => {
  //   if (session && session.accessToken) {
  //     const configData = {
  //       accessToken: session.accessToken,
  //       whiteLabel:
  //         process.env.NEXT_PUBLIC_API_URL === 'https://api.dev.tracki.com/api'
  //           ? 'TRACKI'
  //           : 'TRACKIMO',
  //       client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
  //       redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
  //     };
  //     loginSocialNetworkRequestAction(session.accessToken.provider, configData);
  //   }
  // }, [session, loginSocialNetworkRequestAction]);

  // useEffect(() => {
  //   async function getToken() {
  //     const { data } = await axios.get('api/jwt', {
  //       withCredentials: true,
  //     });
  //     if (data) {
  //       const configData = {
  //         accessToken: data,
  //         whiteLabel:
  //           process.env.NEXT_PUBLIC_API_URL === 'https://api.dev.tracki.com/api'
  //             ? 'TRACKI'
  //             : 'TRACKIMO',
  //         client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
  //         redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
  //       };
  //       loginSocialNetworkRequestAction('facebook', configData);
  //     }
  //   }
  //   getToken();
  // }, []);

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
          <Logo src="static/images/logo.png" alt="" />
          <Title>{t('login_into_tracki')}</Title>
          <Description>{t('login_description')}</Description>
          <LoginForm {...props} t={t} />
          <Line>{t('or')}</Line>
          {/* <Button
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
          /> */}
          <Link href="/create-account">
            <Button
              className={classes.blackBtn}
              variant="outlined"
              text={t('auth:create_new_tracki_account')}
              onClick={onCreateNewAccount}
            />
          </Link>
          {/* {!!session && <p>Signed in as {session.user.email} </p>}
          {!!session && <p onClick={signOut}>Sign out</p>}
          <iframe src="/api/auth/session" /> */}
        </Content>
        <Footer>
          <Contact>
            <Signature>© 2021 Tracki. All rights reserved.</Signature>
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
