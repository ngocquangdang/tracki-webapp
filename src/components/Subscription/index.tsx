import React from 'react';
import Modal from '@Components/modals';
import {
  Title,
  SubTitle,
  WrapTitle,
  Content,
  ButtonControl,
  Cancel,
  Container,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';
interface Props {
  t: any;
  onClickIncrease?(): void;
  onClickCancel?(): void;
  open: boolean;
  onCloseSubscription(): void;
}

function SubscriptionModal(props: Props) {
  const {
    t,
    open,
    onClickIncrease,
    onClickCancel,
    onCloseSubscription,
  } = props;
  const classes = useStyles();

  return (
    <Container>
      <Modal
        open={open}
        handleClose={onCloseSubscription}
        title={t('tracker:subcription')}
      >
        <Content>
          <WrapTitle>
            <Title>{t('tracker:device_active')}: </Title>
            <SubTitle>March 30, 2020</SubTitle>
          </WrapTitle>
          <WrapTitle>
            <Title>{t('tracker:current_plan')}: </Title>
            <SubTitle>6 Months</SubTitle>
          </WrapTitle>
          <WrapTitle>
            <Title>{t('tracker:limit_month_use')}: </Title>
            <SubTitle>0 out of 30 text alerts</SubTitle>
          </WrapTitle>
        </Content>
        <ButtonControl>
          <Button
            variant="outlined"
            text={t('tracker:increase_subscription')}
            onClick={onClickIncrease}
            className={`${classes.btn} ${classes.margin}`}
          />
          <Cancel onClick={onClickCancel}>
            {t('tracker:cancel_subscription')}
          </Cancel>
        </ButtonControl>
      </Modal>
    </Container>
  );
}

export default SubscriptionModal;
