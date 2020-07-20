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
  password: '',
  confirm_password: '',
};
export default function ChangePassword(props: any) {
  const classes = useStyles();
  const { t, errors, updatePasswordRequestAction } = props;

  const onHandleSubmit = (values: any) =>
    updatePasswordRequestAction({ password: values.password });

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
                    value=""
                    name="current_password"
                  />
                  <Line />
                </div>
                <Title>{t('auth:password')}</Title>
                <div className={classes.media}>
                  <PasswordInput
                    label={t('auth:password')}
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    errorInput={
                      errorsForm.password && touched.password
                        ? t(errorsForm.password)
                        : errors.password
                    }
                    name="password"
                  />
                  <PasswordInput
                    label={t('auth:confirm_new_password')}
                    value={values.confirm_password}
                    onChange={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    errorInput={
                      errorsForm.confirm_password && touched.confirm_password
                        ? t(errorsForm.confirm_password)
                        : errors.confirm_password
                    }
                    name="confirm_password"
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
