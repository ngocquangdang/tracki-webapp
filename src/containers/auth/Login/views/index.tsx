import React, { useState } from 'react';
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
import ChatUs from '../components/ChatUS';
import { Modal } from '@material-ui/core';

export default function Login(props: ILoginPage.IProps) {
  const { t } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
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
              text={t('auth:create_new_tracki_account')}
            />
          </Link>
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
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ width: '100%', height: '100%', top: '30%' }}
        >
          <ChatUs />
        </Modal>
      </Container>
    </AuthLayout>
  );
}
