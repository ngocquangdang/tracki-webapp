import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { PhoneNumber, TextInputStyle } from './styles';

interface Props {
  value: string | number;
  name?: string;
  onChange?(data: any): any;
  className?: string;
  label?: string;
  defaultCountry?: string | number;
  errorInput?: string;
  [data: string]: any;
}

export default function PhoneNumberInputComp(props: Props) {
  const {
    value,
    label,
    defaultCountry,
    onChange,
    onChangeInput,
    errorInput,
    ...rest
  } = props;

  return (
    <PhoneNumber>
      <PhoneInput
        country={defaultCountry}
        enableSearch
        enableAreaCodes
        onChange={onChangeInput}
        {...rest}
        inputProps={{ disabled: true }}
      />
      <TextInputStyle
        label=""
        name="phonenumber"
        value={value}
        onChange={onChange}
        variant="outlined"
        errorInput={errorInput}
      />
    </PhoneNumber>
  );
}
