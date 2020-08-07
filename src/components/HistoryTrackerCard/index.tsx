import React, { Fragment, useState, useEffect, useCallback } from 'react';

import moment from 'moment';
import { GoPrimitiveDot } from 'react-icons/go';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Battery60Icon from '@material-ui/icons/Battery60';
import { AiOutlineDashboard } from 'react-icons/ai';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button } from '@Components/buttons';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import axios from 'axios';

import {
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
  LeftItem,
  IconRed,
  ItemInfo,
  Name,
  LatLong,
  LatText,
  LongText,
  ControlButton,
  StatusSpeed,
  Footer,
  InfoStatusTracker,
  TextStatus,
  TimeStatus,
  ControlText,
  useStyles,
} from './styles';
import { MAPBOX_API_KEY } from '@Definitions/app';
import { ITracker } from '@Interfaces';

interface Prop {
  isLoading?: boolean;
  tracker: ITracker;
  isMobile: boolean;
  onClickPrevios(): void;
  onClickNext(): void;
}

function HistoryTrackerCard(props: Prop) {
  const classes = useStyles();
  const { tracker, isMobile, onClickPrevios, onClickNext } = props;
  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState(null);

  const callApiGetAddress = useCallback(async () => {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${tracker.lng},${tracker.lat}.json?types=poi&access_token=${MAPBOX_API_KEY}`
    );
    const address = data.features[0] || { place_name: 'Unknow location' };
    setDataAddress(address.place_name);
    setLoading(false);
  }, [setDataAddress, setLoading, tracker]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const ske = () => (
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

  const renderContentPC = () => {
    return (
      <TrackerInfomation isMobile={isMobile}>
        <Item isMobile={isMobile}>
          <LeftItem>
            <IconRed />
            <ItemInfo>
              <Name>{tracker.device_name}</Name>
              <Time>
                <GoPrimitiveDot className={classes.icon} />
                <TimeActive>
                  Last Updated: {moment(tracker.time * 1000).fromNow()}
                </TimeActive>
              </Time>
            </ItemInfo>
          </LeftItem>
        </Item>
        <Address isMobile={isMobile}>
          <LocationOnIcon className={classes.iconLocation} />
          <Text>
            <TextName>
              {dataAddress}
              <LatLong>
                <LatText>Lat: {tracker.lat}</LatText>
                <LongText>Lon: {tracker.lng}</LongText>
              </LatLong>
            </TextName>
          </Text>
        </Address>
      </TrackerInfomation>
    );
  };

  const renderContentMobile = () => {
    return (
      <Card key={tracker.device_id}>
        <TrackerInfomation isMobile={isMobile}>
          <Item isMobile={isMobile}>
            <LeftItem>
              <Address isMobile={isMobile}>
                <LocationOnIcon className={classes.iconLocation} />
                <Text>
                  <TextName>{dataAddress}</TextName>
                  <Time>
                    <GoPrimitiveDot className={classes.icon} />
                    <TimeActive>
                      Last Updated: {moment(tracker.time * 1000).fromNow()}
                    </TimeActive>
                  </Time>
                </Text>
              </Address>
            </LeftItem>
          </Item>
        </TrackerInfomation>
      </Card>
    );
  };

  return (
    <Fragment>
      {loading ? ske() : isMobile ? renderContentMobile() : renderContentPC()}
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
            <span className={classes.textBold}>{tracker.location_type}</span>
          </Connection>
          <LocationApprox>Location within approx. 5-20m</LocationApprox>
        </ConnectionTracker>
      </TrackerStatus>
      <Footer>
        <ControlButton>
          <Button
            classes={classes.btn}
            text="Previos"
            color="primary"
            type="submit"
            startIcon={<NavigateBeforeIcon className={classes.iconArrow} />}
            onClick={onClickPrevios}
          />
          <Button
            classes={classes.btn}
            text="Next"
            color="primary"
            type="submit"
            endIcon={<NavigateNextIcon className={classes.iconArrow} />}
            onClick={onClickNext}
          />
        </ControlButton>
        <StatusSpeed>
          <div className={classes.stop}>
            <div className={classes.iconStop}></div>
            <span className={classes.textIcon}>Stop</span>
          </div>
          <div className={classes.stop}>
            <div className={classes.iconSpeed}></div>
            <span className={classes.textIcon}>Speed</span>
          </div>
        </StatusSpeed>
        <InfoStatusTracker>
          <ControlText>
            <TextStatus>Stopped on:</TextStatus>
            <TimeStatus> Jun 25, 2020 06:45: PM</TimeStatus>
          </ControlText>
          <ControlText>
            <TextStatus>Started on:</TextStatus>
            <TimeStatus> Jun 25, 2020 06:52: PM</TimeStatus>
          </ControlText>
          <ControlText>
            <TextStatus>Stoppped Duration:</TextStatus>
            <TimeStatus> 00d 00:09:11</TimeStatus>
          </ControlText>
        </InfoStatusTracker>
      </Footer>
    </Fragment>
  );
}

export default HistoryTrackerCard;
