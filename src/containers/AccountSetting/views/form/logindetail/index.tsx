import React from 'react';
import Link from 'next/link';

import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { Form, useStyles } from './styles';

export default function LoginDetail(props: any) {
  const classes = useStyles();
  const { t } = props;

  return (
    <Form>
      <TextInput
        label={t('email_address')}
        name="username"
        value=""
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
    </Form>
  );
}
