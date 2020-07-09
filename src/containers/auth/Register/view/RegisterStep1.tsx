import React from 'react';
import Link from 'next/link';
import { InfoRounded as InfoIcon } from '@material-ui/icons';

import {
  Container,
  Title,
  SubTitle,
  useStyles,
  Info,
  InfoText,
  InfoTextLogin,
  Text,
} from './styles';
import { Slide } from '@material-ui/core';
import IRegisterPage from '../interfaces';
import { RegisterFormStep1 } from './form';

function RegisterStep1(props: IRegisterPage.IProps) {
  const { t } = props;
  const classes = useStyles();

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Container>
        <Title isStep1>{t('create_account')}</Title>
        <SubTitle>{t('create_an_account_description')}</SubTitle>
        <RegisterFormStep1 {...props} />
        <Info>
          <InfoIcon className={classes.infoIcon} />
          <InfoText>{t('password_tips')}</InfoText>
        </Info>
        <InfoTextLogin>
          {t('already_account')}{' '}
          <Link href="/login">
            <Text className={classes.link}>{t('login_here')}</Text>
          </Link>
        </InfoTextLogin>
      </Container>
    </Slide>
  );
}

export default RegisterStep1;
