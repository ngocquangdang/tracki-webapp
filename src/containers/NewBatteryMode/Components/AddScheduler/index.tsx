import React, { useState } from 'react';

import Modal from '@Components/modals';
import TimePickerContainer from '../TimePicker';
import SelectOption from '@Components/selections';
import { Checkbox, FormControl } from '@material-ui/core';
import { TextInput } from '@Components/inputs';

import { useStyles } from './styles';

const DAY = [
  { key: 'mo', value: 'Monday' },
  { key: 'tu', value: 'Tuesday' },
  { key: 'we', value: 'Wednesday' },
  { key: 'th', value: 'Thursday' },
  { key: 'fr', value: 'Friday' },
  { key: 'sa', value: 'Saturday' },
  { key: 'sn', value: 'Sunday' },
];

const WIFI_STATUS = [
  { value: 'ON', content: 'ON' },
  { value: 'OFF', content: 'OFF' },
  { value: 'ON/OFF', content: 'ON and OFF' },
];

export default function AddScheduler(props) {
  const classes = useStyles();
  const { isAddScheduler, handleCloseAddScheduler } = props;
  const [wifiStatus, setWifiStatus] = useState('ON');
  const [daySelected, setDaySelected] = useState<Array<string>>([]);
  const handleChangeOption = e => setWifiStatus(e);
  const onChecked = value => () => {
    if (daySelected.includes(value)) {
      setDaySelected(daySelected.filter(day => day !== value));
    } else {
      setDaySelected([...daySelected, value]);
    }
  };
  return (
    <Modal
      title="Settings"
      open={isAddScheduler}
      handleClose={handleCloseAddScheduler}
    >
      <>
        <TimePickerContainer />
        <div>
          <div className={classes.statusWifi}>
            <p>Turn Wifi</p>
            <FormControl>
              <SelectOption
                options={WIFI_STATUS}
                value={wifiStatus}
                onChangeOption={handleChangeOption}
              />
            </FormControl>
          </div>
          <div>
            {DAY.map(day => (
              <div key={day.key} className={classes.dayCard}>
                <p>{day.value}</p>
                <Checkbox
                  checked={daySelected.includes(day.key)}
                  onClick={onChecked(day.key)}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            ))}
          </div>
          <div>
            <TextInput
              label="name(Option)"
              value=""
              // onChange={handleChange('card_number')}
              // variant="outlined"
            />
          </div>
        </div>
      </>
    </Modal>
  );
}
