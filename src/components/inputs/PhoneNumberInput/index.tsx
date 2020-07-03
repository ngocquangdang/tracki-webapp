import React from 'react';

import { TextInput } from '../index';
import { PhoneNumber, PhoneNumberInput, useStyles } from './styles';

interface Props {
  value: string | number;
  name?: string;
  onChange?(data: any): any;
  className?: string;
  label?: string;
  defaultCountry?: string;
  errorInput?: string;
  [data: string]: any;
}

export default function PhoneNumberInputComp(props: Props) {
  const { value, label, defaultCountry, onChange, ...rest } = props;
  const classes = useStyles();

  return (
    <PhoneNumber>
      <PhoneNumberInput
        label={label}
        name="region"
        className={classes.color}
        defaultCountry={defaultCountry}
        onChange={onChange}
        style={{ color: '#1a1a1a' }}
        disabled
        {...rest}
      />
      <TextInput
        label=""
        name="phonenumber"
        value={value}
        onChange={onChange}
        variant="outlined"
      />
    </PhoneNumber>
  );
}
