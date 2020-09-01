import React, { useState } from 'react';
import { MdMyLocation, MdLayers } from 'react-icons/md';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

import clsx from 'clsx';

import MapTiles from '@Components/Maps/components/MapTiles';
import { ToolBar, ZoomButton, useStyles, IconButtonStyle } from './styles';

interface Props {
  mapTile: string;
  t(key: string): string;
  changeMapTile(tile: string): void;
  myLocationClick(): void;
  changeZoom(v: number): void;
  [data: string]: any;
  isInitiatedMap: boolean;
}

export default function MapToolBars(props: Props) {
  const {
    mapTile,
    t,
    changeMapTile,
    myLocationClick,
    changeZoom,
    isInitiatedMap,
  } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const onZoomClick = (zoom: number) => () => {
    isInitiatedMap ? changeZoom(zoom) : window.mapEvents.onZoom(zoom);
  };
  const getCurrentPosition = () => {
    isInitiatedMap ? myLocationClick() : window.mapEvents.getUseLocation();
  };

  const onShowLayer = () => setShowLayerPanel(!showLayerPanel);
  const onCloseLayer = () => setShowLayerPanel(false);

  return (
    <ToolBar>
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
      <Tooltip
        title={<span>{t('common:my_location')}</span>}
        placement="left"
        arrow
      >
        <IconButtonStyle onClick={getCurrentPosition}>
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
