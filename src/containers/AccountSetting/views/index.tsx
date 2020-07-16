import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import { Switch } from '@material-ui/core';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

import SelectOption from '@Components/selections';
import { Button } from '@Components/buttons';
import { UserSchema } from '../schema';
import { TextInput, PhoneNumberInput } from '@Components/inputs';
import {
  Container,
  Content,
  AccountForm,
  LoginForm,
  Notification,
  Title,
  SubTitle,
  SwitchGroup,
  Line,
  SelectGroup,
  Loading,
  useStyles,
} from './styles';
import UserDatails from '../interfaces';

interface SettingState {
  language: {
    value: string;
    content: string;
  }[];
  dateType: {
    value: string;
    content: string;
  }[];
}

export default function AccountSetting(props: any) {
  const classes = useStyles();
  const { t, profile, errors, isRequesting, updateUSerRequestAction } = props;

  const [state] = useState<SettingState>({
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
    dateType: [
      {
        value: 'DEFAULT',
        content: 'default',
      },
      {
        value: 'US',
        content: 'mm/dd/yyyy',
      },
      {
        value: 'dd/mm/yyyy',
        content: 'dd/mm/yyyy',
      },
    ],
  });
  const [userProfile, updateUserProfile] = useState<UserDatails.IStateUser>({
    email: '',
    first_name: '',
    last_name: '',
    // phone: '',
    email_notifications: true,
    push_notifications: true,
    speed_unit: 'kph',
    date_format: '',
    language: 'en',
  });
  useEffect(() => {
    updateUserProfile({
      email: profile.email || '',
      first_name: profile?.preferences?.first_name || '',
      last_name: profile?.preferences?.last_name || '',
      email_notifications: profile.preferences?.email_notifications,
      push_notifications: profile.preferences?.push_notifications,
      speed_unit: profile?.preferences?.speed_unit || 'kph',
      date_format: profile?.preferences?.date_format || 'DEFAULT',
      language: profile.preferences?.language || 'en',
    });
  }, [profile]);

  const onSubmitForm = (value: UserDatails.IStateUser) => {
    // const phoneNumber = parsePhoneNumberFromString(`+${code}${value.phone}`);
    // const isValidPhone = phoneNumber?.isValid();
    // if (isValidPhone) {
    // }
    updateUSerRequestAction(value, profile.account_id);
  };

  if (!userProfile.email) {
    return (
      <Loading>
        <CircularProgress />
      </Loading>
    );
  }

  return (
    <Container>
      <Formik
        initialValues={userProfile}
        onSubmit={onSubmitForm}
        validationSchema={UserSchema}
        enableReinitialize
      >
        {({
          values,
          errors: errorsForm,
          handleChange,
          setFieldValue,
          handleSubmit,
          handleBlur,
          touched,
        }) => {
          // const phoneNumber = parsePhoneNumberFromString(
          //   `+${code}${values.phone}`
          // );
          // const isValidPhone = phoneNumber?.isValid();
          return (
            <Content onSubmit={handleSubmit}>
              <Title>{t('auth:account_details')}</Title>
              <AccountForm>
                <TextInput
                  label={t('first_name')}
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  errorInput={
                    errorsForm.first_name && touched.first_name
                      ? t(errorsForm.first_name)
                      : errors.first_name
                  }
                  variant="outlined"
                />
                <TextInput
                  label={t('last_name')}
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  errorInput={
                    errorsForm.last_name && touched.last_name
                      ? t(errorsForm.last_name)
                      : errors.last_name
                  }
                  variant="outlined"
                />
                <PhoneNumberInput
                  label="Phone Number"
                  defaultCountry="us"
                  variant="outlined"
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value=""
                  // value={values.phone}
                  // errorInput={
                  //   errorsForm.phone && touched.phone
                  //     ? t(errorsForm.phone)
                  //     : values.phone && !isValidPhone
                  //     ? t('auth:wrong_phone_format')
                  //     : errors.phone
                  // }
                  // onChangeInput={(code: any) => setCode(code)}
                  searchStyle={{ width: '93%', height: '35px' }}
                />
                <SelectGroup>
                  <SubTitle>{t('speed_unit')}</SubTitle>
                  <RadioGroup
                    value={values.speed_unit}
                    onChange={e => handleChange('speed_unit')(e.target.value)}
                    name="speed_unit"
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel
                      value="kph"
                      control={<Radio color="primary" />}
                      label="KPH"
                      className={classes.fontSize}
                    />
                    <FormControlLabel
                      value="mph"
                      control={<Radio color="primary" />}
                      label="MPH"
                      className={classes.fontSize}
                    />
                  </RadioGroup>
                  <SelectOption
                    name="date_format"
                    defaultValues={values.date_format}
                    label={t('auth:date_format')}
                    option={state.dateType}
                    onChangeOption={handleChange('date_format')}
                  />
                </SelectGroup>
              </AccountForm>
              <Line />
              <Title>{t('auth:login_details')}</Title>
              <LoginForm>
                <TextInput
                  className={classes.margin}
                  label={t('auth:email_address')}
                  value={values.email}
                  variant="outlined"
                  disabled
                />
                <Link href="/change-password">
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    text={t('auth:change_password')}
                  />
                </Link>
              </LoginForm>
              <Line />
              <Title>{t('auth:event_notifications')}</Title>
              <Notification>
                <SwitchGroup>
                  <span>{t('auth:email_notification')}</span>
                  <Switch
                    name="email_notifications"
                    checked={values.email_notifications}
                    value={values.email_notifications}
                    onChange={e => {
                      setFieldValue('email_notifications', e.target.checked);
                    }}
                    color="primary"
                  />
                </SwitchGroup>
                <SwitchGroup>
                  <span>{t('auth:app_notification')}</span>
                  <Switch
                    checked={values.push_notifications}
                    value={values.push_notifications}
                    onChange={e =>
                      setFieldValue('push_notifications', e.target.checked)
                    }
                    onBlur={handleBlur('push_notifications')}
                    name="push_notifications"
                    color="primary"
                  />
                </SwitchGroup>
                <div className={classes.media}>
                  <SelectOption
                    defaultValues={values.language}
                    label={t('auth:select_language')}
                    option={state.language}
                    onChangeOption={handleChange('language')}
                    name="language"
                  />
                </div>
              </Notification>
              <div className={classes.media}>
                <Button
                  className={`${classes.btn} ${classes.margin}`}
                  variant="outlined"
                  isLoading={isRequesting}
                  text={t('auth:save')}
                  type="submit"
                />
              </div>
            </Content>
          );
        }}
      </Formik>
    </Container>
  );
}
