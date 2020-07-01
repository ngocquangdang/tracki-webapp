import React from 'react';

import { TextInput, useStyles } from './styles';

function TextFieldComp(props: any) {
  const {
    name,
    value,
    label,
    errorInput,
    onChange,
    className,
    ...rest
  } = props;
  const classes = useStyles();

  const onHandleChange = (e: any) => onChange({ [name]: e.target.value });

  return (
    <TextInput
      error={!!errorInput}
      helperText={errorInput}
      className={`${classes.inputWrapper} ${className || ''}`}
      label={label}
      value={value}
      onChange={onHandleChange}
      {...rest}
    />
  );
}

export default TextFieldComp;
