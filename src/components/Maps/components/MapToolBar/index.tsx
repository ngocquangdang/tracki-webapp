import React, { useState } from 'react';
import { MdMyLocation, MdLayers, MdBorderStyle } from 'react-icons/md';
import { FaStreetView } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Tooltip } from '@material-ui/core';
import { Add, Remove, Refresh } from '@material-ui/icons';

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

interface Props {
  t: Function;
}

export default function MapToolBars(props: Props) {
  const { t } = props;
  const classes = useStyles();
  const [layer] = useState([
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
        <Tooltip title={<span>Zoom in</span>} placement="left" arrow>
          <ZoomOut
            className={`${classes.button} ${classes.borderRadiusTop}`}
            onClick={onZoomClick(0.5)}
          >
            <Add />
          </ZoomOut>
        </Tooltip>
        <Tooltip title={<span>{'Zoom Out'}</span>} placement="left" arrow>
          <ZoomIn
            className={`${classes.button} ${classes.borderRadiusBottom}`}
            onClick={onZoomClick(-0.5)}
          >
            <Remove />
          </ZoomIn>
        </Tooltip>
      </ZoomButton>
      <Tooltip title={<span>{'My location'}</span>} placement="left" arrow>
        <IconButton onClick={getCurrentLocation}>
          <MdMyLocation />
        </IconButton>
      </Tooltip>
      <Tooltip title={<span>Layer</span>} placement="left" arrow>
        <IconButton onClick={onShowLayer}>
          <MdLayers />
          <LayerPanel className={isOpen ? classes.display : ''}>
            <TopPanel>
              <Title>{'Map type'}</Title>
              <MdClose onClick={() => onShowLayer} />
            </TopPanel>
            <LayerItem>
              {layer?.map((layer, index) => (
                <Item key={index} onClick={() => onChangeLayler(layer.style)}>
                  <Image src={layer.image}></Image>
                  <Name>{t(`${layer.name}`)}</Name>
                </Item>
              ))}
            </LayerItem>
          </LayerPanel>
        </IconButton>
      </Tooltip>
      <Tooltip title={<span>Show name devices</span>} placement="left" arrow>
        <IconButton onClick={onShowName}>
          <Text>A</Text>
        </IconButton>
      </Tooltip>
      <Tooltip title={<span>{'Show Geo-fence'}</span>} placement="left" arrow>
        <IconButton>
          <MdBorderStyle />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={<span>{'Google Street view'}</span>}
        placement="left"
        arrow
      >
        <IconButton>
          <FaStreetView />
        </IconButton>
      </Tooltip>
      <Tooltip title={<span>{'Reset'}</span>} placement="left" arrow>
        <IconButton onClick={onReset}>
          <Refresh />
        </IconButton>
      </Tooltip>
    </ToolBar>
  );
}
