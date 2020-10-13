import React from 'react';
import Button from '@Components/buttons/Button';
import IRegisterPage from '../../interfaces';

import { useStyles } from '../styles';
import Link from 'next/link';

function RegisterFormStep5(props: IRegisterPage.IProps) {
  const { t, resetFormData } = props;
  const classes = useStyles();

  return (
    <Link href="/login">
      <Button
        className={`${classes.margin} ${classes.btnContinue}`}
        color="primary"
        type="submit"
        isLoading={props.isRequesting}
        variant="outlined"
        text={t('auth:continue_with_setup')}
        onClick={resetFormData}
      />
    </Link>
  );
}

export default RegisterFormStep5;
