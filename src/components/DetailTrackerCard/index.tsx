import React from 'react';
import {
  Container,
  Card,
  Item,
  Time,
  TimeActive,
  TrackerInfomation,
  TrackerStatus,
  BatteryTracker,
  StatusTracker,
  ConnectionTracker,
  Connection,
  Address,
  LocationApprox,
  Text,
  TextName,
  RightItem,
  LeftItem,
  useStyles,
} from './styles';
import moment from 'moment';
import { GoPrimitiveDot } from 'react-icons/go';
import RefreshIcon from '@material-ui/icons/Refresh';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Battery60Icon from '@material-ui/icons/Battery60';
import { AiOutlineDashboard } from 'react-icons/ai';
import Skeleton from '@material-ui/lab/Skeleton';
import Slide from '@material-ui/core/Slide';

interface Prop {
  isLoading?: boolean;
  tracker: Tracker;
}
interface Tracker {
  device_id: number;
  time: number;
  battery: number;
  speed: number;
  location_type: string;
}

function DetailTrackerCard(props: Prop) {
  const classes = useStyles();
  const { isLoading, tracker } = props;
  if (isLoading) {
    return (
      <Card>
        <Skeleton
          variant="circle"
          animation="wave"
          width={40}
          height={40}
          style={{ marginRight: 8 }}
          classes={{ root: classes.skeleton }}
        />
        <div>
          <Skeleton
            variant="text"
            width={150}
            animation="wave"
            classes={{ root: classes.skeleton }}
          />
          <Skeleton
            variant="text"
            width={250}
            animation="wave"
            classes={{ root: classes.skeleton }}
          />
        </div>
      </Card>
    );
  }
  return (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Container>
        <Card key={tracker.device_id}>
          <TrackerInfomation>
            <Item>
              <LeftItem>
                <Address>
                  <LocationOnIcon className={classes.iconLocation} />
                  <Text>
                    <TextName>
                      5845, Railton St, Moreno Valley, Riverside County,
                      California, 92553, USA
                    </TextName>
                    <Time>
                      <GoPrimitiveDot className={classes.icon} />
                      <TimeActive>
                        Last Updated: {moment(tracker.time * 1000).fromNow()}
                      </TimeActive>
                    </Time>
                  </Text>
                </Address>
              </LeftItem>
              <RightItem>
                <RefreshIcon className={classes.rightIcon} />
                <ZoomInIcon className={classes.rightIcon} />
              </RightItem>
            </Item>
          </TrackerInfomation>
          <TrackerStatus>
            <BatteryTracker>
              <Battery60Icon />
              <span className={classes.textSpace}>{tracker.battery}%</span>
            </BatteryTracker>
            <StatusTracker>
              <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />
              <span className={`${classes.textBold} ${classes.textSpace}`}>
                {tracker.speed}
              </span>
            </StatusTracker>
            <ConnectionTracker>
              <Connection>
                Connection:
                <span className={classes.textBold}>
                  {tracker.location_type}
                </span>
              </Connection>
              <LocationApprox>Location within approx. 5-20m</LocationApprox>
            </ConnectionTracker>
          </TrackerStatus>
        </Card>
      </Container>
    </Slide>
  );
}

export default DetailTrackerCard;
