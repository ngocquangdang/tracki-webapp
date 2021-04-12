import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  CircularProgress,
} from '@material-ui/core';
import { AiOutlineQuestionCircle, AiOutlineCamera } from 'react-icons/ai';
import {
  NavigateNext as NavigateNextIcon,
  PersonAdd as PersonAddIcon,
} from '@material-ui/icons';
import { isNumber } from 'lodash';

import { makeSelectLoading } from '@Containers/App/store/selectors';

import SideBarOutside from '@Components/sidebars/SideBarOutside';
// import SelectOption from '@Components/selections';
import { Button } from '@Components/buttons';
import { TextInput } from '@Components/inputs';
import { ITracker } from '@Interfaces/index';
import SelectContact from '../SelectContact';

import {
  ImageWrapper,
  Image,
  ImageTracker,
  UploadImage,
  TextUpload,
  Content,
  SelectGroup,
  SubTitle,
  SwitchGroup,
  TextDescription1,
  ContainerButtonModal,
  TitleAlert,
  ContainerPadding,
  Text,
  LimitInput,
  OptionRight,
  SwitchGroupLast,
  Container,
  useStyles,
  AdornmentStyle,
  TooltipStyle,
  DefaultImage,
  Warning,
  ContainerPaddingButton,
} from './styles';
import SubscriptionModal from '@Components/Subscription';
import {
  updateTrackerSettingsRequestedAction,
  extendsBatteryModeRequestedAction,
  trackingModeRequestedAction,
} from '@Containers/SingleTracker/store/actions';

// import { LOCATION_UPDATE_OPTIONS } from '@Containers/SingleTracker/store/constants';

import {
  makeSelectTrackerSettings,
  makeSelectSubscription,
  makeSelectSmsCounter,
} from '@Containers/Trackers/store/selectors';
import {
  makeSelectErrors,
  makeSelectContacts,
  makeSelectContactIds,
  makeSelectContactOfTracker,
  makeSelectcontactAssigneds,
  makeSelectcontactAssignedIds,
} from '@Containers/Contacts/store/selector';
import {
  getContactListRequestAction,
  searchContactRequestedAction,
  addContactRequestAction,
  getContactAssignedRequestedAction,
  addContactAssignedRequestedAction,
  removeContactAssignedRequestedAction,
} from '@Containers/Contacts/store/actions';
import { makeSelectUserProfile } from '@Containers/AccountSetting/store/selectors';
import { RiErrorWarningFill } from 'react-icons/ri';
import Router from 'next/router';
import {
  getDeviceSMSCounterRequestedAction,
  getDeviceSubscripttionRequestedAction,
} from '@Containers/Trackers/store/actions';

import FastTrackingMode from '@Containers/TrackingModes';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';
import { firebaseLogEventRequest } from '@Utils/firebase';
interface Props {
  handleClose(): void;
  t(key: string): string;
  tracker: ITracker;
  settings: any;
  isMobile: boolean;
  isRequesting?: boolean;
  show: boolean;
  updateSettings(id: number, data: object, speed_unit: string, callback): void;
  getContactListRequest(account_id: number): void;
  contacts: object;
  contactIds: Array<number>;
  searchContactRequest(v): void;
  getContactAssignedRequest(device_id, account_id): void;
  contactAssigneds: object;
  contactAssignedIds: Array<number>;
  addContactRequest(data, eventType): void;
  removeContactRequest(data, eventType): void;
  addContactPageRequest(data, callback): void;
  errors: any;
  profile: any;
  contactOfTracker: object;
  smsCounter: SMSCounter;
  getDeviceSMSCounterRequest(device_id: number): void;
  getDeviceSubscripttionRequest(data): void;
  devcieSubscription: object;
  extendsBatteryModeRequest(settingId, setting): void;
  showSnackbar(data: SNACK_PAYLOAD): void;
  trackingModeRequest(settingId, setting): void;
}

interface SMSCounter {
  smsCounter: number;
  smsLimit: number;
}

