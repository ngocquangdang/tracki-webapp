import React from 'react';
import LayoutConfirm from '../components';
import { Button } from '@Components/buttons';
import { FaCheckCircle } from 'react-icons/fa';

import {
  FormInfo,
  useStyles,
  FooterLetter,
  ContainerLetter,
  HeaderLetter,
} from './styles';
import Link from 'next/link';
export default function CongratulationContainer(props: any) {
  const { t, renewDeviceAction, formData, account_id, paymentData } = props;
  const classes = useStyles();

  const onSubmit = () => {
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
      icon={<FaCheckCircle className={classes.icon} />}
      title={t('tracker:congratulations')}
      subtitle={t('tracker:referral_code')}
      footerProps={
        <Button
          color="primary"
          type="submit"
          variant="contained"
          text={t('tracker:continue')}
          className={classes.widthBtn}
          onClick={onSubmit}
        />
      }
    >
      <FormInfo>
        <HeaderLetter>
          {t('tracker:hi_customer', { name: 'John' })}
        </HeaderLetter>
        <ContainerLetter>
          {t('tracker:content_congratulations', { money: '10$' })}
        </ContainerLetter>
        <FooterLetter>
          <Link href={''}>
            <strong className={classes.text}>{t('tracker:click_here')}</strong>
          </Link>
          {t('tracker:sub_click_here')}
        </FooterLetter>
      </FormInfo>
    </LayoutConfirm>
  );
}
