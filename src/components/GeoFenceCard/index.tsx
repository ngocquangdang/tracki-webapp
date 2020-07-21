import React from 'react';
import { Switch } from '@material-ui/core';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { Card, Item, Image, ItemInfo, Name, CardDetail } from './styles';

interface Props {
  geofence: {
    id: number;
    name: string;
    icon_url: string;
    enabled: boolean;
  };
  selectedGeofenceId?: number;
  selectGeofence(id: number | string): void;
  updateGeofence(id: number, data: object): void;
}

export default function GeofenceCard(props: Props) {
  const { geofence, selectGeofence, updateGeofence } = props;

  const onSelectGeofence = () => {
    selectGeofence(geofence.id);
  };

  const toggleGeofence = () =>
    updateGeofence(geofence.id, { enabled: !geofence.enabled });

  return (
    <Card key={geofence.id}>
      <Item>
        <Image
          src={geofence.icon_url || 'images/tracki-device.png'}
          alt=""
          onClick={onSelectGeofence}
        />
        <ItemInfo>
          <Name onClick={onSelectGeofence}>{geofence.name}</Name>
          <Switch
            name="active"
            checked={!!geofence.enabled}
            onChange={toggleGeofence}
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
