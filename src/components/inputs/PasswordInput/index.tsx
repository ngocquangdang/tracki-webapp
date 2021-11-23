import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { FormInput, TextInput, useStyles } from './styles';
import { IconButton } from '@material-ui/core';

interface Props {
  value: string | number;
  name: string;
  onChange?(data: any): any;
  className?: string;
  label: string;
  errorInput?: string;
  [data: string]: any;
}

function PasswordFieldComp(props: Props) {
  const { value, onChange, className, label, errorInput, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };
  return (
    <FormInput>
      <TextInput
        type={showPassword ? 'text' : 'password'}
        error={!!errorInput}
        helperText={errorInput}
        className={`${classes.inputWrapper} ${className || ''}`}
        label={label}
        value={value}
        InputProps={{
          className: classes.heightInput,
        }}
        onChange={onChange}
        variant="outlined"
        {...rest}
      />
      <IconButton
        className={classes.icon}
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        // onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </FormInput>
  );
}

export default PasswordFieldComp;
