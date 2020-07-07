import React from 'react';
import Link from 'next/link';
import { InfoRounded as InfoIcon } from '@material-ui/icons';

import {
  Container,
  Content,
  Title,
  Line,
  PasswordForm,
  Info,
  InfoText,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';
import { PasswordInput } from '@Components/inputs';

export default function ChangePassword(props: any) {
  const classes = useStyles();
  const { t } = props;
  return (
    <Container>
      <Content>
        <PasswordForm>
          <Title>{t('auth:current_password')}</Title>
          <div className={classes.media}>
            <PasswordInput
              label={t('auth:enter_current_password')}
              value=""
              name="password"
            />
            <Line />
          </div>
          <Title>{t('auth:new_password')}</Title>
          <div className={classes.media}>
            <PasswordInput
              label={t('auth:new_password')}
              value=""
              name="password"
            />
            <PasswordInput
              label={t('auth:confirm_new_password')}
              value=""
              name="password"
            />{' '}
            <Info>
              <InfoIcon className={classes.infoIcon} />
              <InfoText>{t('password_tips')}</InfoText>
            </Info>
            <Link href="/create-account">
              <Button
                className={classes.btn}
                variant="outlined"
                text={t('auth:change_password')}
              />
            </Link>
          </div>
        </PasswordForm>
      </Content>
    </Container>
  );
}
