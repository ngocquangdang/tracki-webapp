import React, { useState } from 'react';
import { Formik } from 'formik';

import {
  Typography,
  Form,
  StepOneContainer,
  Image,
  Notifi,
  useStyles,
  AdornmentStyle,
  TooltipStyle,
  ToolTip,
} from './styles';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { BsQuestionCircle } from 'react-icons/bs';
import { AddTrackerSchema } from '../../schema';
interface Props {
  t: Function;
  onNextStep: Function;
  checkDeviceAssignedAction(value: any, callback: any): void;
  getDevicePlanAction(value): void;
  isRequesting: boolean;
  assigned: string;
  message_key: string;
  updateStore(value): void;
}

const initialTracker = {
  device_id: '',
  imei: '',
  order_id: '',
};

export default function Step1(props: Props) {
  const {
    t,
    onNextStep,
    checkDeviceAssignedAction,
    getDevicePlanAction,
    updateStore,
    isRequesting,
    assigned,
    message_key,
  } = props;
  const classes = useStyles();
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const onSubmit = (value: any) => {
    checkDeviceAssignedAction(value, onNextStep);
    updateStore(value);
    getDevicePlanAction(value);
  };
  return (
    <>
      <Typography>{t('tracker:add_tracker_description')}</Typography>
      <StepOneContainer>
        <Formik
          initialValues={initialTracker}
          onSubmit={onSubmit}
          validationSchema={AddTrackerSchema}
        >
          {({ values, handleChange, handleSubmit, handleBlur, touched }) => (
            <Form onSubmit={handleSubmit}>
              <TextInput
                id="device_id"
                label={t('tracker:device_id')}
                name="device_id"
                value={values.device_id}
                variant="outlined"
                className={classes.marginInput}
                onChange={handleChange('device_id')}
                onBlur={handleBlur('device_id')}
              />
              <TextInput
                id="imei"
                name="imei"
                label=""
                value={values.imei}
                variant="outlined"
                placeholder="IMEI (Last 4 digits of tracker)"
                className={classes.marginInput}
                onChange={handleChange('imei')}
                onBlur={handleBlur('imei')}
              />
              <TextInput
                id="order_id"
                label={t('tracker:order_id')}
                name="order_id"
                variant="outlined"
                value={values.order_id}
                className={`${classes.marginInput} ${classes.padding}`}
                InputProps={{
                  startAdornment: (
                    <TooltipStyle
                      open={isOpenTooltip}
                      onClick={() => setIsOpenTooltip(!isOpenTooltip)}
                      title={<ToolTips {...props} />}
                      placement="right"
                      arrow
                    >
                      <AdornmentStyle position="end">
                        <BsQuestionCircle />
                      </AdornmentStyle>
                    </TooltipStyle>
                  ),
                }}
                onChange={handleChange('order_id')}
                onBlur={handleBlur('order_id')}
              />
              <Notifi
                className={assigned !== 'true' ? classes.displayNone : ''}
              >
                {t('tracker:cannot_activate_device')}
              </Notifi>
              <Notifi
                className={
                  message_key !== 'exception_device_notFound'
                    ? classes.displayNone
                    : ''
                }
              >
                {t('tracker:exception_device_notFound')}
              </Notifi>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                text={t('tracker:add_device')}
                className={classes.marginButton}
                isLoading={isRequesting}
              />
            </Form>
          )}
        </Formik>
        <Image>
          <img src="./images/tracker-id.png" alt="" />
        </Image>
      </StepOneContainer>
    </>
  );
}

function ToolTips(props: Props) {
  const { t } = props;

  return (
    <ToolTip>
      <p>{t('tracker:add_tracker_hind_1')}</p>
      <p>{t('tracker:add_tracker_hind_2')}</p>
      <p>{t('tracker:add_tracker_hind_3')}</p>
    </ToolTip>
  );
}
