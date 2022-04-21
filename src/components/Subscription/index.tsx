import React from 'react';
import Modal from '@Components/modals';
import moment from 'moment';

import { Title, SubTitle, WrapTitle, Content, useStyles } from './styles';
import { Button } from '@Components/buttons';
interface Props {
  t(key: string, format?: object): string;
  onClickIncrease?(): void;
  onClickFastTracking?(): void;
  onClickCancel?(): void;
  open: boolean;
  onCloseSubscription(): void;
  smsCounter?: SMSCounter;
  devcieSubscription?: any;
  currentPlan?: CurrentPlan;
}

interface SMSCounter {
  smsCounter: number;
  smsLimit: number;
}

interface CurrentPlan {
  activated: number;
  name?: string;
}
function SubscriptionModal(props: Props) {
  const {
    t,
    open,
    onClickIncrease,
    // onClickFastTracking,
    onClickCancel,
    onCloseSubscription,
    smsCounter,
    currentPlan,
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
          <SubTitle>
            {currentPlan?.activated
              ? moment(currentPlan.activated).format('LL')
              : ''}
          </SubTitle>
        </WrapTitle>
        <WrapTitle>
          <Title>{t('tracker:current_plan')}: </Title>
          <SubTitle>{currentPlan?.name || ''}</SubTitle>
        </WrapTitle>
        <WrapTitle>
          <Title>{t('tracker:limit_month_use')}: </Title>
          <SubTitle>
            {smsCounter?.smsCounter || 0} out of {smsCounter?.smsLimit || 0}{' '}
            text alerts
          </SubTitle>
        </WrapTitle>
        <Button
          variant="contained"
          text={t('tracker:increase_subscription')}
          onClick={onClickIncrease}
          color={'primary'}
          fullWidth={true}
          className={classes.btn}
        />
      </Content>
      {/* <Content>
        <WrapTitle>
          <Title>{t('tracker:device_active')}: </Title>
          <SubTitle>-</SubTitle>
        </WrapTitle>
        <WrapTitle>
          <Title>{t('tracker:current_plan')}: </Title>
          <SubTitle>-</SubTitle>
        </WrapTitle>
        <Button
          variant="contained"
          text={'fast tracking'}
          onClick={onClickFastTracking}
          color={'primary'}
          fullWidth={true}
          className={classes.btn}
        />
      </Content> */}
      <Button
        onClick={onClickCancel}
        text={t('tracker:cancel_subscription')}
        color="secondary"
        fullWidth={true}
        classes={classes.btn}
      />
    </Modal>
  );
}

export default SubscriptionModal;
