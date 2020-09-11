import React, { useState, useEffect } from 'react';
import Modal from '@Components/modals';

import { useStyles, themePickerDate } from './styles';
import { Switch } from '@material-ui/core';
import SelectOption from '@Components/selections';
import { Button } from '@Components/buttons';
import { RiErrorWarningFill } from 'react-icons/ri';
import {
  MuiPickersUtilsProvider as PickerProvider,
  KeyboardTimePicker as TimePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import DateUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import { Formik } from 'formik';
import { InputAdornment } from '@material-ui/core';
import { MdAvTimer } from 'react-icons/md';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';
import { EXTENDED_BATTERY } from '@Containers/SingleTracker/store/constants';

interface Props {
  showModal: boolean;
  handleCloseModal(): void;
  t(key: string): string;
  trackerSettings: any;
  tracker: any;
  extendsBatteryModeRequest(settingId, setting): void;
  showSnackbar(data: SNACK_PAYLOAD): void;
  isRequesting?: boolean;
}

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

export default function BatterySleepMode(props: Props) {
  const classes = useStyles();

  const {
    showModal,
    handleCloseModal,
    t,
    trackerSettings,
    tracker,
    extendsBatteryModeRequest,
    showSnackbar,
    isRequesting,
  } = props;

  const [scheduledSleep, setScheduleSleep] = useState({
    awake: moment(),
    enable: false,
    repeat: true,
    send_gps: true,
    start: moment(),
    sleep: moment(),
    select_mode: '',
  });

  const [onShowIntruction, setShowIntruction] = useState(true);

  useEffect(() => {
    if (trackerSettings.preferences?.scheduled_sleep) {
      const { scheduled_sleep } = trackerSettings.preferences;
      let scheduledSleepMode = '';

      let setAwake = scheduled_sleep.start + scheduled_sleep.awake * 60;
      let setSleep = scheduled_sleep.start + scheduled_sleep.sleep * 60;

      if (scheduled_sleep.awake === 5) {
        scheduledSleepMode = 'custom';

        if (scheduled_sleep.sleep === 1435) {
          scheduledSleepMode = '01_per_day_1435';
        } else if (scheduled_sleep.sleep === 715) {
          scheduledSleepMode = '02_per_day_715';
        } else if (scheduled_sleep.sleep === 355) {
          scheduledSleepMode = '04_per_day_355';
        } else if (scheduled_sleep.sleep === 55) {
          scheduledSleepMode = '24_per_day_55';
        }
      }

      setScheduleSleep({
        awake:
          moment(setAwake * 1000) > moment()
            ? moment(setAwake * 1000)
            : moment(),
        enable: scheduled_sleep.enable || false,
        repeat: scheduled_sleep.repeat || true,
        send_gps: scheduled_sleep.send_gps || true,
        select_mode: scheduledSleepMode || '',
        start: moment(scheduled_sleep.start * 1000) || moment(),
        sleep:
          moment(setSleep * 1000) > moment()
            ? moment(setSleep * 1000)
            : moment(),
      });
    }
  }, [tracker, trackerSettings]);

  const onSubmit = v => {
    const select_mode = parseInt(v.select_mode.split('_')[3]);
    const newStart = moment(v.start).unix();
    const newAwake = (moment(v.awake).unix() - newStart) / 60;
    const newSleep = (moment(v.sleep).unix() - newStart) / 60;
    const setting = {
      ...trackerSettings,
      preferences: {
        ...trackerSettings.preferences,
        scheduled_sleep: {
          awake: select_mode ? 5 : newAwake,
          sleep: select_mode ? select_mode : newSleep,
          start: select_mode ? moment().unix() : newStart,
          enable: v.enable,
          repeat: true,
          send_gps: true,
        },
      },
    };

    if (v.select_mode === 'custom') {
      if (moment(v.start).unix() < moment().unix()) {
        showSnackbar({
          snackType: 'error',
          snackMessage: 'Starting time should not be less than 5 minutes.',
        });
      }

      if (moment(v.sleep).unix() <= moment(v.start).unix()) {
        showSnackbar({
          snackType: 'error',
          snackMessage: 'Sleep time should not be less than 5 minutes.',
        });
      }

      if (moment(v.awake).unix() <= moment(v.start).unix()) {
        showSnackbar({
          snackType: 'error',
          snackMessage: 'Awake time should not be less than 5 minutes.',
        });
      }
      if (
        moment(v.start).unix() > moment().unix() &&
        moment(v.sleep).unix() > moment(v.start).unix() &&
        moment(v.awake).unix() > moment(v.start).unix()
      ) {
        extendsBatteryModeRequest(trackerSettings.id, setting);
      }
    } else {
      extendsBatteryModeRequest(trackerSettings.id, setting);
    }
  };

  const handleShowIntructions = (type: boolean) => () => {
    setShowIntruction(type);
  };

  return (
    <Modal
      title={t('batterymode:extended_battery')}
      open={showModal}
      handleClose={handleCloseModal}
      className={classes.modal}
    >
      <div>
        <Formik
          initialValues={scheduledSleep}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className={classes.sleepMode}>
                  <p className={classes.title}>{t('batterymode:sleep_mode')}</p>
                  <Switch
                    name="enable"
                    checked={values.enable}
                    color="primary"
                    className={classes.switch}
                    onChange={e => {
                      handleChange('enable')(e);
                      if (!e.target.value) {
                        handleSubmit();
                      }
                    }}
                  />
                  <p className={classes.sleepState}>
                    Turned {values.enable ? 'On' : 'Off'}
                  </p>
                </div>
                {values.enable && (
                  <div className={`${classes.modeOption} ${classes.width}`}>
                    <SelectOption
                      name={'select_mode'}
                      options={EXTENDED_BATTERY}
                      label={t('batterymode:select_mode')}
                      value={values.select_mode}
                      onChangeOption={e => {
                        handleChange('select_mode')(e);
                        handleShowIntructions(e !== 'custom')();
                      }}
                    />
                  </div>
                )}
                {values.enable && values.select_mode === 'custom' && (
                  <div className={classes.modeCustom}>
                    <PickerProvider libInstance={moment} utils={DateUtils}>
                      <div className={classes.containerSpecificTime}>
                        <ThemeProvider theme={themePickerDate}>
                          <KeyboardDateTimePicker
                            name={'start'}
                            autoOk
                            disablePast
                            variant="inline"
                            inputVariant="outlined"
                            label="Mode Start Date & Time"
                            format="yyyy/MM/dd hh:mm a"
                            value={values.start}
                            onChange={val => {
                              setFieldValue('start', val);
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            className={classes.timePicker}
                          />

                          <TimePicker
                            autoOk
                            name="sleep"
                            label="Sleep Period"
                            placeholder="08:00 AM"
                            variant="inline"
                            mask="__:__ _M"
                            inputVariant="outlined"
                            value={values.sleep}
                            onChange={val => {
                              setFieldValue('sleep', val);
                            }}
                            keyboardIcon={
                              <InputAdornment position="end">
                                <MdAvTimer />
                              </InputAdornment>
                            }
                            className={classes.timePicker}
                          />
                          <TimePicker
                            autoOk
                            name="awake"
                            label="Awake Period"
                            placeholder="08:00 AM"
                            variant="inline"
                            mask="__:__ _M"
                            inputVariant="outlined"
                            value={values.awake}
                            onChange={val => {
                              setFieldValue('awake', val);
                            }}
                            keyboardIcon={
                              <InputAdornment position="end">
                                <MdAvTimer />
                              </InputAdornment>
                            }
                            className={classes.timePicker}
                          />
                        </ThemeProvider>
                      </div>
                    </PickerProvider>
                  </div>
                )}
                {values.enable && (
                  <div className={`${classes.saveMode} ${classes.width}`}>
                    <Button
                      className={`${classes.btn} ${classes.margin}`}
                      variant="outlined"
                      text={t('batterymode:save_changes')}
                      type="submit"
                      isLoading={isRequesting}
                    />
                  </div>
                )}
                <div className={classes.intructions}>
                  <div className={classes.intructionHeader}>
                    <div className={classes.intructionTitle}>
                      <RiErrorWarningFill className={classes.iconWarning} />
                      <p className={classes.title}>
                        {t('batterymode:instructions')}
                      </p>
                    </div>
                    {values.select_mode === 'custom' && (
                      <div
                        onClick={handleShowIntructions(!onShowIntruction)}
                        className={classes.showIntruction}
                      >
                        {onShowIntruction
                          ? 'Tap to hide'
                          : t('batterymode:tap_to_show')}
                      </div>
                    )}
                  </div>
                  {onShowIntruction && (
                    <p className={classes.intructionSub}>
                      Do not use this mode for a real time tracking With
                      scheduled hibernation you can extend battery life to 30
                      days tracking 4-8 times per day (in case you don't need
                      real time tracking). For example: Tracki would go to
                      hibernation for 6 hours at a time & wake up for 5 minutes
                      to report its location and would go to hibernation again.
                      That means it would be tracking 4 times per day. You can
                      turn off the hibernation mode by switching it off and by
                      saving the changes. The changes will be effective when the
                      devices wakes up again.
                    </p>
                  )}
                </div>
              </form>
            );
          }}
        </Formik>

        <div className={classes.buyBatteryMode}>
          <p className={classes.subBuy}>
            {t('batterymode:battery_description')}{' '}
            <a
              href={
                'https://tracki.com/collections/gps-trackers/products/waterproof-magnetic-box-for-gps-tracker-3500mah-battery'
              }
            >
              <span className={classes.buyHere}>
                {t('batterymode:buy_here')}
              </span>
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
