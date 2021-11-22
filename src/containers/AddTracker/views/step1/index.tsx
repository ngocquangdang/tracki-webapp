import React from 'react';
import { Formik } from 'formik';

import {
  Typography,
  Form,
  StepOneContainer,
  Image,
  Notifi,
  useStyles,
  // AdornmentStyle,
  // TooltipStyle,
  // ToolTip,
  ScanQR,
  QRImage,
  QR1,
  QR2,
} from './styles';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
// import { BsQuestionCircle } from 'react-icons/bs';
import { AddTrackerSchema } from '../../schema';
import { AiOutlineQrcode } from 'react-icons/ai';
interface Props {
  t(key: string, format?: object): string;
  onNextStep: Function;
  checkDeviceAssignedAction(value: any, callback: any): void;
  getDevicePlanAction(value): void;
  isRequesting: boolean;
  assigned: string;
  errorMessage: string;
  updateStore(value): void;
  formData: {
    device_id: string;
    imei: string;
    order: string;
  };
  isMobile: boolean;
}

export default function Step1(props: Props) {
  const {
    t,
    onNextStep,
    checkDeviceAssignedAction,
    getDevicePlanAction,
    updateStore,
    isRequesting,
    assigned,
    errorMessage,
    formData,
    isMobile,
  } = props;
  const classes = useStyles();
  // const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const onSubmit = (value: any) => {
    checkDeviceAssignedAction(
      { ...value, device_id: value.device_id.trim(), imei: value.imei.trim() },
      onNextStep
    );
    updateStore(value);
    getDevicePlanAction(value);
  };

  return (
    <>
      <ScanQR className={isMobile ? '' : classes.hidden}>
        <Typography>{t('tracker:scan_qr_subscription')}</Typography>
        <QRImage>
          <QR1>
            <img src="./images/1qr.png" alt="" className={classes.maxWidth} />
          </QR1>
          <QR2>
            <img src="./images/2qr.png" alt="" className={classes.maxWidth} />
          </QR2>
        </QRImage>
        <Button
          variant="contained"
          text={t('tracker:scan_qr_code')}
          className={`${classes.maxWidth} ${classes.btn}`}
          startIcon={<AiOutlineQrcode />}
          isLoading={isRequesting}
        />
      </ScanQR>
      <div className={`${classes.or} ${isMobile ? '' : classes.hidden}`}>
        or
      </div>
      <Typography>{t('tracker:add_tracker_description')}</Typography>
      <StepOneContainer>
        <Formik
          initialValues={formData}
          onSubmit={onSubmit}
          validationSchema={AddTrackerSchema}
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
              <TextInput
                id="device_id"
                label={t('tracker:tracker_id')}
                name="device_id"
                value={values.device_id}
                variant="outlined"
                className={classes.marginInput}
                onChange={handleChange('device_id')}
                onBlur={handleBlur('device_id')}
                errorInput={
                  errorsForm.device_id && touched.device_id
                    ? t(errorsForm.device_id)
                    : undefined
                }
              />
              <TextInput
                id="imei"
                name="imei"
                label="IMEI (Last 4 digits of tracker)"
                value={values.imei}
                variant="outlined"
                placeholder="IMEI (Last 4 digits of tracker)"
                className={classes.marginInput}
                onChange={handleChange('imei')}
                onBlur={handleBlur('imei')}
                errorInput={
                  errorsForm.imei && touched.imei
                    ? t(errorsForm.imei)
                    : undefined
                }
              />
              {/* <div className={`${classes.relative}`}>
                <TextInput
                  id="order"
                  label={t('tracker:order_id')}
                  name="order"
                  variant="outlined"
                  value={values.order}
                  className={`${classes.marginInput} ${classes.relative}`}
                  onChange={handleChange('order')}
                  onBlur={handleBlur('order')}
                  errorInput={
                    errorsForm.order && touched.order ? t(errorsForm.order) : ''
                  }
                />
                <TooltipStyle
                  open={isOpenTooltip}
                  className={classes.absolute}
                  onClick={() => setIsOpenTooltip(!isOpenTooltip)}
                  title={<ToolTips {...props} />}
                  placement="right"
                  arrow
                >
                  <AdornmentStyle position="end">
                    <BsQuestionCircle />
                  </AdornmentStyle>
                </TooltipStyle>
              </div> */}

              <Notifi
                className={assigned !== 'true' ? classes.displayNone : ''}
              >
                {t('tracker:cannot_activate_device')}
              </Notifi>
              <Notifi
                className={errorMessage !== '' ? '' : classes.displayNone}
              >
                {errorMessage !== ''
                  ? errorMessage
                  : 'Invalid Tracker Id or IMEI'}
              </Notifi>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                text={t('tracker:add_device')}
                className={classes.marginInput}
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

// function ToolTips(props: Props) {
//   const { t } = props;

//   return (
//     <ToolTip>
//       <p>{t('tracker:add_tracker_hind_1')}</p>
//       <p>{t('tracker:add_tracker_hind_2')}</p>
//       <p>{t('tracker:add_tracker_hind_3')}</p>
//     </ToolTip>
//   );
// }
