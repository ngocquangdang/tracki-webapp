import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MdMyLocation, MdLayers, MdBorderStyle } from 'react-icons/md';
import { FaStreetView } from 'react-icons/fa';
import { Tooltip } from '@material-ui/core';
import { Add, Remove, Refresh } from '@material-ui/icons';
import clsx from 'clsx';

import {
  makeSelectMapTile,
  makeSelectShowGeofences,
  makeSelectShowTrackersName,
} from '@Containers/App/store/selectors';
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
import { firebaseLogEventRequest } from '@Utils/firebase';

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

function MapToolBars(props: Props) {
  const {
    mapTile,
    showGeofences,
    showTrackerName,
    t,
    toggleGeofences,
    toggleTrackerName,
    resetMap,
    changeMapTile,
  } = props;
  const classes = useStyles();
  const [showLayerPanel, setShowLayerPanel] = useState(false);

  const onZoomClick = (zoom: number, zoom_type: string) => () => {
    window.mapEvents.onZoom(zoom);
    firebaseLogEventRequest('main_page', `${zoom_type}_map_tool`);
  };
  const getCurrentLocation = () => {
    window.mapEvents.getUseLocation();
    firebaseLogEventRequest('main_page', 'get_current_location_map_tool');
  };
  const onShowLayer = () => {
    setShowLayerPanel(!showLayerPanel);
    firebaseLogEventRequest('main_page', 'show_layer_map_tool');
  };
  const onCloseLayer = () => {
    setShowLayerPanel(false);
    firebaseLogEventRequest('main_page', 'close_layer_map_tool');
  };
  const onReset = () => {
    resetMap();
    window.mapEvents.reset();
    firebaseLogEventRequest('main_page', 'reset_map_map_tool');
  };

  const onToggleTrackerName = () => {
    firebaseLogEventRequest(
      'main_page',
      !showTrackerName
        ? 'show_tracker_name_map_tool'
        : 'hidden_tracker_name_map_tool'
    );
    toggleTrackerName();
  };
  const onToggleGeofence = () => {
    firebaseLogEventRequest(
      'main_page',
      !showGeofences ? 'show_geofences_map_tool' : 'hidden_geofence_map_tool'
    );
    toggleGeofences();
  };

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
            onClick={onZoomClick(0.5, 'zoom_in')}
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
            onClick={onZoomClick(-0.5, 'zoom_out')}
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
      {/* <ClickAwayListener onClickAway={onCloseLayer}> */}
      <div>
        <Tooltip
          title={<span>{t('common:layer')}</span>}
          placement="left"
          arrow
        >
          <IconButtonStyle
            onClick={showLayerPanel ? onCloseLayer : onShowLayer}
          >
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
      {/* </ClickAwayListener> */}
      <Tooltip
        title={
          <span>
            {showTrackerName
              ? t('common:hide_tracker_name')
              : t('common:show_tracker_name')}
          </span>
        }
        placement="left"
        arrow
      >
        <IconButtonStyle
          onClick={onToggleTrackerName}
          className={clsx({ [classes.active]: showTrackerName })}
        >
          <Text>A</Text>
        </IconButtonStyle>
      </Tooltip>
      <Tooltip
        title={
          <span>
            {showGeofences
              ? t('common:hide_geofences')
              : t('common:show_geofences')}
          </span>
        }
        placement="left"
        arrow
      >
        <IconButtonStyle
          onClick={onToggleGeofence}
          className={clsx({ [classes.active]: showGeofences })}
        >
          <MdBorderStyle />
        </IconButtonStyle>
      </Tooltip>
      <Tooltip
        title={<span>{t('common:google_street_view')}</span>}
        placement="left"
        arrow
      >
        <IconButtonStyle>
          <FaStreetView />
        </IconButtonStyle>
      </Tooltip>
      <Tooltip title={<span>{t('common:reset')}</span>} placement="left" arrow>
        <IconButtonStyle onClick={onReset}>
          <Refresh />
        </IconButtonStyle>
      </Tooltip>
    </ToolBar>
  );
}

const mapStateToProps = createStructuredSelector({
  mapTile: makeSelectMapTile(),
  showGeofences: makeSelectShowGeofences(),
  showTrackerName: makeSelectShowTrackersName(),
});

const mapDispatchToProps = dispatch => ({
  changeMapTile: (tile: string) => dispatch(changeMapTileAction(tile)),
  resetMap: () => dispatch(resetMapAction()),
  toggleGeofences: () => dispatch(toggleGeofenceAction()),
  toggleTrackerName: () => dispatch(toggleTrackerNameAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(MapToolBars);
