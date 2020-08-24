import React from 'react';
import { Formik } from 'formik';
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
import { ForgotPasswordFromSchema } from '../schema';

const InitialPassword = {
  current_password: '',
  new_password: '',
  confirm_password: '',
};
export default function ChangePassword(props: any) {
  const classes = useStyles();
  const { t, errors, updatePasswordRequestAction } = props;

  const onHandleSubmit = (values: any) =>
    updatePasswordRequestAction({
      current_password: values.current_password,
      new_password: values.new_password,
    });

  return (
    <Container>
      <Formik
        initialValues={InitialPassword}
        onSubmit={onHandleSubmit}
        validationSchema={ForgotPasswordFromSchema}
      >
        {({
          values,
          errors: errorsForm,
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
        }) => {
          return (
            <Content onSubmit={handleSubmit}>
              <PasswordForm>
                <Title>{t('auth:current_password')}</Title>
                <div className={classes.media}>
                  <PasswordInput
                    label={t('auth:enter_current_password')}
                    value={values.current_password}
                    name="current_password"
                    onChange={handleChange('current_password')}
                    onBlur={handleBlur('current_password')}
                    errorInput={
                      errorsForm.current_password && touched.current_password
                        ? t(errorsForm.current_password)
                        : errors.current_password
                    }
                  />
                  <Line />
                </div>
                <Title>{t('auth:password')}</Title>
                <div className={classes.media}>
                  <PasswordInput
                    label={t('auth:password')}
                    name="password"
                    value={values.new_password}
                    onChange={handleChange('new_password')}
                    onBlur={handleBlur('new_password')}
                    errorInput={
                      errorsForm.new_password && touched.new_password
                        ? t(errorsForm.new_password)
                        : errors.new_password
                    }
                  />
                  <PasswordInput
                    label={t('auth:confirm_new_password')}
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    errorInput={
                      errorsForm.confirm_password && touched.confirm_password
                        ? t(errorsForm.confirm_password)
                        : errors.confirm_password
                    }
                  />{' '}
                  <Info>
                    <InfoIcon className={classes.infoIcon} />
                    <InfoText>{t('password_tips')}</InfoText>
                  </Info>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    text={t('auth:change_password')}
                    type="submit"
                  />
                </div>
              </PasswordForm>
            </Content>
          );
        }}
      </Formik>
    </Container>
  );
}
