import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MdMyLocation, MdLayers, MdBorderStyle } from 'react-icons/md';
import { FaStreetView } from 'react-icons/fa';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import { Add, Remove, Refresh } from '@material-ui/icons';

import { makeSelectMapTile } from '@Containers/App/store/selectors';
import {
  resetMapAction,
  changeMapTileAction,
  toggleGeofenceAction,
  toggleTrackerNameAction,
} from '@Containers/App/store/actions';
import MapTiles from '../MapTiles';

import {
  ToolBar,
  ZoomButton,
  Text,
  useStyles,
  IconButtonStyle,
} from './styles';

interface Props {
  mapTile: string;
  t(key: string): string;
  changeMapTile(tile: string): void;
  resetMap(): void;
  toggleGeofencs(): void;
  toggleTrackerName(): void;
  [data: string]: any;
}

function MapToolBars(props: Props) {
  const { t, toggleTrackerName, resetMap, mapTile, changeMapTile } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const onZoomClick = (zoom: number) => () => window.mapEvents.onZoom(zoom);
  const getCurrentLocation = () => window.mapEvents.getUseLocation();
  const onShowLayer = () => setShowLayerPanel(!showLayerPanel);
  const onCloseLayer = () => setShowLayerPanel(false);
  const onReset = () => {
    resetMap();
    window.mapEvents.reset();
  };

  return (
    <ToolBar>
      <ZoomButton>
        <Tooltip title={<span>Zoom in</span>} placement="left" arrow>
          <IconButtonStyle
            className={`${classes.button} ${classes.borderRadiusTop}`}
            onClick={onZoomClick(0.5)}
          >
            <Add />
          </IconButtonStyle>
        </Tooltip>
        <Tooltip title={<span>{'Zoom Out'}</span>} placement="left" arrow>
          <IconButtonStyle
            className={`${classes.button} ${classes.borderRadiusBottom}`}
            onClick={onZoomClick(-0.5)}
          >
            <Remove />
          </IconButtonStyle>
        </Tooltip>
      </ZoomButton>
      <Tooltip title={<span>{'My location'}</span>} placement="left" arrow>
        <IconButtonStyle onClick={getCurrentLocation}>
          <MdMyLocation />
        </IconButtonStyle>
      </Tooltip>
      <ClickAwayListener onClickAway={onCloseLayer}>
        <div>
          <Tooltip title={<span>Layer</span>} placement="left" arrow>
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
      <Tooltip title={<span>Show name devices</span>} placement="left" arrow>
        <IconButtonStyle onClick={toggleTrackerName}>
          <Text>A</Text>
        </IconButtonStyle>
      </Tooltip>
      <Tooltip title={<span>{'Show Geo-fence'}</span>} placement="left" arrow>
        <IconButtonStyle>
          <MdBorderStyle />
        </IconButtonStyle>
      </Tooltip>
      <Tooltip
        title={<span>{'Google Street view'}</span>}
        placement="left"
        arrow
      >
        <IconButtonStyle>
          <FaStreetView />
        </IconButtonStyle>
      </Tooltip>
      <Tooltip title={<span>{'Reset'}</span>} placement="left" arrow>
        <IconButtonStyle onClick={onReset}>
          <Refresh />
        </IconButtonStyle>
      </Tooltip>
    </ToolBar>
  );
}

const mapStateToProps = createStructuredSelector({
  mapTile: makeSelectMapTile(),
});

const mapDispatchToProps = dispatch => ({
  changeMapTile: (tile: string) => dispatch(changeMapTileAction(tile)),
  resetMap: () => dispatch(resetMapAction()),
  toggleGeofences: () => dispatch(toggleGeofenceAction()),
  toggleTrackerName: () => dispatch(toggleTrackerNameAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(MapToolBars);
