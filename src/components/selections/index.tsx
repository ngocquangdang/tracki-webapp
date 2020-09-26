import React from 'react';
import { Select, InputLabel, MenuItem } from '@material-ui/core';

import { SelectForm, SelectFormBlackView, useStyles } from './styles';

interface Props {
  options: {
    value: string | number;
    content: string;
  }[];
  label?: string;
  value: string | number;
  name?: string;
  onChangeOption(event: string): void;
  isBlackView?: boolean;
}

export default function SelectOption(props: Props) {
  const {
    options,
    label,
    value,
    onChangeOption,
    name,
    isBlackView,
    ...rest
  } = props;
  const classes = useStyles();
  const handleChange = (event: any) => {
    onChangeOption(event.target.value);
  };
  return isBlackView ? (
    <SelectFormBlackView variant="outlined" {...rest}>
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        name={name}
        onChange={handleChange}
        label={label}
        value={value}
        className={classes.menuItem}
      >
        {options?.map((item, index: number) => (
          <MenuItem value={item.value} key={index} className={classes.menuItem}>
            {item.content}
          </MenuItem>
        ))}
      </Select>
    </SelectFormBlackView>
  ) : (
    <SelectForm variant="outlined" {...rest}>
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        name={name}
        onChange={handleChange}
        label={label}
        value={value}
        className={classes.menuItem}
      >
        {options?.map((item, index: number) => (
          <MenuItem value={item.value} key={index} className={classes.menuItem}>
            {item.content}
          </MenuItem>
        ))}
      </Select>
    </SelectForm>
  );
}
