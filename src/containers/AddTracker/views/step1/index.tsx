import React from 'react';
import { Formik } from 'formik';

import {
  Typography,
  Form,
  StepOneContainer,
  Image,
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
  isActive: Function;
}

const initialTracker = {
  tracker_id: '',
  imei: '',
  order_id: '',
};

export default function Step1(props: Props) {
  const { t, onNextStep } = props;
  const classes = useStyles();

  const onSubmit = (value: any) => {
    console.log('aaaaaaaasa', value);
    onNextStep();
    props.isActive();
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
                id="tracker_id"
                label={t('tracker:tracker_id')}
                name="tracker_id"
                value={values.tracker_id}
                variant="outlined"
                className={classes.marginInput}
                onChange={handleChange('tracker_id')}
                onBlur={handleBlur('tracker_id')}
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
              <Button
                color="primary"
                type="submit"
                variant="contained"
                text={t('tracker:add_device')}
                className={classes.marginButton}
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
