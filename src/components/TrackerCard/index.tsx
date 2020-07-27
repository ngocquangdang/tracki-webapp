import React from 'react';
import moment from 'moment';

import { GoPrimitiveDot } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  useStyles,
  ImageWrapper,
  ListItemStyle,
} from './styles';
import { ITracker } from '@Interfaces';

interface Props {
  tracker: ITracker;
  isMobile?: boolean;
  onClickTracker(id: number): void;
}

export default function TrackerCard(props: Props) {
  const classes = useStyles();
  const { tracker, isMobile = false, onClickTracker } = props;

  const handleClick = () => {
    onClickTracker(tracker.device_id);
    if (tracker.lat && tracker.lng) {
      window.mapEvents.setCenterFlyTo(
        { lat: tracker.lat, lng: tracker.lng },
        { speed: 1, zoom: 15 }
      );
    }
    window.history.pushState({}, '', '/trackers/' + tracker.device_id);
  };

  return (
    <ListItemStyle
      button
      key={tracker.device_id}
      className={isMobile ? classes.padding : classes.nonePadding}
      onClick={handleClick}
    >
      <Item>
        <ImageWrapper>
          <Image src={tracker.icon_url || '/images/image-device.png'} alt="" />
        </ImageWrapper>
        <ItemInfo>
          <Name>{tracker.device_name}</Name>
          <Time>
            <GoPrimitiveDot className={classes.icon} />
            <TimeActive>
              Last Updated: {moment(tracker.time * 1000).fromNow()}
            </TimeActive>
          </Time>
        </ItemInfo>
      </Item>
      <CardDetail>{isMobile && <BsThreeDotsVertical />}</CardDetail>
    </ListItemStyle>
  );
}
