import React from 'react';
import moment from 'moment';
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { GoPrimitiveDot } from 'react-icons/go';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button } from '@Components/buttons';

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
  onClickViewBeep(): void;
  tracker: Tracker;
}

function SendBeep(props: Props) {
  const classes = useStyles();
  const {
    handleClose,
    t,
    isMobile,
    show,
    isRequesting,
    onClickViewBeep,
    tracker,
  } = props;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <SideBarOutside
      title={t('tracker:beep_device')}
      show={show}
      direction="right"
      handleClose={handleClose}
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
            <ProgressBar variant="determinate" value={progress} />
            <ControlTime>
              <div className={classes.time}>1:30</div>
              <div className={classes.time}>5:00</div>
            </ControlTime>
          </CotrolPlayer>
        </Content>
        <ControlButton>
          <Button
            className={`${classes.btn}`}
            variant="outlined"
            isLoading={isRequesting}
            text={t('tracker:send_beep')}
            type="submit"
            onClick={onClickViewBeep}
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

export default SendBeep;
