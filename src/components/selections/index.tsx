import React from 'react';
import { Select, InputLabel } from '@material-ui/core';

import { SelectForm } from './styles';

interface Props {
  options: {
    value: any;
    content: string;
  }[];
  label: string;
  value: string;
  name: string;
  onChangeOption(value: string): void;
}

export default function SelectOption(props: Props) {
  const { options, label, value, onChangeOption, ...rest } = props;
  const handleChange = (value: any) => {
    onChangeOption(value.target.value);
  };
  return (
    <SelectForm variant="outlined" {...rest}>
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        native
        // name={name}
        onChange={handleChange}
        label={label}
        value={value}
      >
        {options.map((item, index: number) => (
          <option value={item.value} key={index}>
            {item.content}
          </option>
        ))}
      </Select>
    </SelectForm>
  );
}
