import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { TextInput } from '../index';
import { PhoneNumber } from './styles';

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

  return (
    <PhoneNumber>
      <PhoneInput
        country={'us'}
        enableSearch
        enableAreaCodes
        onChange={onChange}
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
