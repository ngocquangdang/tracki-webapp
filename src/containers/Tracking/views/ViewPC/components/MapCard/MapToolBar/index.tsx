import React, { useState } from 'react';
import { MdMyLocation, MdLayers } from 'react-icons/md';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { MdFullscreen } from 'react-icons/md';
import clsx from 'clsx';

import MapTiles from '@Components/Maps/components/MapTiles';
import { ToolBar, ZoomButton, useStyles, IconButtonStyle } from './styles';

interface Props {
  mapTile: string;
  isMobile?: boolean;
  t(key: string): string;
  changeMapTile(tile: string): void;
  myLocationClick(): void;
  changeZoom(v: number): void;
  [data: string]: any;
}

function MapToolBars(props: Props) {
  const {
    mapTile,
    isMobile,
    t,
    changeMapTile,
    myLocationClick,
    changeZoom,
  } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const onZoomClick = (zoom: number) => () => changeZoom(zoom);
  const onShowLayer = () => setShowLayerPanel(!showLayerPanel);
  const onCloseLayer = () => setShowLayerPanel(false);

  const onFullScreen = () => {
    console.log('___onFullScreen');
  };

  return (
    <ToolBar>
      {!isMobile ? (
        <ZoomButton>
          <Tooltip
            title={<span>{t('common:zoom_in')}</span>}
            placement="left"
            arrow
          >
            <IconButtonStyle
              className={clsx(classes.button, classes.borderRadiusTop)}
              onClick={onZoomClick(0.5)}
            >
              <Add />
            </IconButtonStyle>
          </Tooltip>
          <Tooltip
            title={<span>{t('common:zoom_out')}</span>}
            placement="left"
            arrow
          >
            <IconButtonStyle
              className={clsx(classes.button, classes.borderRadiusBottom)}
              onClick={onZoomClick(-0.5)}
            >
              <Remove />
            </IconButtonStyle>
          </Tooltip>
        </ZoomButton>
      ) : (
        <IconButtonStyle onClick={onFullScreen}>
          <MdFullscreen />
        </IconButtonStyle>
      )}
      <Tooltip
        title={<span>{t('common:my_location')}</span>}
        placement="left"
        arrow
      >
        <IconButtonStyle onClick={myLocationClick}>
          <MdMyLocation />
        </IconButtonStyle>
      </Tooltip>
      <ClickAwayListener onClickAway={onCloseLayer}>
        <div>
          <Tooltip
            title={<span>{t('common:layer')}</span>}
            placement="left"
            arrow
          >
            <IconButtonStyle onClick={onShowLayer}>
              <MdLayers />
            </IconButtonStyle>
          </Tooltip>
          <MapTiles
            t={t}
            mapTile={mapTile}
            changeMapTile={changeMapTile}
            onClose={onCloseLayer}
            className={showLayerPanel ? classes.display : ''}
          />
        </div>
      </ClickAwayListener>
    </ToolBar>
  );
}

export default MapToolBars;
