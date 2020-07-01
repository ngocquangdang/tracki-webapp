import React, { useState } from 'react';

import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FormPassword, useStyles } from './styles';

interface State {
  showPassword: boolean;
}

export default function PasswordFieldComp(props: any) {
  const {
    value,
    name,
    onChange,
    className,
    label,
    errorInput,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const onHandleChange = (e: any) => onChange({ [name]: e.target.value });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormPassword
      className={`${classes.inputWrapper}  ${className || ''}`}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onHandleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormPassword>
  );
}
