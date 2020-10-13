import React, { useState } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import LayoutConfirm from '../components';
import { Button } from '@Components/buttons';
import { FiGift } from 'react-icons/fi';
import { TextInput } from '@Components/inputs';

import {
  Form,
  About,
  ToolTip,
  Typography,
  TooltipStyle,
  AdornmentStyle,
  useStyles,
} from './styles';
import { BsQuestionCircle } from 'react-icons/bs';

interface Props {
  t(key: string, format?: object): string;
  updateStepChild?: Function;
  trackerPlan?: any;
  formData: any;
  account_id: number;
  onNextStep?(): void;
  isMobile?: boolean;
  braintreeDropinAction?(formData, callback): void;
  renewDeviceAction(formData, account_id, paymentData): void;
  NextStepChild(): void;
  paymentData: any;
}

const initialvalue = {
  referral_code: '',
};

export default function ReferralCodeContainer(props: Props) {
  const {
    t,
    renewDeviceAction,
    NextStepChild,
    formData,
    account_id,
    paymentData,
  } = props;

  const classes = useStyles();
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const onSubmit = value => {
    NextStepChild();
  };

  const onNextPage = () => {
    const paymentInfo = {
      nonce: paymentData.nonce || '',
      plan_id: formData.selectedPlan.id || '',
      email: paymentData.details.email || '',
      first_name: paymentData.details.firstName || '',
      last_name: paymentData.details.lastName || '',
    };
    renewDeviceAction(formData, account_id, paymentInfo);
  };
  return (
    <LayoutConfirm
      icon={<FiGift className={classes.icon} />}
      title={t('tracker:have_a_code')}
      subtitle={t('tracker:enter_your_code')}
      footerProps={
        <About>
          <Link href={''}>
            <strong className={classes.text}>{t('tracker:learn_more')}</strong>
          </Link>
          {t('tracker:referral_program')}
        </About>
      }
    >
      <Formik initialValues={initialvalue} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              id="referral_code"
              name="referral_code"
              label=""
              variant="outlined"
              placeholder="Enter Referral Code"
              value={values.referral_code}
              className={`${classes.marginInput} ${classes.padding}`}
              InputProps={{
                startAdornment: (
                  <TooltipStyle
                    open={isOpenTooltip}
                    onClick={() => setIsOpenTooltip(!isOpenTooltip)}
                    title={<ToolTips {...props} />}
                    // placement="right"
                    arrow
                  >
                    <AdornmentStyle position="end">
                      <BsQuestionCircle />
                    </AdornmentStyle>
                  </TooltipStyle>
                ),
              }}
              onChange={handleChange('referral_code')}
            />
            <Button
              color="primary"
              type="submit"
              variant="contained"
              text={t('tracker:confrim')}
              className={classes.marginButton}
            />
            <Typography onClick={onNextPage}>
              {t('tracker:dont_have_code')}
            </Typography>
          </Form>
        )}
      </Formik>
    </LayoutConfirm>
  );
}

function ToolTips(props: any) {
  const { t } = props;

  return (
    <ToolTip>
      <p>{t('tracker:referral_hind_1')}</p>
      <p>
        {t('tracker:referral_hind_2')}{' '}
        <strong>
          <br />
          {t('tracker:join_tracki')}
        </strong>
      </p>
    </ToolTip>
  );
}
