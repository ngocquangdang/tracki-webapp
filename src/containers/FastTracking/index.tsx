import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';
import { firebaseLogEventRequest } from '@Utils/firebase';

const TRACKING_MODE_OPTION = [
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
  tracker: any;
  showSnackbar(data: SNACK_PAYLOAD): void;
}
export default function TrackingMode(props: Props) {
  const classes = useStyles();
  const { trackingModeRequest, trackerSettings, showSnackbar, tracker } = props;

  const [trackiModeOption, setTrackiModeOption] = useState([
    { key: '0_1_minutes', value: 'Turn Off Automatic Update' },
    ...TRACKING_MODE_OPTION,
  ]);
  const [modetype, setModeType] = useState('');
  useEffect(() => {
    firebaseLogEventRequest('tracking_mode', 'full_tracking_mode');
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

  useEffect(() => {
    if (!tracker.features.tracking_seconds) {
      if (tracker.features.minimal_tracking_interval_for_second === 5) {
        setTrackiModeOption([
          { key: '0_1_minutes', value: 'Turn Off Automatic Update' },
          { key: '5_1_seconds', value: 'Update location every 5 seconds' },
          { key: '15_1_seconds', value: 'Update location every 15 seconds' },
          { key: '30_1_seconds', value: 'Update location every 30 seconds' },
          ...TRACKING_MODE_OPTION,
        ]);
      } else if (tracker.features.minimal_tracking_interval_for_second === 15) {
        setTrackiModeOption([
          { key: '0_1_minutes', value: 'Turn Off Automatic Update' },
          { key: '15_1_seconds', value: 'Update location every 15 seconds' },
          { key: '30_1_seconds', value: 'Update location every 30 seconds' },
          ...TRACKING_MODE_OPTION,
        ]);
      } else if (tracker.features.minimal_tracking_interval_for_second === 30) {
        setTrackiModeOption([
          { key: '0_1_minutes', value: 'Turn Off Automatic Update' },
          { key: '30_1_seconds', value: 'Update location every 30 seconds' },
          ...TRACKING_MODE_OPTION,
        ]);
      } else if (tracker.features.minimal_tracking_interval_for_second === 60) {
        setTrackiModeOption([
          { key: '0_1_minutes', value: 'Turn Off Automatic Update' },
          ...TRACKING_MODE_OPTION,
        ]);
      }
    }
  }, [tracker]);

  const getFirebaseEvent = type => {
    switch (type) {
      case '1_1_minutes':
        return 'enable_1_minute_tracking';
      case '2_1_minutes':
        return 'enable_2_minute_tracking';
      case '5_1_minutes':
        return 'enable_5_minute_tracking';
      case '10_1_minutes':
        return 'enable_10_minute_tracking';
      case '30_1_minutes':
        return 'enable_30_minute_tracking';
      case '60_1_minutes':
        return 'enable_1_hours_tracking';
      case '120_1_minutes':
        return 'enable_2_hours_tracking';
      case '240_1_minutes':
        return 'enable_4_hours_tracking';
      default:
        return 'enable_auto_update_tracking';
    }
  };
  const handleChangeMode = e => {
    firebaseLogEventRequest(
      'full_tracking_mode',
      getFirebaseEvent(e.target.value)
    );

    setModeType(e.target.value);
    const [ sample_rate, samples_per_report, tracking_measurment ] =
      e.target.value.split('_');

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
      <p className={classes.fastTracContact}>
        Need Faster Tracking? Contact us to enable up to 3 seconds
      </p>
      <RadioGroup
        value={modetype}
        onChange={handleChangeMode}
        name="speed_unit"
      >
        {trackiModeOption.map(mode => (
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
