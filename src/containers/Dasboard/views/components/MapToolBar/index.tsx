import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MdMyLocation, MdLayers } from 'react-icons/md';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import clsx from 'clsx';

import {
  makeSelectMapTile,
  makeSelectShowTrackersName,
} from '@Containers/App/store/selectors';
import {
  changeMapTileAction,
  toggleTrackerNameAction,
} from '@Containers/App/store/actions';
import MapTiles from '@Components/Maps/components/MapTiles';

import { ToolBar, ZoomButton, useStyles, IconButtonStyle } from './styles';

interface Props {
  mapTile: string;
  showGeofences: boolean;
  showTrackerName: boolean;
  t(key: string): string;
  changeMapTile(tile: string): void;
  resetMap(): void;
  toggleGeofences(): void;
  toggleTrackerName(): void;
  [data: string]: any;
}

function ToolBars(props: Props) {
  const { mapTile, t, changeMapTile } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const onZoomClick = (zoom: number) => () => window.mapEvents.onZoom(zoom);
  const getCurrentLocation = () => window.mapEvents.getUseLocation();
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
        <IconButtonStyle onClick={getCurrentLocation}>
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

const mapStateToProps = createStructuredSelector({
  mapTile: makeSelectMapTile(),
  showTrackerName: makeSelectShowTrackersName(),
});

const mapDispatchToProps = dispatch => ({
  changeMapTile: (tile: string) => dispatch(changeMapTileAction(tile)),
  toggleTrackerName: () => dispatch(toggleTrackerNameAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(ToolBars);
