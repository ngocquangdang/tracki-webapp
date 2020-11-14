import React, { useState, useCallback } from 'react';
import { Formik } from 'formik';

import { AiOutlineCamera } from 'react-icons/ai';
import { CircularProgress } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';

import {
  Header,
  Form,
  Typography,
  GroupInput,
  UploadImage,
  InputSubcription,
  useStyles,
  Error,
  Image,
} from './styles';

import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { TrackerDetail } from '../../schema';
// import SelectOption from '@Components/selections';
import { LOCATION_UPDATE_OPTIONS } from '../../store/constances';

interface Props {
  t(key: string, format?: object): string;
  onNextStep: Function;
  updatePersonalizeDeviceRequest(data, acount_id, account_id, callback): void;
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
  updateStore(value): void;
  isRequesting: boolean;
}
const initialTracker = {
  device_name: '',
  device_traking: LOCATION_UPDATE_OPTIONS[0].value,
};
export default function Step3(props: Props) {
  const classes = useStyles();
  const {
    t,
    onNextStep,
    updatePersonalizeDeviceRequest,
    account_id,
    formData,
    errors,
    onAdded,
    updateStore,
    isRequesting,
  } = props;
  const [loading, setLoading] = useState(false);
  const [imageFile, setImage] = useState<any>({});
  const addDone = (done: boolean) => {
    if (done) {
      onNextStep();
      onAdded();
    }
  };
  const onDrop = useCallback(files => {
    const file = files[0];
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setImage({ result: reader.result, file: file });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const onSubmit = value => {
    if (value.device_name.trim() !== '') {
      updatePersonalizeDeviceRequest(
        { value, file: imageFile.file },
        formData,
        account_id,
        addDone
      );
      updateStore({
        ...formData,
        device_name: value.device_name,
      });
    } else {
      updateStore({
        ...formData,
        device_name: formData.device_id,
      });
      addDone(true);
    }
  };
  const renderInputImage = () => {
    return (
      <UploadImage {...getRootProps()}>
        {loading && (
          <CircularProgress className={classes.loading} color="secondary" />
        )}
        {imageFile.result ? (
          <div className={classes.elipLocation}>
            <Image background={imageFile.result} />
          </div>
        ) : (
          <div className={classes.elipLocation}>
            <img src="/images/tracki-device.png" alt="" />
          </div>
        )}
        <input {...getInputProps()} />
        <Button
          type="button"
          variant="text"
          text={
            <div className={classes.inputUploadImage}>
              <AiOutlineCamera className={classes.iconCamera} />
              <div className={classes.textAdd}>
                {imageFile.result ? 'Change' : 'Add Picture'}
              </div>
            </div>
          }
          className={classes.widthBtnImage}
        />
      </UploadImage>
    );
  };

  return (
    <div className={classes.personalize}>
      <Header>
        <p className={classes.number}>1</p>{' '}
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
                label={t('tracker:tracker_name')}
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
            {/* <GroupInput>
              <div className={classes.selectOption}>
                <SelectOption
                  name="device_traking"
                  options={LOCATION_UPDATE_OPTIONS}
                  label={t('tracker:tracking_intervals')}
                  value={values.device_traking}
                  onChangeOption={handleChange('device_traking')}
                />
              </div>
              <InputSubcription>
                {t('tracker:tracking_intervals_subcription')}
              </InputSubcription>
            </GroupInput> */}
            <Header>
              <p className={classes.number}>2</p>
              <Typography>{t('tracker:add_picture_title')}</Typography>
            </Header>
            {renderInputImage()}
            <div>
              <InputSubcription>
                {t('tracker:add_picture_subtitle')}
              </InputSubcription>
            </div>
            <InputSubcription>
              {t('tracker:add_image_subcription')}
            </InputSubcription>
            <Error>{errors.message}</Error>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              isLoading={isRequesting}
              text={t('tracker:save_continue')}
              className={classes.widthBtn}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
