import React from 'react';
import { Select, InputLabel } from '@material-ui/core';

import { SelectForm } from './styles';

interface Props {
  option: {
    value: string;
    content: string;
  }[];
  label: string;
}

export default function SelectOption(props: Props) {
  const { option, label, ...rest } = props;
  const handleChange = (value: any) =>
    console.log('---------------------', value.target.value);
  return (
    <SelectForm variant="outlined" {...rest}>
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select native onChange={handleChange} label={label}>
        {option.map((item, index: number) => (
          <option value={item.value} key={index}>
            {item.content}
          </option>
        ))}
      </Select>
    </SelectForm>
  );
}
