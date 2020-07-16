import React from 'react';

import { TextInput, useStyles } from './styles';

interface Props {
  value: string | number;
  name?: string;
  onChange?(data: any): any;
  className?: string;
  label: string;
  errorInput?: string;
  [data: string]: any;
}

function TextFieldComp(props: Props) {
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

  return (
    <TextInput
      error={!!errorInput}
      helperText={errorInput}
      className={`${classes.inputWrapper} ${className || ''}`}
      label={label}
      value={value}
      InputProps={{
        className: classes.heightInput,
      }}
      inputProps={{
        form: {
          autoComplete: 'off',
        },
      }}
      onChange={onChange}
      FormHelperTextProps={{ classes: { root: classes.errorRoot } }}
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
  );
}

export default TextFieldComp;
