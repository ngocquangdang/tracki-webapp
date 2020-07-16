import React, { Fragment } from 'react';
import Button from '@Components/buttons/Button';
import IRegisterPage from '../../interfaces';

import { useStyles } from '../styles';
import Link from 'next/link';

function RegisterFormStep5(props: IRegisterPage.IProps) {
  const { t, onNextStep, resetFormData } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <Link href="/login">
        <Button
          className={`${classes.margin} ${classes.btnFullWidth}`}
          color="primary"
          type="submit"
          isLoading={props.isRequesting}
          variant="outlined"
          text={t('auth:click_here_login')}
          onClick={resetFormData}
        />
      </Link>
      <Link href="/forgot-password">
        <Button
          className={`${classes.margin} ${classes.btnFullWidth}`}
          color="primary"
          type="submit"
          isLoading={props.isRequesting}
          variant="outlined"
          text={t('auth:forgot_password')}
          onClick={resetFormData}
        />
      </Link>
      <Button
        className={`${classes.margin} ${classes.btnFullWidth}`}
        color="primary"
        type="submit"
        isLoading={props.isRequesting}
        variant="outlined"
        text={t('auth:create_new_tracki_account')}
        onClick={onNextStep}
      />
    </Fragment>
  );
}

export default RegisterFormStep5;
