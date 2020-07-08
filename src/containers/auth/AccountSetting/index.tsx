import React, { useState } from 'react';
import { Switch } from '@material-ui/core';
import Link from 'next/link';

import {
  Container,
  Content,
  AccountForm,
  LoginForm,
  Notification,
  Title,
  SwitchGroup,
  Line,
  useStyles,
} from './styles';
import AccountDetail from './form/acountdetail';
import LoginDetail from './form/logindetail';
import SelectOption from '@Components/selections';
import { Button } from '@Components/buttons';

export default function AccountSetting(props: any) {
  const classes = useStyles();
  const { t } = props;
  const [Options, setOption] = useState([
    {
      value: 'null',
      content: '-- Select Language --',
    },
    {
      value: 'en',
      content: 'English (USA)',
    },
    {
      value: 'sp',
      content: 'Spanish',
    },
  ]);
  return (
    <Container>
      <Content>
        <AccountForm>
          <Title>{t('auth:account_details')}</Title>
          <AccountDetail {...props} className={classes.padding} />
        </AccountForm>
        <Line />
        <LoginForm>
          <Title>{t('auth:login_details')}</Title>
          <LoginDetail {...props} />
        </LoginForm>
        <Line />
        <Notification>
          <Title>{t('auth:event_notifications')}</Title>
          <SwitchGroup>
            <span>{t('auth:email_notification')}</span>
            <Switch
              // checked={values.remember_me}
              // value={values.remember_me}
              // onChange={handleChange}
              name="remember_me"
              color="primary"
            />
          </SwitchGroup>
          <SwitchGroup>
            <span>{t('auth:app_notification')}</span>
            <Switch
              // checked={values.remember_me}
              // value={values.remember_me}
              // onChange={handleChange}
              name="remember_me"
              color="primary"
            />
          </SwitchGroup>
          <div className={classes.media}>
            <SelectOption label={t('auth:select_language')} option={Options} />
          </div>
        </Notification>
        <div className={classes.media}>
          <Link href="/create-account">
            <Button
              className={`${classes.btn} ${classes.margin}`}
              variant="outlined"
              text={t('auth:save')}
            />
          </Link>
        </div>
      </Content>
    </Container>
  );
}
