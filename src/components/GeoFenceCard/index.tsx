import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { BsThreeDotsVertical } from 'react-icons/bs';

import {
  Card,
  Item,
  Image,
  ItemInfo,
  Name,
  CardDetail,
  useStyles,
} from './styles';
import { Switch } from '@material-ui/core';

export default function Device(props: any) {
  const classes = useStyles();
  const { device, isLoading, active, handleChange } = props;

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
    <Card key={device.id}>
      <Item>
        <Image src={device.icon_url || 'images/tracki-device.png'} alt="" />
        <ItemInfo>
          <Name>{device.device_name}</Name>
          <Switch
            name="active"
            checked={active}
            onChange={handleChange}
            color="primary"
          />
        </ItemInfo>
      </Item>
      <CardDetail>
        <BsThreeDotsVertical />
      </CardDetail>
    </Card>
  );
}
