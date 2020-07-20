import React from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineReload } from 'react-icons/ai';
import { MdMyLocation, MdLayers, MdBorderStyle } from 'react-icons/md';
import { FaStreetView } from 'react-icons/fa';

import {
  ToolBar,
  IconButton,
  ZoomButton,
  ZoomOut,
  ZoomIn,
  Text,
  useStyles,
} from './styles';

export default function MapToolBars() {
  const classes = useStyles();
  const onZoomClick = (zoom: number) => () => window.mapEvents.onZoom(zoom);
  const getCurrentLocation = () => {
    window.mapEvents.getUseLocation();
  };

  return (
    <ToolBar>
      <ZoomButton>
        <ZoomOut className={`${classes.button} ${classes.borderRadiusTop}`}>
          <AiOutlinePlus onClick={onZoomClick(0.5)} />
        </ZoomOut>
        <ZoomIn className={`${classes.button} ${classes.borderRadiusBottom}`}>
          <AiOutlineMinus onClick={onZoomClick(-0.5)} />
        </ZoomIn>
      </ZoomButton>
      <IconButton onClick={getCurrentLocation}>
        <MdMyLocation />
      </IconButton>
      <IconButton>
        <MdLayers />
      </IconButton>
      <IconButton>
        <Text>A</Text>
      </IconButton>
      <IconButton>
        <MdBorderStyle />
      </IconButton>
      <IconButton>
        <FaStreetView />
      </IconButton>
      <IconButton>
        <AiOutlineReload />
      </IconButton>
    </ToolBar>
  );
}
