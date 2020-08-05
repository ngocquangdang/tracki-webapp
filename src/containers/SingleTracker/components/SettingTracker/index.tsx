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
import {
  makeSelectTrackerSettings,
  makeSelectContactList,
} from '@Containers/Trackers/store/selectors';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import SelectOption from '@Components/selections';
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
  TextDescription2,
  ContainerButtonModal,
  TitleAlert,
  ContainerPadding,
  Text,
  LimitInput,
  OptionRight,
  SwitchGroupLast,
  Container,
  useStyles,
} from './styles';
import SubscriptionModal from '@Components/Subscription';
import {
  updateTrackerSettingsRequestedAction,
  getContactListRequestAction,
} from '@Containers/SingleTracker/store/actions';
import { LOCATION_UPDATE_OPTIONS } from '@Containers/SingleTracker/store/constants';

interface Props {
  handleClose(): void;
  t(key: string): string;
  tracker: ITracker;
  settings: any;
  isMobile: boolean;
  isRequesting?: boolean;
  show: boolean;
  updateSettings(id: number, data: object): void;
  getContactListRequest(): void;
  contactList: any;
}

function SettingTracker(props: Props) {
  console.log('SettingTracker -> props', props);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImage] = useState<any>({});
  const [openSubscription, setOpenSubsription] = useState(false);
  const [isShowSelectContact, setShowSelectContat] = useState(false);
  const [contact, setContact] = useState([]);

  const classes = useStyles();
  const {
    handleClose,
    t,
    tracker,
    settings,
    isMobile,
    isRequesting,
    getContactListRequest,
    contactList,
  } = props;
  const trackerSettings = settings[tracker.settings_id];
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
    tracking_mode: LOCATION_UPDATE_OPTIONS[0].value,
  });

  useEffect(() => {
    if (trackerSettings && tracker) {
      const {
        sample_rate,
        samples_per_report,
        tracking_measurment,
      } = trackerSettings.preferences.tracking_mode;
      setInfoTracker({
        device_name: tracker.device_name,
        device_id: tracker.device_id,
        speed_limit: trackerSettings.preferences.speed_limit,
        moving_start: trackerSettings.preferences.moving_start,
        low_battery: trackerSettings.preferences.low_battery,
        device_beep_sound: trackerSettings.preferences.device_beep_sound,
        zone_entry: trackerSettings.preferences.zone_entry,
        zone_exit: trackerSettings.preferences.zone_exit,
        tracking_mode: `${sample_rate}_${samples_per_report}_${tracking_measurment}`,
      });
    }
  }, [tracker, trackerSettings]);

  useEffect(() => {
    console.log('aaaaaaaaaaaaaaaaa');
    setContact(contactList);
  }, [contactList]);

  const onSubmitForm = (values: any) => {
    const { tracking_mode, device_name, device_id, ...preferences } = values;
    const [
      sample_rate,
      samples_per_report,
      tracking_measurment,
    ] = tracking_mode.split('_');
    const bodyRequest = {
      id: tracker.settings_id,
      device_name,
      device_id,
      preferences: {
        ...trackerSettings.preferences,
        ...preferences,
        tracking_mode: {
          sample_rate: +sample_rate,
          samples_per_report: +samples_per_report,
          tracking_measurment,
        },
      },
      file: imageFile.file,
    };
    props.updateSettings(tracker.settings_id, bodyRequest);
  };

  const onOpenModalSubscription = () => {
    setOpenSubsription(true);
  };

  const onCloseModalSubscription = () => {
    setOpenSubsription(false);
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

  const onShowSelectContact = () => {
    getContactListRequest();
    setShowSelectContat(!isShowSelectContact);
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
            <Image
              src={
                imageFile.result ||
                tracker.icon_url ||
                '/images/image-device.png'
              }
              alt=""
            />
            <UploadImage>
              <AiOutlineCamera style={{ color: '#fff' }} />
              <TextUpload>Upload</TextUpload>
            </UploadImage>
          </ImageWrapper>
        </ImageTracker>
        <Formik
          initialValues={infoTracker}
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
                    name="device_name"
                    value={values.device_name}
                    onChange={handleChange('device_name')}
                    onBlur={handleBlur('device_name')}
                    variant="outlined"
                  />
                  <TextInput
                    label={t('tracker:tracker_id')}
                    name="device_id"
                    value={values.device_id}
                    onChange={handleChange('device_id')}
                    onBlur={handleBlur('device_id')}
                    variant="outlined"
                    disabled
                  />
                  <SelectOption
                    name="tracking_mode"
                    options={LOCATION_UPDATE_OPTIONS}
                    label={t('tracker:location_updated')}
                    value={values.tracking_mode}
                    onChangeOption={handleChange('tracking_mode')}
                  />
                  <TextDescription1>
                    Tracker's path tracking Intervals (to save battery set to
                    less frequent)
                  </TextDescription1>
                  <TextDescription2>
                    Need Faster Tracking? Contact us to enable up to 5 seconds
                  </TextDescription2>
                </ContainerPadding>
                <ContainerButtonModal onClick={onOpenModalSubscription}>
                  <Text>Subscriptions</Text>
                  <NavigateNextIcon className={classes.iconNext} />
                </ContainerButtonModal>
                <TitleAlert>{t('tracker:alert_setting')}</TitleAlert>
                <ContainerPadding>
                  <SelectGroup>
                    <SubTitle>{t('tracker:speed_unit')}</SubTitle>
                    <RadioGroup
                      value={values.speed_limit.unit || 'kmp'}
                      onChange={e => {
                        setFieldValue('speed_limit', {
                          ...values.speed_limit,
                          unit: e.target.value,
                        });
                      }}
                      style={{ flexDirection: 'row' }}
                    >
                      <FormControlLabel
                        value="kph"
                        control={<Radio color="primary" />}
                        label="KPH"
                        className={classes.fontSize}
                      />
                      <FormControlLabel
                        value="mph"
                        control={<Radio color="primary" />}
                        label="MPH"
                        className={classes.fontSize}
                      />
                    </RadioGroup>
                  </SelectGroup>
                  <SwitchGroup>
                    <span>{t('tracker:speed_limit_alert')}</span>
                    <OptionRight>
                      <LimitInput
                        label={t(`${values.speed_limit.unit.toUpperCase()}`)}
                        name="speed_limit_value"
                        disabled={!values.speed_limit.enable}
                        value={values.speed_limit.value}
                        onChange={e => {
                          if (isNumber(+e.target.value)) {
                            setFieldValue('speed_limit', {
                              ...values.speed_limit,
                              value: +e.target.value,
                            });
                          }
                        }}
                        variant="outlined"
                      />
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.speedLimit}`}
                      />
                      <PersonAddIcon
                        onClick={onShowSelectContact}
                        className={`${classes.personAddIcon} ${classes.speedLimit}`}
                      />
                      <Switch
                        checked={values.speed_limit.enable || false}
                        onChange={e => {
                          setFieldValue('speed_limit', {
                            ...values.speed_limit,
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
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.questionIconMargin}`}
                      />
                      <Switch
                        checked={values.moving_start || false}
                        value={values.moving_start}
                        onChange={e =>
                          setFieldValue('moving_start', e.target.checked)
                        }
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroup>
                    <span>{t('tracker:low_battery_alert')}</span>
                    <OptionRight>
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.questionIconMargin}`}
                      />
                      <Switch
                        checked={values.low_battery}
                        value={values.low_battery}
                        onChange={e =>
                          setFieldValue('low_battery', e.target.checked)
                        }
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroup>
                    <span>{t('tracker:enable_beeper')}</span>
                    <OptionRight>
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.questionIconMargin}`}
                      />
                      <Switch
                        checked={values.device_beep_sound}
                        value={values.device_beep_sound}
                        onChange={e =>
                          setFieldValue('device_beep_sound', e.target.checked)
                        }
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroup>
                    <span>{t('tracker:geo_fence_entry')}</span>
                    <OptionRight>
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.questionIconMargin}`}
                      />
                      <Switch
                        checked={values.zone_entry || false}
                        value={values.zone_entry}
                        onChange={e =>
                          setFieldValue('zone_entry', e.target.checked)
                        }
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroup>
                  <SwitchGroupLast>
                    <span>{t('tracker:geo_fence_exit')}</span>
                    <OptionRight>
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.questionIconMargin}`}
                      />
                      <Switch
                        checked={values.zone_exit || false}
                        value={values.zone_exit}
                        onChange={e =>
                          setFieldValue('zone_exit', e.target.checked)
                        }
                        color="primary"
                      />
                    </OptionRight>
                  </SwitchGroupLast>
                </ContainerPadding>
                <ContainerButtonModal>
                  <Text>Setup Geo-Fences</Text>
                  <OptionRight>
                    <AiOutlineQuestionCircle
                      className={`${classes.questionIcon} ${classes.questionIconMargin}`}
                    />
                    <NavigateNextIcon className={classes.iconNext} />{' '}
                  </OptionRight>
                </ContainerButtonModal>
                <ContainerButtonModal>
                  <Text>Extended Battery Sleep Mode</Text>
                  <NavigateNextIcon className={classes.iconNext} />
                </ContainerButtonModal>
                <ContainerPadding>
                  <Button
                    className={`${classes.btn} ${classes.margin}`}
                    variant="outlined"
                    isLoading={isRequesting}
                    text={t('auth:save')}
                    type="submit"
                  />
                </ContainerPadding>
              </Content>
            );
          }}
        </Formik>
      </Container>
      <SubscriptionModal
        onCloseSubscription={onCloseModalSubscription}
        open={openSubscription}
        t={t}
      />
      <SelectContact
        handleClose={onShowSelectContact}
        show={isShowSelectContact}
        isMobile={false}
        contactList={contact}
      />
    </SideBarOutside>
  );
}

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectLoading(),
  settings: makeSelectTrackerSettings(),
  contactList: makeSelectContactList(),
});

const mapDispatchToProps = dispatch => ({
  updateSettings: (settingId: number, data: object) =>
    dispatch(updateTrackerSettingsRequestedAction(settingId, data)),
  getContactListRequest: () => dispatch(getContactListRequestAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingTracker);
