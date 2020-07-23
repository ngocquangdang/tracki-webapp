import React, { useState, useEffect } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { Formik } from 'formik';
import { Switch } from '@material-ui/core';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import MenuWrap from '@Components/sidebars/SideBarOutside';
import SelectOption from '@Components/selections';
import { Button } from '@Components/buttons';
import { TextInput } from '@Components/inputs';

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

const LOCATION_STATUS = [
  {
    value: 'on',
    content: 'On',
  },
  {
    value: 'off',
    content: 'Off',
  },
];
interface SettingState {
  locationStatus: {
    value: string;
    content: string;
  }[];
}
function SettingTracker(props: any) {
  const [state] = useState<SettingState>({
    locationStatus: [...LOCATION_STATUS],
  });
  const classes = useStyles();
  const { handleClose, t, tracker, settings, isMobile } = props;
  const [infoTracker, setInfoTracker] = useState({
    device_name: '',
    device_id: '',
    location_status: 'Off',
    speed_unit: 'kph',
    speed_limit: {
      enable: true,
      value: 5,
      unit: 'kph',
    },
    speed_moving: false,
    low_battery: false,
    device_beep_sound: false,
    zone_entry: false,
    zone_exit: false,
    battery_sleep: false,
  });

  useEffect(() => {
    setInfoTracker({
      device_name: tracker.device_name || '',
      device_id: tracker.device_id || '',
      location_status: 'Off',
      speed_unit: settings?.preferences?.speed_limit.unit,
      speed_limit: settings?.preferences?.speed_limit,
      speed_moving: false,
      low_battery: settings?.preferences?.low_battery,
      device_beep_sound: settings?.preferences?.device_beep_sound,
      zone_entry: settings?.preferences?.zone_entry,
      zone_exit: settings?.preferences?.zone_exit,
      battery_sleep: false,
    });
  }, [tracker, settings]);

  const onSubmitForm = (values: object) => {
    console.log('___submit', values);
  };

  return (
    <MenuWrap title="Settings" handleClose={handleClose} isMobile={isMobile}>
      <Container>
        <ImageTracker>
          <ImageWrapper>
            <Image
              src={tracker.icon_url || '/images/image-device.png'}
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
        >
          {({
            values,
            errors: errorsForm,
            handleChange,
            setFieldValue,
            handleSubmit,
            handleBlur,
            touched,
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
                    // errorInput={
                    //   errorsForm.device_name && touched.device_name
                    //     ? t(errorsForm.device_name)
                    //     : errors.device_name
                    // }
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
                    name="location_status"
                    defaultValues={values.location_status}
                    label={t('tracker:location_updated')}
                    option={state.locationStatus}
                    onChangeOption={handleChange('location_status')}
                  />
                  <TextDescription1>
                    Tracker's path tracking Intervals (to save battery set to
                    less frequent)
                  </TextDescription1>
                  <TextDescription2>
                    Need Faster Tracking? Contact us to enable up to 5 seconds
                  </TextDescription2>
                </ContainerPadding>
                <ContainerButtonModal>
                  <Text>Subscriptions</Text>
                  <NavigateNextIcon className={classes.iconNext} />
                </ContainerButtonModal>
                <TitleAlert>{t('tracker:alert_setting')}</TitleAlert>
                <ContainerPadding>
                  <SelectGroup>
                    <SubTitle>{t('tracker:speed_unit')}</SubTitle>
                    <RadioGroup
                      value={values.speed_unit}
                      onChange={e => handleChange('speed_unit')(e.target.value)}
                      name="speed_unit"
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
                        label={t(`${values.speed_limit?.unit?.toUpperCase()}`)}
                        name="speed_limit"
                        value={values.speed_limit?.value || 0}
                        onChange={handleChange('speed_limit')}
                        onBlur={handleBlur('speed_limit')}
                        variant="outlined"
                      />
                      <AiOutlineQuestionCircle
                        className={`${classes.questionIcon} ${classes.speedLimit}`}
                      />
                      <PersonAddIcon
                        className={`${classes.personAddIcon} ${classes.speedLimit}`}
                      />
                      <Switch
                        name="speed_limit"
                        checked={values.speed_limit?.enable}
                        onChange={e => {
                          setFieldValue('speed_limit', e.target.checked);
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
                        checked={values.speed_moving || false}
                        value={values.speed_moving}
                        onChange={e =>
                          setFieldValue('speed_moving', e.target.checked)
                        }
                        onBlur={handleBlur('speed_moving')}
                        name="speed_moving"
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
                        checked={values.low_battery || false}
                        value={values.low_battery}
                        onChange={e =>
                          setFieldValue('low_battery', e.target.checked)
                        }
                        onBlur={handleBlur('low_battery')}
                        name="low_battery"
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
                        checked={values.device_beep_sound || false}
                        value={values.device_beep_sound}
                        onChange={e =>
                          setFieldValue('device_beep_sound', e.target.checked)
                        }
                        onBlur={handleBlur('device_beep_sound')}
                        name="device_beep_sound"
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
                        onBlur={handleBlur('zone_entry')}
                        name="zone_entry"
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
                        onBlur={handleBlur('zone_exit')}
                        name="zone_exit"
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
                    text={t('auth:save')}
                    type="submit"
                  />
                </ContainerPadding>
              </Content>
            );
          }}
        </Formik>
      </Container>
    </MenuWrap>
  );
}

export default SettingTracker;
