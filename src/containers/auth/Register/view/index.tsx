import React from 'react';
import Link from 'next/link';
import { InfoRounded as InfoIcon } from '@material-ui/icons';
import { Entypo } from 'react-web-vector-icons';

import { AuthLayout } from '@Layouts';
import { Button } from '@Components/buttons';

import {
  Container,
  Title,
  SubTitle,
  Header,
  useStyles,
  Logo,
  Info,
  InfoText,
  Text,
  Footer,
} from './styles';
import IRegisterPage from '../interfaces';
import RegisterForm from './form';

function RegisterView(props: IRegisterPage.IProps) {
  const { t } = props;
  const classes = useStyles();

  return (
    <AuthLayout>
      <Header>
        <Link href="/login">
          <Button
            variant="text"
            classes={classes.backBtn}
            startIcon={<Entypo name="chevron-thin-left" size={20} />}
            text={t('back')}
          />
        </Link>
        <Logo src="images/logo.png" className={classes.logo} alt="" />
      </Header>
      <Container>
        <Title>{t('create_account')}</Title>
        <SubTitle>{t('create_an_account_description')}</SubTitle>
        <RegisterForm {...props} />
        <Info>
          <InfoIcon className={classes.infoIcon} />
          <InfoText>{t('password_tips')}</InfoText>
        </Info>
        <InfoText>
          {t('already_account')}{' '}
          <Link href="/login">
            <Text className={classes.link}>{t('login_here')}</Text>
          </Link>
        </InfoText>
      </Container>
      <Footer>
        <InfoText>
          {t('register_account_description')}{' '}
          <Link href="/terms">
            <Text className={classes.link}>{t('terms')}</Text>
          </Link>
          {' ' + t('and') + ' '}
          <Link href="/privacy-policy">
            <Text className={classes.link}>{t('privacy_policy')}</Text>
          </Link>
        </InfoText>
      </Footer>
    </AuthLayout>
  );
}

export default RegisterView;
