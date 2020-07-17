import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';

import { GoPrimitiveDot } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Card,
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  useStyles,
  ImageWrapper,
} from './styles';

export default function Device(props: any) {
  const classes = useStyles();
  const { tracker, isLoading, isMobile, onClickTracker } = props;

  if (isLoading) {
    return (
      <Card isMobile={isMobile}>
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
    <Card key={tracker.device_id} isMobile={isMobile} onClick={onClickTracker}>
      <Item>
        <ImageWrapper>
          <Image src={tracker.icon_url || 'images/image-device.png'} alt="" />
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
    </Card>
  );
}
