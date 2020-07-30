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
  const { t } = props;
  const classes = useStyles();
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
          onClick={props.nextStep}
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