function SettingTracker(props: Props) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImage] = useState<any>({});
  const [openSubscription, setOpenSubsription] = useState(false);
  const [openBatteryMode, setOpenBatteryMode] = useState(false);
  const [isShowSelectContact, setShowSelectContat] = useState(false);
  const [eventType, setEventype] = useState('');
  const classes = useStyles();
  const {
    handleClose,
    t,
    tracker,
    settings,
    isMobile,
    isRequesting,
    getContactListRequest,
    addContactPageRequest,
    contacts,
    contactIds,
    searchContactRequest,
    getContactAssignedRequest,
    contactAssigneds,
    contactAssignedIds,
    addContactRequest,
    removeContactRequest,
    errors,
    profile,
    devcieSubscription,
    smsCounter,
    getDeviceSMSCounterRequest,
    getDeviceSubscripttionRequest,
    extendsBatteryModeRequest,
    showSnackbar,
    trackingModeRequest,
  } = props;

  const [isOpenTooltip, setIsOpenTooltip] = useState(null);
  const trackerSettings = settings[tracker?.settings_id];
  const [infoTracker, setInfoTracker] = useState({
    device_name: '',
    device_id: 0,
    speed_limit: {
      enable: true,
      value: 5,
      unit: 'kph',
    },
    moving_start: false,
    low_battery: false,
    device_beep_sound: false,
    zone_entry: false,
    zone_exit: false,
    // tracking_mode: LOCATION_UPDATE_OPTIONS[0].value,
  });

  const speed_unit = profile?.preferences?.speed_unit;

  useEffect(() => {
    firebaseLogEventRequest('settings_device', '');
    if (trackerSettings && tracker) {
      // const {
      //   sample_rate,
      //   samples_per_report,
      //   tracking_measurment,
      // } = trackerSettings.preferences.tracking_mode;
      setInfoTracker({
        device_name: tracker.device_name || '',
        device_id: tracker.device_id || 0,
        speed_limit: trackerSettings.preferences.speed_limit,
        moving_start: trackerSettings.preferences.moving_start || false,
        low_battery: trackerSettings.preferences.low_battery || false,
        device_beep_sound:
          trackerSettings.preferences.device_beep_sound || false,
        zone_entry: trackerSettings.preferences.zone_entry || false,
        zone_exit: trackerSettings.preferences.zone_exit || false,
        // tracking_mode: `${sample_rate}_${samples_per_report}_${tracking_measurment}`,
      });
    }
  }, [tracker, trackerSettings]);

  const onSubmitForm = (values: any) => {
    firebaseLogEventRequest(
      'settings_device',
      'settings_device_update_setting'
    );
    const { infoTracker, speed_unit } = values;
    const {
      tracking_mode,
      device_name,
      device_id,
      ...preferences
    } = infoTracker;
    // const [
    //   sample_rate,
    //   samples_per_report,
    //   tracking_measurment,
    // ] = tracking_mode.split('_');
    const bodyRequest = {
      id: tracker.settings_id,
      device_name,
      device_id,
      preferences: {
        ...trackerSettings.preferences,
        ...preferences,
        // tracking_mode: {
        //   sample_rate: +sample_rate,
        //   samples_per_report: +samples_per_report,
        //   tracking_measurment,
        // },
      },
      file: imageFile.file,
    };
    props.updateSettings(
      tracker.settings_id,
      bodyRequest,
      speed_unit,
      handleClose
    );
  };

  const onOpenModalSubscription = () => {
    firebaseLogEventRequest('settings_device', 'settings_device_subscriptions');
    const data = {
      device_id: tracker.device_id,
      page: 1,
      size: 10,
    };
    getDeviceSMSCounterRequest(tracker.device_id);
    getDeviceSubscripttionRequest(data);
    setOpenSubsription(true);
  };

  const onCloseModalSubscription = () => {
    setOpenSubsription(false);
  };

  const onCloseBatteryMode = () => {
    firebaseLogEventRequest('tracking_mode', 'close_tracking_mode_modal');
    setOpenBatteryMode(false);
  };

  const onOpenBatteryMode = () => {
    firebaseLogEventRequest('tracking_mode', 'settings_device_tracking_mode');
    setOpenBatteryMode(true);
  };
  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setImage({ result: reader.result, file: file });
    };
    reader.readAsDataURL(file);
  };

  const onClickImage = () => document.getElementById('imageIcon')?.click();

  const handleShowSelectContact = () => {
    setShowSelectContat(!isShowSelectContact);
  };

  const onShowSelectContact = value => {
    firebaseLogEventRequest('settings_device', `add_contact_${value}`);
    getContactListRequest(profile.id);
    getContactAssignedRequest(infoTracker.device_id, profile.id);
    setShowSelectContat(!isShowSelectContact);
    setEventype(value);
  };

  const handleShowTooltip = type => () => {
    setIsOpenTooltip(type);
  };
  const handleTooltipClose = () => () => {
    setTimeout(() => {
      setIsOpenTooltip(null);
    }, 3000);
  };

  const onClickIncrease = () => {
    firebaseLogEventRequest('subscriptions_modal', 'alert_limit_subscription');
    Router.push(`/trackers/${tracker.device_id}/subscription/sms`);
  };

  const onClickFastTracking = () => {
    firebaseLogEventRequest(
      'subscriptions_modal',
      'fast_tracking_subscription'
    );
    Router.push(`/trackers/${tracker.device_id}/subscription/fast-tracking`);
  };

  const handleCancelSubscription = () => {
    firebaseLogEventRequest('subscriptions_modal', 'cancel_subscription');
    const bubbleChat: any = document.getElementById('chatIframe');
    setOpenSubsription(false);
    bubbleChat.style.height = '530px';
  };

  const onBatteryMode = () => {
    firebaseLogEventRequest(
      'settings_device',
      'settings_device_setup_geofence'
    );
  };

  const onClose = () => {
    firebaseLogEventRequest(
      'settings_device',
      'settings_device_cancel_setting'
    );
    handleClose();
  };

  return (
    <SideBarOutside
      title="Settings"
      show={props.show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
    >
      <Container>
        <ImageTracker onClick={onClickImage}>
          <input
            id="imageIcon"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onChangeImage}
          />
          <ImageWrapper>
            {loading && (
              <CircularProgress className={classes.loading} color="secondary" />
            )}
            {tracker.icon_url || imageFile.result ? (
              <Image background={tracker.icon_url || imageFile.result} />
            ) : (
              <DefaultImage background={'/images/image-device.png'} />
            )}
            <UploadImage>
              <AiOutlineCamera style={{ color: '#fff' }} />
              <TextUpload>Upload</TextUpload>
            </UploadImage>
          </ImageWrapper>
        </ImageTracker>
        <Formik
          initialValues={{ infoTracker, speed_unit }}
          onSubmit={onSubmitForm}
          enableReinitialize
          disabled={isRequesting}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
            handleBlur,
          }) => {
            return (
              <Content onSubmit={handleSubmit}>
                <ContainerPadding>
                  <TextInput
                    label={t('tracker:tracker_name')}
                    name="infoTracker.device_name"
                    value={values.infoTracker?.device_name}
                    onChange={handleChange('infoTracker.device_name')}
                    onBlur={handleBlur('infoTracker.device_name')}
                    variant="outlined"
                  />
                  <TextInput
                    label={t('tracker:tracker_id')}
                    name="infoTracker.device_id"
                    value={values.infoTracker?.device_id}
                    onChange={handleChange('infoTracker.device_id')}
                    onBlur={handleBlur('infoTracker.device_id')}
                    variant="outlined"
                    disabled
                  />
                  {/* <div className={classes.selectOption}>
                    <SelectOption
                      name="infoTracker.tracking_mode"
                      options={LOCATION_UPDATE_OPTIONS}
                      label={t('tracker:location_updated')}
                      value={values.infoTracker?.tracking_mode}
                      onChangeOption={handleChange('infoTracker.tracking_mode')}
                    />
                  </div> */}
                  <ContainerButtonModal
                    onClick={onOpenBatteryMode}
                    className={classes.trackingMode}
                  >
                    <Text>Tracking Modes</Text>
                    <NavigateNextIcon
                      className={`${classes.iconNext} ${classes.trackingModeIcon}`}
                    />
                  </ContainerButtonModal>
                  <TextDescription1>
                    Tracker's path tracking Intervals (to save battery set to
                    less frequent)
                  </TextDescription1>
                </ContainerPadding>
                <ContainerButtonModal onClick={onOpenModalSubscription}>
                  <Text>Subscriptions</Text>
                  <div className={classes.flexStyle}>
                    <Warning
                      className={
                        tracker.status === 'expired'
                          ? classes.show
                          : classes.hidden
                      }
                    >
                      <RiErrorWarningFill className={classes.iconWarning} />{' '}
                    </Warning>{' '}
                    <NavigateNextIcon className={classes.iconNext} />
                  </div>
                </ContainerButtonModal>
                <TitleAlert>{t('tracker:alert_setting')}</TitleAlert>
                <ContainerPadding>
                  <SelectGroup>
                    <SubTitle>{t('tracker:speed_unit')}</SubTitle>
                    <RadioGroup
                      value={values.speed_unit}
                      onChange={e => {
                        firebaseLogEventRequest(
                          'settings_device',
                          e.target.value === 'kph'
                            ? 'settings_device_select_kph'
                            : 'settings_device_select_mph'
                        );
                        setFieldValue(
                          'speed_unit',
                          (values.speed_unit = e.target.value)
                        );
                      }}
                      style={{ flexDirection: 'row' }}
                    >
                      <FormControlLabel
                        value="kph"
                        control={<Radio color="primary" />}
                        label="KPH"
                        // onClick={handleUpdatePreferance}
                        className={classes.fontSize}
                      />
                      <FormControlLabel
                        value="mph"
                        control={<Radio color="primary" />}
                        label="MPH"
                        // onClick={handleUpdatePreferance}
                        className={classes.fontSize}
                      />
                    </RadioGroup>
                  </SelectGroup>
                  <SwitchGroup>
                    <span>{t('tracker:speed_limit_alert')}</span>
                    <OptionRight>
                      <LimitInput
                        label={t(`${values.speed_unit.toUpperCase()}`)}
                        name="infoTracker.speed_limit_value"
                        disabled={!values.infoTracker?.speed_limit.enable}
                        value={values.infoTracker?.speed_limit.value}
                        onChange={e => {
                          if (isNumber(+e.target.value)) {
                            setFieldValue('infoTracker.speed_limit', {
                              ...values.infoTracker?.speed_limit,
                              value: +e.target.value,
                            });
                          }
                        }}
                        variant="outlined"
                      />
                      <TooltipStyle
                        open={isOpenTooltip === 'speed_limit_alert'}
                        onClose={handleTooltipClose()}
                        title="Add people to receive email or SMS alerts when the device exceeds the speed set here. Speed must be set to more than 0 (Zero)"
                        // placement="right"
                        arrow
                      >
                        <AdornmentStyle position="end">
                          <AiOutlineQuestionCircle
                            onClick={handleShowTooltip('speed_limit_alert')}
                            className={`${classes.questionIcon} ${classes.speedLimit}`}
                          />
                        </AdornmentStyle>
                      </TooltipStyle>

                      <PersonAddIcon
                        onClick={() => onShowSelectContact('speed_limit')}
                        className={classes.personAddIcon}
                      />
                      <Switch
                        checked={
                          values.infoTracker?.speed_limit.enable || false
                        }
                        onChange={e => {
                          firebaseLogEventRequest(
                            'settings_device',
                            e.target.checked
                              ? 'activate_speed_alert'
                              : 'deactivate_speed_alert'
                          );
                          setFieldValue('infoTracker.speed_limit', {
                            ...values.infoTracker?.speed_limit,
                            enable: e.target.checked,
                          });
                        }}
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroup>
                    <span>{t('tracker:speed_moving_alert')}</span>
                    <OptionRight>
                      <TooltipStyle
                        open={isOpenTooltip === 'speed_moving_alert'}
                        onClose={handleTooltipClose()}
                        title={
                          'Add people to receive email or SMS alerts when this tracker starts moving'
                        }
                        // placement="right"
                        arrow
                      >
                        <AdornmentStyle position="end">
                          <AiOutlineQuestionCircle
                            onClick={handleShowTooltip('speed_moving_alert')}
                            className={`${classes.questionIcon} ${classes.speedLimit}`}
                          />
                        </AdornmentStyle>
                      </TooltipStyle>
                      <PersonAddIcon
                        onClick={() => onShowSelectContact('moving_start')}
                        className={classes.personAddIcon}
                      />
                      <Switch
                        checked={values.infoTracker?.moving_start || false}
                        value={values.infoTracker?.moving_start}
                        onChange={e => {
                          firebaseLogEventRequest(
                            'settings_device',
                            e.target.checked
                              ? 'activate_start_moving_alert'
                              : 'deactivate_start_moving_alert'
                          );
                          setFieldValue(
                            'infoTracker.moving_start',
                            e.target.checked
                          );
                        }}
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroup>
                    <span>{t('tracker:low_battery_alert')}</span>
                    <OptionRight>
                      <TooltipStyle
                        open={isOpenTooltip === 'low_battery_alert'}
                        onClose={handleTooltipClose()}
                        title={
                          'Add people to receive email or SMS alerts when battery on this device runs low'
                        }
                        // placement="right"
                        arrow
                      >
                        <AdornmentStyle position="end">
                          <AiOutlineQuestionCircle
                            onClick={handleShowTooltip(
                              'infoTracker.low_battery_alert'
                            )}
                            className={`${classes.questionIcon} ${classes.speedLimit}`}
                          />
                        </AdornmentStyle>
                      </TooltipStyle>
                      <PersonAddIcon
                        onClick={() => onShowSelectContact('low_battery')}
                        className={classes.personAddIcon}
                      />
                      <Switch
                        checked={values.infoTracker?.low_battery}
                        value={values.infoTracker?.low_battery}
                        onChange={e => {
                          firebaseLogEventRequest(
                            'settings_device',
                            e.target.checked
                              ? 'activate_low_battery'
                              : 'deactivate_low_battery'
                          );
                          setFieldValue(
                            'infoTracker.low_battery',
                            e.target.checked
                          );
                        }}
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroup>
                    <span>{t('tracker:enable_beeper')}</span>
                    <OptionRight>
                      <TooltipStyle
                        open={isOpenTooltip === 'enable_beeper'}
                        onClose={handleTooltipClose()}
                        title={
                          'This switch will enable/disable the beeper on the device. There is a tiny beeper inside the tracker that you can send beep to from the app. The beeper will also beep on the device itself when the battery runs low'
                        }
                        // placement="right"
                        arrow
                      >
                        <AdornmentStyle position="end">
                          <AiOutlineQuestionCircle
                            onClick={handleShowTooltip('enable_beeper')}
                            className={`${classes.questionIcon} ${classes.speedLimit}`}
                          />
                        </AdornmentStyle>
                      </TooltipStyle>
                      <Switch
                        checked={values.infoTracker?.device_beep_sound}
                        value={values.infoTracker?.device_beep_sound}
                        onChange={e => {
                          firebaseLogEventRequest(
                            'settings_device',
                            e.target.checked
                              ? 'activate_device_beeper'
                              : 'deactivate_device_beeper'
                          );
                          setFieldValue(
                            'infoTracker.device_beep_sound',
                            e.target.checked
                          );
                        }}
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroup>
                    <span>{t('tracker:geo_fence_entry')}</span>
                    <OptionRight>
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.speedLimit}`}
                      />
                      <PersonAddIcon
                        onClick={() => onShowSelectContact('zone_entry')}
                        className={classes.personAddIcon}
                      />
                      <Switch
                        checked={values.infoTracker?.zone_entry || false}
                        value={values.infoTracker?.zone_entry}
                        onChange={e => {
                          firebaseLogEventRequest(
                            'settings_device',
                            e.target.checked
                              ? 'activate_geofence_entry_alert'
                              : 'deactivate_geofence_entry_alert'
                          );
                          setFieldValue(
                            'infoTracker.zone_entry',
                            e.target.checked
                          );
                        }}
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroupLast>
                    <span>{t('tracker:geo_fence_exit')}</span>
                    <OptionRight>
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.speedLimit}`}
                      />
                      <PersonAddIcon
                        onClick={() => onShowSelectContact('zone_exit')}
                        className={classes.personAddIcon}
                      />
                      <Switch
                        checked={values.infoTracker?.zone_exit || false}
                        value={values.infoTracker?.zone_exit}
                        onChange={e => {
                          firebaseLogEventRequest(
                            'settings_device',
                            e.target.checked
                              ? 'activate_geofence_exit_alert'
                              : 'deactivate_geofence_exit_alert'
                          );
                          setFieldValue(
                            'infoTracker.zone_exit',
                            e.target.checked
                          );
                        }}
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroupLast>
                </ContainerPadding>
                <ContainerButtonModal onClick={onBatteryMode}>
                  <Text>Setup Geo-Fences</Text>
                  <OptionRight>
                    <AiOutlineQuestionCircle
                      className={`${classes.questionIcon} ${classes.questionIconMargin}`}
                    />
                    <NavigateNextIcon className={classes.iconNext} />{' '}
                  </OptionRight>
                </ContainerButtonModal>

                <ContainerPaddingButton>
                  <Button
                    className={`${classes.btnCancle} ${classes.margin}`}
                    variant="outlined"
                    isLoading={isRequesting}
                    text={t('common:cancel')}
                    type="button"
                    onClick={onClose}
                  />
                  <Button
                    className={`${classes.btn} ${classes.margin}`}
                    variant="outlined"
                    isLoading={isRequesting}
                    text={t('auth:save')}
                    type="submit"
                  />
                </ContainerPaddingButton>
              </Content>
            );
          }}
        </Formik>
      </Container>
      <SubscriptionModal
        onClickIncrease={onClickIncrease}
        onClickFastTracking={onClickFastTracking}
        onCloseSubscription={onCloseModalSubscription}
        onClickCancel={handleCancelSubscription}
        open={openSubscription}
        t={t}
        smsCounter={smsCounter}
        devcieSubscription={devcieSubscription}
      />
      <FastTrackingMode
        showModal={openBatteryMode}
        handleCloseModal={onCloseBatteryMode}
        t={t}
        trackerSettings={trackerSettings}
        tracker={tracker}
        extendsBatteryModeRequest={extendsBatteryModeRequest}
        showSnackbar={showSnackbar}
        isRequesting={isRequesting}
        trackingModeRequest={trackingModeRequest}
      />
      <SelectContact
        handleClose={handleShowSelectContact}
        show={isShowSelectContact}
        isMobile={isMobile}
        contacts={contacts}
        contactIds={contactIds}
        onSearch={searchContactRequest}
        contactAssigneds={contactAssigneds}
        contactAssignedIds={contactAssignedIds}
        addContactRequest={addContactRequest}
        removeContactRequest={removeContactRequest}
        eventTypes={eventType}
        t={t}
        addContactPageRequest={addContactPageRequest}
        tracker={tracker}
        errors={errors}
        // contactOfTracker={contactOfTracker}
      />
    </SideBarOutside>
  );
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectLoading(),
  settings: makeSelectTrackerSettings(),
  contacts: makeSelectContacts(),
  contactIds: makeSelectContactIds(),
  contactOfTracker: makeSelectContactOfTracker(),
  contactAssigneds: makeSelectcontactAssigneds(),
  contactAssignedIds: makeSelectcontactAssignedIds(),
  profile: makeSelectUserProfile(),
  devcieSubscription: makeSelectSubscription(),
  smsCounter: makeSelectSmsCounter(),
});

