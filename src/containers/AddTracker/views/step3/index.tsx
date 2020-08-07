import React from 'react';
import { Formik } from 'formik';

import {
  Header,
  Form,
  Typography,
  GroupInput,
  UploadImage,
  InputSubcription,
  useStyles,
  Error,
} from './styles';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { TrackerDetail } from '../../schema';
import SelectOption from '@Components/selections';
import { LOCATION_UPDATE_OPTIONS } from '../../store/constances';

interface Props {
  t(key: string, format?: object): string;
  onNextStep: Function;
  addDeviceAction(data, acount_id, account_id, paymentData, callback): void;
  updateSettingsAction(): void;
  updateDeviceNameAction(): void;
  account_id: number;
  newDeviceInfo: {
    settings_id: number;
    device_id: number;
    device_name: string;
  };
  paymentData: any;
  formData: any;
  errors: {
    message: string;
  };
  onAdded(): void;
}
const initialTracker = {
  device_name: '',
  device_traking: LOCATION_UPDATE_OPTIONS[0].value,
  // divice_image: '',
};
export default function Step3(props: Props) {
  const classes = useStyles();
  const {
    t,
    onNextStep,
    addDeviceAction,
    account_id,
    paymentData,
    formData,
    errors,
    onAdded,
  } = props;
  console.log('paymentData', paymentData);

  const addDone = (done: boolean) => {
    done && onNextStep() && onAdded();
  };
  const onSubmit = value => {
    const paymentInfo = {
      nonce: paymentData.nonce || '',
      plan_id: formData.selectedPlan.id || '',
      email: paymentData.details.email || 'trackimo.home@gmail.com',
      first_name: paymentData.details.firstName || 'home',
      last_name: paymentData.details.lastName || 'trackimo',
    };
    addDeviceAction(value, formData, account_id, paymentInfo, addDone);
  };
  return (
    <>
      <Header>
        <Typography>{t('tracker:personalize_title')}</Typography>
      </Header>
      <Formik
        initialValues={initialTracker}
        onSubmit={onSubmit}
        validationSchema={TrackerDetail}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          errors: errorsForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <GroupInput>
              <TextInput
                id="device_name"
                label={t('tracker:device_name')}
                name="device_name"
                value={values.device_name}
                variant="outlined"
                className={classes.marginInput}
                onChange={handleChange('device_name')}
                onBlur={handleBlur('device_name')}
                errorInput={
                  errorsForm.device_name && touched.device_name
                    ? t(errorsForm.device_name)
                    : ''
                }
              />
              <InputSubcription>
                {t('tracker:device_name_subcription')}
              </InputSubcription>
            </GroupInput>
            <GroupInput>
              <SelectOption
                name="device_traking"
                options={LOCATION_UPDATE_OPTIONS}
                label={t('auth:tracking_intervals')}
                value={values.device_traking}
                onChangeOption={handleChange('device_traking')}
              />
              <InputSubcription>
                {t('tracker:tracking_intervals_subcription')}
              </InputSubcription>
            </GroupInput>
            <UploadImage>
              <div>upload</div>
              <InputSubcription>
                {t('tracker:add_image_subcription')}
              </InputSubcription>
            </UploadImage>
            <Error>{errors.message}</Error>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              text={t('tracker:save_continue')}
              className={classes.widthBtn}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}
