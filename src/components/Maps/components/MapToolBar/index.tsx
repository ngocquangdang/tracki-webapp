import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineReload } from 'react-icons/ai';
import { MdMyLocation, MdLayers, MdBorderStyle } from 'react-icons/md';
import { FaStreetView } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import {
  ToolBar,
  IconButton,
  ZoomButton,
  ZoomOut,
  ZoomIn,
  Text,
  LayerPanel,
  TopPanel,
  LayerItem,
  Title,
  Item,
  Image,
  Name,
  useStyles,
} from './styles';
import { Tooltip } from '@material-ui/core';

interface Props {
  t: Function;
}

export default function MapToolBars(props: Props) {
  const { t } = props;
  const classes = useStyles();
  const [layer] = useState([
    { name: 'street', style: 'streets-v11', image: 'images/whitemap.png' },
    { name: 'out_door', style: 'outdoors-v11', image: 'images/Terrain.png' },
    { name: 'light', style: 'light-v10', image: 'images/Satellite.png' },
    { name: 'dark_map', style: 'dark-v10', image: 'images/DarkMap.png' },
    { name: 'traffic', style: 'satellite-v9', image: 'images/Traffic.png' },
    {
      name: 'hybird',
      style: 'satellite-streets-v11',
      image: 'images/Hybrid.png',
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowName, setIsShowName] = useState(false);

  const onZoomClick = (zoom: number) => () => window.mapEvents.onZoom(zoom);
  const getCurrentLocation = () => {
    window.mapEvents.getUseLocation();
  };

  const onChangeLayler = layer => window.mapEvents.changeLayer(layer);
  const onReset = () => window.mapEvents.reset();

  const onShowLayer = () => setIsOpen(!isOpen);
  const onShowName = () => setIsShowName(!isShowName);
  return (
    <ToolBar>
      <ZoomButton>
        <Tooltip title={t('auth:zoom_out')} placement="left" arrow>
          <ZoomOut className={`${classes.button} ${classes.borderRadiusTop}`}>
            <AiOutlinePlus onClick={onZoomClick(0.5)} />
          </ZoomOut>
        </Tooltip>
        <Tooltip title={t('auth:zoom_in')} placement="left" arrow>
          <ZoomIn className={`${classes.button} ${classes.borderRadiusBottom}`}>
            <AiOutlineMinus onClick={onZoomClick(-0.5)} />
          </ZoomIn>
        </Tooltip>
      </ZoomButton>
      <Tooltip title={t('auth:my_location')} placement="left" arrow>
        <IconButton onClick={getCurrentLocation}>
          <MdMyLocation />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('auth:layer')} placement="left" arrow>
        <IconButton onClick={onShowLayer}>
          <MdLayers />
          <LayerPanel className={isOpen ? classes.display : ''}>
            <TopPanel>
              <Title>{t('auth:map_type')}</Title>
              <MdClose onClick={() => onShowLayer} />
            </TopPanel>
            <LayerItem>
              {layer?.map((layer, index) => (
                <Item key={index} onClick={() => onChangeLayler(layer.style)}>
                  <Image src={layer.image}></Image>
                  <Name>{t(`auth:${layer.name}`)}</Name>
                </Item>
              ))}
            </LayerItem>
          </LayerPanel>
        </IconButton>
      </Tooltip>
      <Tooltip title={t('auth:show_name_device')} placement="left" arrow>
        <IconButton onClick={onShowName}>
          <Text>A</Text>
        </IconButton>
      </Tooltip>
      <Tooltip title={t('auth:show_geo_fence')} placement="left" arrow>
        <IconButton>
          <MdBorderStyle />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('auth:street_view')} placement="left" arrow>
        <IconButton>
          <FaStreetView />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('auth:reset')} placement="left" arrow>
        <IconButton onClick={onReset}>
          <AiOutlineReload />
        </IconButton>
      </Tooltip>
    </ToolBar>
  );
}
