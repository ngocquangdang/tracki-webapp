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

interface Props {
  t: Function;
}
const initialTracker = {
  device_name: '',
  device_traking: '',
  divice_image: '',
};
export default function Step3(props: Props) {
  const classes = useStyles();
  const { t } = props;

  const onSubmit = value => console.log(value);
  return (
    <>
      <Header>
        <Typography>{t('tracker:personalize_title')}</Typography>
      </Header>
      <Formik initialValues={initialTracker} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            <GroupInput>
              <TextInput
                id="tracker_name"
                label={t('tracker:tracker_name')}
                name="tracker_name"
                value={values.device_name}
                variant="outlined"
                className={classes.marginInput}
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
              />
              <InputSubcription>
                {t('tracker:tracking_intervals_subcription')}
              </InputSubcription>
            </GroupInput>
            <UploadImage>
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
