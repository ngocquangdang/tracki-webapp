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
} from './styles';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { TrackerDetail } from '../../schema';

interface Props {
  t: Function;
  onNextStep: Function;
}
const initialTracker = {
  device_name: '',
  device_traking: '',
  // divice_image: '',
};
export default function Step3(props: Props) {
  const classes = useStyles();
  const { t, onNextStep } = props;

  const onSubmit = value => {
    console.log(value);
    onNextStep();
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
        {({ values, handleChange, handleSubmit, handleBlur, touched }) => (
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
              />
              <InputSubcription>
                {t('tracker:device_name_subcription')}
              </InputSubcription>
            </GroupInput>
            <GroupInput>
              <TextInput
                id="device_traking"
                name="device_traking"
                value={values.device_traking}
                variant="outlined"
                label={t('tracker:tracking_intervals')}
                className={classes.marginInput}
                onChange={handleChange('device_traking')}
                onBlur={handleBlur('device_traking')}
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
