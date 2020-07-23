import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

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
}

function MapTiles(props: Props) {
  const { className, onClose, t } = props;
  const [currentTile, updateTile] = useState(MAP_TILES[0].style);

  const onChangeLayler = layer => () => {
    updateTile(layer);
    window.mapEvents.changeLayer(layer);
  };

  return (
    <LayerPanel className={className}>
      <TopPanel>
        <Title>{t('common:map_type')}</Title>
        <MdClose onClick={onClose} />
      </TopPanel>
      <LayerItem>
        {MAP_TILES.map((layer, index) => (
          <Item key={index} onClick={onChangeLayler(layer.style)}>
            <Image src={layer.image} active={layer.style === currentTile} />
            <Name>{t('common:' + layer.name)}</Name>
          </Item>
        ))}
      </LayerItem>
    </LayerPanel>
  );
}

export default MapTiles;
