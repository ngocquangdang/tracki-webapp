import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

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
} from './styles';

export default function Device(props: any) {
  const classes = useStyles();
  const { device, isLoading } = props;

  if (isLoading) {
    return (
      <Card
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: 6,
          height: '70px',
        }}
      >
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
    <Card key={device.id}>
      <Item>
        <Image src="images/tracki-device.png" alt="" />
        <ItemInfo>
          <Name>{device.name}</Name>
          <Time>
            <GoPrimitiveDot className={classes.icon} />
            <TimeActive>{device.time}</TimeActive>
          </Time>
        </ItemInfo>
      </Item>
      <CardDetail>
        <BsThreeDotsVertical />
      </CardDetail>
    </Card>
  );
}
