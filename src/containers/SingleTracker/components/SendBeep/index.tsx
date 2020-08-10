import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { GoPrimitiveDot } from 'react-icons/go';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button } from '@Components/buttons';
import {
  sendBeepRequest,
  resetBeepAction,
} from '@Containers/SingleTracker/store/actions';
import { makeSelectTrackerId } from '@Containers/Trackers/store/selectors';

import {
  Container,
  Content,
  Item,
  LeftItem,
  ImageWrapper,
  Image,
  ItemInfo,
  Name,
  Time,
  TimeActive,
  RightItem,
  TextRefresh,
  CotrolPlayer,
  ProgressBar,
  ControlTime,
  ControlButton,
  useStyles,
} from './styles';

interface Tracker {
  device_id: number;
  time: number;
  battery: number;
  speed: number;
  location_type: string;
  lat: number;
  lng: number;
  icon_url: string;
  device_name: string;
}

interface Props {
  handleClose(): void;
  t(key: string): string;
  isMobile: boolean;
  show: boolean;
  isRequesting?: boolean;
  tracker: Tracker;
  onClickSendBeep(data: object): void;
  resetBeep(): void;
  deviceId: number;
}

function SendBeep(props: Props) {
  const classes = useStyles();
  const { handleClose, t, isMobile, show, isRequesting, tracker } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const [isStartTime, setStartTime] = useState(true);
  const [isStopCallAPI, setStopCallAPI] = useState(true);

  useEffect(() => {
    if (isStartTime) {
      const intervalTime = setInterval(() => {
        // set time call API
        setSeconds(seconds + 1);
        setTime(time + 1 / 3);
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
        if (minutes === 5) {
          clearInterval(intervalTime);
          setSeconds(0);
          setTime(100);
        }
      }, 1000);
      setTimeout(() => {
        setStartTime(false);
        clearInterval(intervalTime);
      }, 300000);

      return () => {
        clearInterval(intervalTime);
        clearTimeout();
      };
    }

    return () => {
      setStartTime(false);
      clearTimeout();
    };
  }, [isStartTime, seconds, minutes, time, props]);

  useEffect(() => {
    if (isStopCallAPI) {
      const interval = setInterval(
        (function callApiSendBeep() {
          props.onClickSendBeep({
            beepPeriod: 2,
            beepType: 1,
            devices: [props.deviceId],
          });
          return callApiSendBeep;
        })(),
        15000
      );
      setTimeout(() => {
        setStopCallAPI(true);
        clearInterval(interval);
        props.resetBeep();
      }, 300000);
      return () => {
        clearInterval(interval);
        clearTimeout();
      };
    }
    return () => {
      setStopCallAPI(true);
      clearTimeout();
    };
  }, [isStopCallAPI, props]);

  const handleCloseSendBeep = () => {
    handleClose();
    props.resetBeep();
  };

  const handleClick = () => {
    setStopCallAPI(false);
    setStartTime(false);
    props.resetBeep();
    handleClose();
  };

  return (
    <SideBarOutside
      title={t('tracker:beep_device')}
      show={show}
      direction="right"
      handleClose={handleCloseSendBeep}
      isMobile={isMobile}
      isLogo={isMobile}
    >
      <Container>
        <Content isMobile={isMobile}>
          <Item isMobile={isMobile}>
            <LeftItem>
              <ImageWrapper>
                <Image
                  src={tracker.icon_url || '/images/image-device.png'}
                  alt=""
                />
              </ImageWrapper>
              <ItemInfo>
                <Name>{tracker.device_name}</Name>
                <Time>
                  <GoPrimitiveDot className={classes.icon} />
                  <TimeActive>
                    {`${t('tracker:last_update')}: ${moment(
                      tracker.time * 1000
                    ).fromNow()}`}
                  </TimeActive>
                </Time>
              </ItemInfo>
            </LeftItem>
            <RightItem>
              <TextRefresh>Refresh</TextRefresh>
              <RefreshIcon className={classes.rightIcon} />
            </RightItem>
          </Item>
          <CotrolPlayer>
            <ProgressBar variant="determinate" value={time} />
            <ControlTime>
              <div className={classes.time}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
              <div className={classes.time}>5:00</div>
            </ControlTime>
          </CotrolPlayer>
        </Content>
        <ControlButton>
          <Button
            className={`${classes.btn}`}
            variant="outlined"
            isLoading={isRequesting}
            text={'Stop Beep'}
            type="submit"
            onClick={handleClick}
          />
        </ControlButton>
        <div className={classes.description}>
          <div className={classes.textPadding}>{t('tracker:beep_minutes')}</div>
          <div>{t('tracker:beep_stop')}</div>
        </div>
      </Container>
    </SideBarOutside>
  );
}

const mapStateToProps = createStructuredSelector({
  deviceId: makeSelectTrackerId(),
});

const mapDispatchToProps = dispatch => ({
  onClickSendBeep: (data: object) => dispatch(sendBeepRequest(data)),
  resetBeep: () => dispatch(resetBeepAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendBeep);