const mapDispatchToProps = dispatch => ({
  updateSettings: (
    settingId: number,
    data: object,
    speed_unit: string,
    callback
  ) =>
    dispatch(
      updateTrackerSettingsRequestedAction(
        settingId,
        data,
        speed_unit,
        callback
      )
    ),
  getContactListRequest: account_id =>
    dispatch(getContactListRequestAction(account_id)),
  searchContactRequest: v => dispatch(searchContactRequestedAction(v)),
  addContactPageRequest: (data, callback) =>
    dispatch(addContactRequestAction(data, callback)),
  getContactAssignedRequest: (device_id: number, account_id: number) =>
    dispatch(getContactAssignedRequestedAction(device_id, account_id)),
  addContactRequest: (data, eventType) =>
    dispatch(addContactAssignedRequestedAction(data, eventType)),
  removeContactRequest: (data, eventType) =>
    dispatch(removeContactAssignedRequestedAction(data, eventType)),
  getDeviceSMSCounterRequest: (device_id: number) =>
    dispatch(getDeviceSMSCounterRequestedAction(device_id)),
  getDeviceSubscripttionRequest: data =>
    dispatch(getDeviceSubscripttionRequestedAction(data)),
  extendsBatteryModeRequest: (settingId, setting) =>
    dispatch(extendsBatteryModeRequestedAction(settingId, setting)),
  showSnackbar: (data: SNACK_PAYLOAD) => dispatch(showSnackbar(data)),
  trackingModeRequest: (settingId, setting) =>
    dispatch(trackingModeRequestedAction(settingId, setting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingTracker);
