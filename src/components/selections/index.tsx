import React from 'react';
import { Select, InputLabel } from '@material-ui/core';

import { SelectForm } from './styles';

interface Props {
  option: {
    value: string;
    content: string;
  }[];
  label: string;
  defaultValues: string;
  name: string;
  onChangeOption(value: string): void;
}

export default function SelectOption(props: Props) {
  const { option, label, defaultValues, onChangeOption, ...rest } = props;
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
        value={defaultValues}
      >
        {option.map((item, index: number) => (
          <option value={item.value} key={index}>
            {item.content}
          </option>
        ))}
      </Select>
    </SelectForm>
  );
}
