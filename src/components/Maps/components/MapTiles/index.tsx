import React from 'react';
import { MdClose } from 'react-icons/md';
import { firebaseLogEventRequest } from '@Utils/firebase';

import {
  LayerPanel,
  TopPanel,
  LayerItem,
  Title,
  Item,
  Image,
  Name,
} from './styles';

const MAP_TILES = [
  { name: 'street', style: 'streets-v11', image: '/images/whitemap.png' },
  { name: 'out_door', style: 'outdoors-v11', image: '/images/Terrain.png' },
  { name: 'light', style: 'light-v10', image: '/images/Satellite.png' },
  { name: 'dark_map', style: 'dark-v10', image: '/images/DarkMap.png' },
  { name: 'traffic', style: 'satellite-v9', image: '/images/Traffic.png' },
  {
    name: 'hybird',
    style: 'satellite-streets-v11',
    image: '/images/Hybrid.png',
  },
];

interface Props {
  t(key: string): string;
  onClose(): void;
  className: string;
  mapTile: string;
  changeMapTile(tile: string): void;
}

function MapTiles(props: Props) {
  const { className, onClose, t, mapTile, changeMapTile } = props;

  const callLogEventMapType = (tile: string) => {
    switch (tile) {
      case 'satellite-streets-v11':
        firebaseLogEventRequest('layer_map_tool', 'hybrid_map_layer');
        break;
      case 'outdoors-v11':
        firebaseLogEventRequest('layer_map_tool', 'our_door_map_layer');
        break;
      case 'light-v10':
        firebaseLogEventRequest('layer_map_tool', 'light_map_layer');
        break;
      case 'dark-v10':
        firebaseLogEventRequest('layer_map_tool', 'dark_map_map_layer');
        break;
      case 'satellite-v9':
        firebaseLogEventRequest('layer_map_tool', 'traffic_map_layer');
        break;
      default:
        firebaseLogEventRequest('layer_map_tool', 'street_map_layer');
        break;
    }
  };
  const onChangeLayler = (tile: string) => () => {
    changeMapTile(tile);
    window.mapEvents?.changeLayer(tile);
    callLogEventMapType(tile);
  };

  return (
    <LayerPanel className={className}>
      <TopPanel>
        <Title>{t('common:map_type')}</Title>
        <MdClose onClick={onClose} style={{ fontSize: '20px' }} />
      </TopPanel>
      <LayerItem>
        {MAP_TILES.map((layer, index) => (
          <Item key={index} onClick={onChangeLayler(layer.style)}>
            <Image src={layer.image} active={layer.style === mapTile} />
            <Name>{t('common:' + layer.name)}</Name>
          </Item>
        ))}
      </LayerItem>
    </LayerPanel>
  );
}

export default MapTiles;
