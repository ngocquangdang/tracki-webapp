import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import { Switch } from '@material-ui/core';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

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
  Layout,
  useStyles,
} from './styles';
import UserDatails from '../interfaces';
import { LANGUAGES, DATE_SETTINGS } from '../store/definitions';

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
  const { t, profile, errors, isRequesting } = props;

  const [userProfile, updateUserProfile] = useState<UserDatails.IStateUser>({
    email: '',
    first_name: '',
    last_name: '',
    phone_code: '',
    phone: '',
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
      phone_code: profile?.preferences?.phone_code || 'vn',
      phone: profile?.preferences?.phone || '',
      email_notifications: profile.preferences?.email_notifications,
      push_notifications: profile.preferences?.push_notifications,
      speed_unit: profile?.preferences?.speed_unit || 'kph',
      date_format: profile?.preferences?.date_format || 'DEFAULT',
      language: profile.preferences?.language || 'en',
    });
  }, [profile]);

  const onSubmitForm = (value: UserDatails.IStateUser) => {
    console.log('onSubmitForm -> value', value);
    const phoneNumber = parsePhoneNumberFromString(
      `+${value.phone_code}${value.phone}`
    );
    console.log('onSubmitForm -> phoneNumber', phoneNumber);
    // const isValidPhone = phoneNumber?.isValid();
    // if (isValidPhone) {
    // }
    // updateUSerRequestAction(value, profile.account_id);
  };

  if (!userProfile.email) {
    return (
      <>
        <Layout />
        <Loading>
          <CircularProgress />
        </Loading>
      </>
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
          const phoneNumber = parsePhoneNumberFromString(
            `+${values.phone_code}${values.phone}`
          );
          const isValidPhone = phoneNumber?.isValid();
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
                  defaultCountry={values.phone_code}
                  variant="outlined"
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  errorInput={
                    errorsForm.phone && touched.phone
                      ? t(errorsForm.phone)
                      : values.phone && !isValidPhone
                      ? t('auth:wrong_phone_format')
                      : errors.phone
                  }
                  onChangeInput={handleChange('phone_code')}
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
                    options={DATE_SETTINGS}
                    label={t('auth:date_format')}
                    value={values.date_format}
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
                    options={LANGUAGES}
                    label={t('auth:select_language')}
                    value={values.language}
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
