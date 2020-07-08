import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { TextInput, PhoneNumberInput } from '@Components/inputs';
import { SelectGroup, Title, Form, useStyles } from './styles';
import SelectOption from '@Components/selections';

interface IState {
  option: {
    value: string;
    content: string;
  }[];
  value: string;
}

export default function AccountDetail(props: any) {
  const { t } = props;
  const classes = useStyles();
  const [state, setState] = useState<IState>({
    value: 'pkh',
    option: [
      {
        value: '10',
        content: 'ten',
      },
      {
        value: '20',
        content: 'twenty',
      },
    ],
  });

  return (
    <Form>
      <TextInput
        label={t('first_name')}
        name="first_name"
        value=""
        variant="outlined"
      />
      <TextInput
        label={t('last_name')}
        name="last_name"
        value=""
        variant="outlined"
      />
      <PhoneNumberInput
        label="Phone Number"
        defaultCountry={'us'}
        variant="outlined"
        // onChange={handleChange}
        value=""
        searchStyle={{ width: '93%', height: '35px' }}
      />
      <SelectGroup>
        <Title>{t('speed_unit')}</Title>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={state.value}
          // onChange={handleChange}
          style={{ flexDirection: 'row' }}
        >
          <FormControlLabel
            value="pkh"
            control={<Radio color="primary" />}
            label="PKH"
            className={classes.fontSize}
          />
          <FormControlLabel
            value="mph"
            control={<Radio color="primary" />}
            label="MPH"
            className={classes.fontSize}
          />
        </RadioGroup>
        <SelectOption label={t('auth:date_format')} option={state.option} />
      </SelectGroup>
    </Form>
  );
}
