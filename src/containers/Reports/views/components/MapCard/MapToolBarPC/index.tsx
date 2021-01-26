import React, { useState } from 'react';
import { MdMyLocation, MdLayers } from 'react-icons/md';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { connect } from 'react-redux';

import clsx from 'clsx';
import { createStructuredSelector } from 'reselect';

import MapTiles from '@Components/Maps/components/MapTiles';
import { ToolBar, ZoomButton, useStyles, IconButtonStyle } from './styles';

import { changeMapTileAction } from '@Containers/App/store/actions';
import { makeSelectMapTile } from '@Containers/App/store/selectors';
import { AiOutlineExpandAlt } from 'react-icons/ai';

interface Props {
  mapTile: string;
  t(key: string): string;
  changeMapTile(tile: string): void;
  myLocationClick(): void;
  changeZoom(v: number): void;
  [data: string]: any;
  isInitiatedMap: boolean;
  changeMapTilePC(title: string): void;
  mapTilePC: string;
  isTop?: boolean;
}

function MapToolBars(props: Props) {
  const {
    mapTile,
    t,
    changeMapTile,
    myLocationClick,
    changeZoom,
    isInitiatedMap,
    changeMapTilePC,
    mapTilePC,
    isTop,
  } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const onZoomClick = (zoom: number) => () => {
    isInitiatedMap ? changeZoom(zoom) : window.mapEvents.onZoom(zoom);
  };
  const getCurrentPosition = () => {
    isInitiatedMap ? myLocationClick() : window.mapEvents.getUseLocation();
  };
  const handleChangeMapTile = (tile: string) => {
    isInitiatedMap ? changeMapTile(tile) : changeMapTilePC(tile);
  };
  const onShowLayer = () => setShowLayerPanel(!showLayerPanel);
  const onCloseLayer = () => setShowLayerPanel(false);

  const onFullScreen = () => {
    console.log('___onFullScreen');
  };

  return (
    <ToolBar isTop={isTop}>
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
      <IconButtonStyle onClick={onFullScreen}>
        <AiOutlineExpandAlt
          className={`${classes.iconScale} ${classes.tranform}`}
        />
      </IconButtonStyle>
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
            mapTile={isInitiatedMap ? mapTile : mapTilePC}
            changeMapTile={handleChangeMapTile}
            onClose={onCloseLayer}
            className={showLayerPanel ? classes.display : ''}
          />
        </div>
      </ClickAwayListener>
    </ToolBar>
  );
}

const mapStateToProps = createStructuredSelector({
  mapTilePC: makeSelectMapTile(),
});

const mapDispatchToProps = dispatch => ({
  changeMapTilePC: (tile: string) => dispatch(changeMapTileAction(tile)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(MapToolBars);
