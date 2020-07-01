import React from 'react';
import Link from 'next/link';

import { AuthLayout } from '@Layouts';
import ILoginPage from '../../interfaces';

import Button from '@Components/buttons/Button';
import {
  Container,
  Logo,
  Footer,
  Contact,
  Line,
  useStyles,
} from './styles';
import LoginForm from '../form';


export default function Login(props: ILoginPage.IProps) {
  const { t } = props;
  const classes = useStyles();

  return (
    <AuthLayout>
      <Container>
        <Logo src="images/logo.png" alt="" />
        <LoginForm {...props}/>
        <Footer>
          <Line>{t('or')}</Line>
          <Link href="/create-account">
            <Button
              className={classes.blackBtn}
              variant="outlined"
              text={t('create_account')}
            />
          </Link>
          <Contact>
            <Button color="primary" text={t('call_us')} className={classes.textBtn} />
            <Button color="primary" text={t('chat_us')} className={classes.textBtn} />
          </Contact>
        </Footer>
      </Container>
    </AuthLayout>
  );
}
