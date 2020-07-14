import React, { useState } from 'react';
import { Formik } from 'formik';
import { Switch } from '@material-ui/core';
// import Link from 'next/link';

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
// import { AnyArray } from 'immer/dist/internal';
import { UserSchema } from '../schema';

interface SettingState {
  language: {
    value: string;
    content: string;
  }[];
}
interface UserProfile {
  username: string;
  first_name: string;
  last_name: string;
  email_notifications: boolean;
  app_notification: boolean;
  speed_unit: string;
  date_format: string;
}

// let initialProfile = {
//   username: '',
//   first_name: '',
//   last_name: '',
//   email_notifications: true,
//   app_notification: true,
//   speed_unit: '',
//   date_format: '',
// };
export default function AccountSetting(props: any) {
  const classes = useStyles();
  const { t, profile } = props;
  console.log('AccountSetting -> profile', profile);
  const [language] = useState<SettingState>({
    language: [
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
  });
  const [profileUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email_notifications: true,
    app_notification: true,
    speed_unit: '',
    date_format: '',
  });

  const onChangeEmailNotifications = () =>
    console.log('______________onchangeEmailNotifi');

  const onChangeAppNotif = () => console.log('______________onchangeAppNotifi');

  const onSubmitForm = (value: any) => {
    console.log(value);
  };

  return (
    <Container>
      <Formik
        initialValues={profileUser}
        onSubmit={onSubmitForm}
        validationSchema={UserSchema}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Content onSubmit={handleSubmit}>
            <AccountForm>
              <Title>{t('auth:account_details')}</Title>
              <AccountDetail
                {...props}
                userProfile={values}
                handleChange={handleChange}
                className={classes.padding}
              />
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
                <span>{t('auth:email_notificationsication')}</span>
                <Switch
                  checked={values.email_notifications}
                  value={values.email_notifications}
                  onChange={onChangeEmailNotifications}
                  name="email_notifications"
                  color="primary"
                />
              </SwitchGroup>
              <SwitchGroup>
                <span>{t('auth:app_notification')}</span>
                <Switch
                  checked={values.app_notification}
                  value={values.app_notification}
                  onChange={onChangeAppNotif}
                  name="app_notification"
                  color="primary"
                />
              </SwitchGroup>
              <div className={classes.media}>
                <SelectOption
                  label={t('auth:select_language')}
                  option={language.language}
                />
              </div>
            </Notification>
            <div className={classes.media}>
              <Button
                className={`${classes.btn} ${classes.margin}`}
                variant="outlined"
                text={t('auth:save')}
                type="submit"
              />
            </div>
          </Content>
        )}
      </Formik>
    </Container>
  );
}
