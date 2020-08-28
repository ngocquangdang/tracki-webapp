import React from 'react';
import Modal from '@Components/modals';

import {
  Title,
  SubTitle,
  WrapTitle,
  Content,
  ButtonControl,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';
interface Props {
  t(key: string, format?: object): string;
  onClickIncrease?(): void;
  onClickCancel?(): void;
  open: boolean;
  onCloseSubscription(): void;
  smsCounter?: SMSCounter;
  devcieSubscription?: object;
}

interface SMSCounter {
  smsCounter: number;
  smsLimit: number;
}

function SubscriptionModal(props: Props) {
  const {
    t,
    open,
    onClickIncrease,
    onClickCancel,
    onCloseSubscription,
    smsCounter,
    // devcieSubscription,
  } = props;
  const classes = useStyles();

  return (
    <Modal
      open={open}
      handleClose={onCloseSubscription}
      title={t('tracker:subcription')}
    >
      <Content>
        <WrapTitle>
          <Title>{t('tracker:device_active')}: </Title>
          <SubTitle>-</SubTitle>
        </WrapTitle>
        <WrapTitle>
          <Title>{t('tracker:current_plan')}: </Title>
          <SubTitle>-</SubTitle>
        </WrapTitle>
        <WrapTitle>
          <Title>{t('tracker:limit_month_use')}: </Title>
          <SubTitle>
            {smsCounter?.smsCounter} out of {smsCounter?.smsLimit} text alerts
          </SubTitle>
        </WrapTitle>
      </Content>
      <ButtonControl>
        <Button
          variant="contained"
          text={t('tracker:increase_subscription')}
          onClick={onClickIncrease}
          color={'primary'}
          fullWidth={true}
          className={classes.btn}
        />

        <Button
          onClick={onClickCancel}
          text={t('tracker:cancel_subscription')}
          color="secondary"
          fullWidth={true}
          classes={classes.btn}
        />
      </ButtonControl>
    </Modal>
  );
}

export default SubscriptionModal;
