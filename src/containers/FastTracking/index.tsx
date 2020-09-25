import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';

const TRACKING_MODE_OPTION = [
  { key: '0_1_minutes', value: 'Turn Off Automatic Update' },
  { key: '1_1_minutes', value: 'Update location every 1 minute' },
  { key: '2_1_minutes', value: 'Update location every 2 minutes' },
  { key: '5_1_minutes', value: 'Update location every 5 minutes' },
  { key: '10_1_minutes', value: 'Update location every 10 minutes' },
  { key: '30_1_minutes', value: 'Update location every 30 minutes' },
  { key: '60_1_minutes', value: 'Update location every 1 hour' },
  { key: '120_1_minutes', value: 'Update location every 2 hours' },
  { key: '240_1_minutes', value: 'Update location every 4 hours' },
];

interface Props {
  trackingModeRequest(settingId, setting): void;
  trackerSettings: any;
  showSnackbar(data: SNACK_PAYLOAD): void;
}
export default function TrackingMode(props: Props) {
  const classes = useStyles();
  const { trackingModeRequest, trackerSettings, showSnackbar } = props;

  const [modetype, setModeType] = useState('');
  useEffect(() => {
    if (trackerSettings) {
      const {
        sample_rate,
        samples_per_report,
        tracking_measurment,
      } = trackerSettings.preferences.tracking_mode;
      setModeType(
        `${sample_rate}_${samples_per_report}_${tracking_measurment}`
      );
    }
  }, [trackerSettings]);

  const handleChangeMode = e => {
    setModeType(e.target.value);
    const [
      sample_rate,
      samples_per_report,
      tracking_measurment,
    ] = e.target.value.split('_');

    const bodyRequest = {
      ...trackerSettings,
      preferences: {
        ...trackerSettings.preferences,
        tracking_mode: {
          sample_rate: +sample_rate,
          samples_per_report: +samples_per_report,
          tracking_measurment,
        },
      },
    };
    trackingModeRequest(trackerSettings.id, bodyRequest);
    showSnackbar({
      snackType: 'info',
      snackMessage: 'Update Tracking Mode are Requesting',
    });
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.title}>Automatic Update Options</p>
        <p className={classes.subTitle}>
          When Automatic updates are off, you can still get the real-time
          location of your Tracki by refreshing the map screen. Automatic
          updates are what drains the device's battery fast. to maximize battery
          life, set the update rate to be less frquent or event better to off if
          you do not need to view the tracker's path history.
        </p>
      </div>
      <RadioGroup
        value={modetype}
        onChange={handleChangeMode}
        name="speed_unit"
      >
        {TRACKING_MODE_OPTION.map(mode => (
          <FormControlLabel
            key={mode.key}
            value={mode.key}
            control={<Radio color="primary" />}
            label={mode.value}
            // className={classes.fontSize}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
