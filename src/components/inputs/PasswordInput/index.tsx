import React, { useState } from 'react';

import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FormPassword, useStyles } from './styles';

interface Props {
  value: string | number;
  name: string;
  onChange?(data: any): any;
  className: string;
  label: string;
  errorInput?: string;
  [data: string]: any;
}

export default function PasswordFieldComp(props: Props) {
  const {
    value,
    onChange,
    className,
    label,
    errorInput,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  return (
    <FormPassword className={`${classes.inputWrapper}  ${className || ''}`} variant="outlined" error={!!errorInput}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
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
      <FormHelperText className={classes.error}>{errorInput}</FormHelperText>
    </FormPassword>
  );
}
