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
import { firebaseLogEventRequest } from '@Utils/firebase';

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
  const { t, profile, errors, isRequesting, updatePrefrence, updateInfoUser } =
    props;
  const [userProfile, updateUserProfile] = useState<UserDatails.IStateUser>({
    email: '',
    first_name: '',
    last_name: '',
    init_phone_code: '',
    phone_code: '',
    phone: '',
    email_notifications: true,
    push_notifications: true,
    speed_unit: 'kph',
    date_format: '',
    language: 'en',
  });

  useEffect(() => {
    const phoneNumber = parsePhoneNumberFromString(`${profile?.phone}`);
    updateUserProfile({
      email: profile?.email || '',
      first_name: profile?.preferences?.first_name || '',
      last_name: profile?.preferences?.last_name || '',
      init_phone_code: phoneNumber?.country?.toLowerCase() || 'us',
      phone_code: phoneNumber?.countryCallingCode || '',
      phone: phoneNumber?.nationalNumber || '',
      email_notifications: profile.preferences?.email_notifications,
      push_notifications: profile.preferences?.push_notifications,
      speed_unit: profile?.preferences?.speed_unit || 'kph',
      date_format: profile?.preferences?.date_format || 'DEFAULT',
      language: profile.preferences?.language || 'en',
    });
  }, [profile]);

  const onSubmitForm = (value: UserDatails.IStateUser) => {
    if (value.first_name !== userProfile.first_name)
      firebaseLogEventRequest(
        'settings_page',
        'setting_page_update_first_name'
      );
    if (value.last_name !== userProfile.last_name)
      firebaseLogEventRequest('settings_page', 'setting_page_update_last_name');
    if (value.phone !== userProfile.phone)
      firebaseLogEventRequest('settings_page', 'setting_page_update_phone');
    if (value.phone_code !== userProfile.phone_code)
      firebaseLogEventRequest(
        'settings_page',
        'setting_page_update_phone_code'
      );

    const dataUpdatePreferences = {
      always_alert_contacts: false,
      date_format: value.date_format,
      email_notifications: value.email_notifications,
      first_name: value.first_name,
      hour_mode_24: true,
      language: value.language,
      last_name: value.last_name,
      push_notifications: value.push_notifications,
      sent_events: true,
      show_address: true,
      sos_alarm_sound: true,
      speed_unit: value.speed_unit,
      sqs_enabled: false,
      time_format: 'US',
      turn_off_notification: false,
      turn_on_notification: false,
    };

    const dataUpdateUser = {
      phone: `+${value.phone_code}${value.phone}`,
    };

    const phoneNumber = parsePhoneNumberFromString(
      `+${value.phone_code}${value.phone}`
    );
    const isValidPhone = phoneNumber?.isValid();
    firebaseLogEventRequest('settings_page', 'update_settings');
    if (isValidPhone) {
      updateInfoUser(dataUpdateUser);
      updatePrefrence(dataUpdatePreferences);
    }
  };

  if (!userProfile.email) {
    return (
      <>
        <Layout />
        <Loading>
          <CircularProgress className={classes.loading} />
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
            `+${values?.phone_code}${values?.phone}`
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
                      : errors?.firstName
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
                      : errors?.lastName
                  }
                  variant="outlined"
                />
                <PhoneNumberInput
                  label="Phone Number"
                  defaultCountry={values?.init_phone_code}
                  variant="outlined"
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  errorInput={
                    errorsForm.phone && touched.phone
                      ? t(errorsForm.phone)
                      : values.phone && !isValidPhone
                      ? t('auth:wrong_phone_format')
                      : errors?.phone
                  }
                  onChangeInput={handleChange('phone_code')}
                  searchStyle={{ width: '93%', height: '35px' }}
                  buttonStyle={{ left: 5 }}
                  searchPlaceholder="Search"
                />
                <SelectGroup>
                  <SubTitle>{t('speed_unit')}</SubTitle>
                  <RadioGroup
                    value={values.speed_unit}
                    onChange={e => {
                      handleChange('speed_unit')(e.target.value);
                      firebaseLogEventRequest(
                        'settings_page',
                        e.target.value === 'kph'
                          ? 'setting_page_select_kph'
                          : 'setting_page_select_mph'
                      );
                    }}
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
                  <div className={classes.selectOption}>
                    <SelectOption
                      name="date_format"
                      options={DATE_SETTINGS}
                      label={t('auth:date_format')}
                      value={values.date_format}
                      onChangeOption={e => {
                        handleChange('date_format')(e);
                        firebaseLogEventRequest(
                          'settings_page',
                          'setting_page_select_date_format'
                        );
                      }}
                    />
                  </div>
                </SelectGroup>
              </AccountForm>
              <Line />
              <Title>{t('auth:login_details')}</Title>
              <LoginForm>
                <TextInput
                  name="email_address"
                  label={t('auth:email_address')}
                  value={values.email}
                  variant="outlined"
                  onChange={handleChange('email_address')}
                  onBlur={handleBlur('email_address')}
                  className={classes.margin}
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
                      firebaseLogEventRequest(
                        'settings_page',
                        e.target.checked
                          ? 'activate_email_notification'
                          : 'deactivate_email_notification'
                      );
                    }}
                    color="primary"
                  />
                </SwitchGroup>
                <SwitchGroup>
                  <span>{t('auth:app_notification')}</span>
                  <Switch
                    checked={values.push_notifications}
                    value={values.push_notifications}
                    onChange={e => {
                      setFieldValue('push_notifications', e.target.checked);
                      firebaseLogEventRequest(
                        'settings_page',
                        e.target.checked
                          ? 'activate_app_notification'
                          : 'deactivate_app_notification'
                      );
                    }}
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
                    onChangeOption={value => {
                      handleChange('language')(value);
                      firebaseLogEventRequest(
                        'settings_page',
                        'setting_page_select_language'
                      );
                    }}
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
