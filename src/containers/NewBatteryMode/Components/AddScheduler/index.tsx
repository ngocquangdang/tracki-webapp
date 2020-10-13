import React, { useState } from 'react';
import moment from 'moment';
import Modal from '@Components/modals';
import TimePickerContainer from '../TimePicker';
import SelectOption from '@Components/selections';
import { Checkbox, FormControl } from '@material-ui/core';
import { TextInput } from '@Components/inputs';

import { useStyles } from './styles';
import { Button } from '@Components/buttons';

import { DAY } from '../../store/constants';

const WIFI_STATUS = [
  { value: 'ON', content: 'ON' },
  { value: 'OFF', content: 'OFF' },
  { value: 'ON/OFF', content: 'ON and OFF' },
];

export default function AddScheduler(props) {
  const classes = useStyles();
  const { isAddScheduler, handleCloseAddScheduler, onInitialData } = props;
  const [wifiStatus, setWifiStatus] = useState('ON');
  const [daySelected, setDaySelected] = useState<Array<string>>([]);
  const [schedulerName, setSchedulerName] = useState('');
  // const [schedulerTime, setSchedulerTime] = useState(null);
  const [schedulerRangeTime, setSchedulerRangeTime] = useState({
    startTime: null,
    endTime: null,
  });

  const handleChangeOption = e => setWifiStatus(e);
  const onChecked = value => () => {
    if (daySelected.includes(value)) {
      setDaySelected(daySelected.filter(day => day !== value));
    } else {
      setDaySelected([...daySelected, value]);
    }
  };

  const onAddScheduler = () => {
    const { startTime, endTime } = schedulerRangeTime;
    const scheduler = {
      id: 3,
      time: {
        startTime: moment(startTime).unix(),
        endTime: moment(endTime).unix(),
      },
      name: schedulerName.trim() !== '' ? schedulerName : 'new schedule',
      day: daySelected,
      status: wifiStatus,
      type: wifiStatus === 'ON' || wifiStatus === 'ON/OFF' ? 'OFF' : wifiStatus,
    };
    if (startTime) {
      onInitialData(scheduler);
      handleCloseAddScheduler();
      setSchedulerRangeTime({ startTime: null, endTime: null });
    }
    return;
  };
  const onChangeNameScheduler = e => setSchedulerName(e.target.value);
  const onChangeSchedulerRangeTime = v => setSchedulerRangeTime(v);
  return (
    <Modal
      title="Settings"
      open={isAddScheduler}
      handleClose={handleCloseAddScheduler}
    >
      <>
        <TimePickerContainer
          wifiStatus={wifiStatus}
          schedulerRangeTime={schedulerRangeTime}
          onChangeSchedulerRangeTime={onChangeSchedulerRangeTime}
        />
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
              value={schedulerName}
              onChange={onChangeNameScheduler}
              // variant="outlined"
            />
          </div>
          <div>
            <Button
              text="Cancel"
              onClick={handleCloseAddScheduler}
              color="primary"
            ></Button>
            <Button text="OK" color="primary" onClick={onAddScheduler}></Button>
          </div>
        </div>
      </>
    </Modal>
  );
}
