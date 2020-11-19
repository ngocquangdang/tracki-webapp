import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MdLayers } from 'react-icons/md';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import clsx from 'clsx';

import { makeSelectMapTile } from '@Containers/App/store/selectors';
import { changeMapTileAction } from '@Containers/App/store/actions';
import MapTiles from '@Components/Maps/components/MapTiles';

import { ToolBar, ZoomButton, useStyles, IconButtonStyle } from './styles';

interface Props {
  mapTile: string;
  showGeofences: boolean;
  showTrackerName: boolean;
  t(key: string): string;
  changeMapTile(tile: string): void;
  [data: string]: any;
  isInitiatedMap: boolean;
  changeMapTileSP(title: string): void;
  mapTileSP: string;
}

function MapToolBarsSP(props: Props) {
  const {
    mapTile,
    t,
    changeMapTile,
    changeZoom,
    isInitiatedMap,
    changeMapTileSP,
    mapTileSP,
  } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const onZoomClick = (zoom: number) => () => {
    isInitiatedMap ? changeZoom(zoom) : window.mapEvents.onZoom(zoom);
  };
  const handleChangeMapTile = (tile: string) => {
    isInitiatedMap ? changeMapTile(tile) : changeMapTileSP(tile);
  };
  const onShowLayer = () => {
    setShowLayerPanel(!showLayerPanel);
  };
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
            mapTile={isInitiatedMap ? mapTile : mapTileSP}
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
  mapTileSP: makeSelectMapTile(),
});

const mapDispatchToProps = dispatch => ({
  changeMapTileSP: (tile: string) => dispatch(changeMapTileAction(tile)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(MapToolBarsSP);
