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

interface SettingState {
  options: {
    value: string;
    content: string;
  }[];
  email_notif: boolean;
  app_notif: boolean;
}
export default function AccountSetting(props: any) {
  const classes = useStyles();
  const { t } = props;
  const [values, setValue] = useState<SettingState>({
    options: [
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
    ],
    email_notif: true,
    app_notif: true,
  });
  const onChangeEmailNotif = () =>
    setValue({
      ...values,
      email_notif: !values.email_notif,
    });
  const onChangeAppNotif = () =>
    setValue({
      ...values,
      app_notif: !values.app_notif,
    });
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
              checked={values.email_notif}
              value={values.email_notif}
              onChange={onChangeEmailNotif}
              name="email_notif"
              color="primary"
            />
          </SwitchGroup>
          <SwitchGroup>
            <span>{t('auth:app_notification')}</span>
            <Switch
              checked={values.app_notif}
              value={values.app_notif}
              onChange={onChangeAppNotif}
              name="app_notif"
              color="primary"
            />
          </SwitchGroup>
          <div className={classes.media}>
            <SelectOption
              label={t('auth:select_language')}
              option={values.options}
            />
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
