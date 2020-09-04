import React from 'react';
import L from 'leaflet';
import { isEmpty } from 'lodash';

import { MAPBOX_API_KEY } from '@Definitions/app';
import IMap from '../interface';
import MapEvents from '../MapEvent';
import TrackerMarker from './components/TrackerMarker';
import UserLocation from './components/UserLocation';
import DrawTool from './components/DrawTool';
import Geofences from './components/Geofences';
import HeatMap from './components/HeatMap';
import TrackerHistoryPath from './components/TrackerHistoryPath';
import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';

const TILE_TOKEN =
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
  MAPBOX_API_KEY;
const TILE_OPTIONS = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 21,
  minZoom: 0,
  id: 'mapbox/streets-v11',
  accessToken: MAPBOX_API_KEY,
};

class LeafletMap extends React.Component<IMap.IProps, IMap.IState> {
  map: any;
  tileLayer: any;
  isFirstFitBounce: boolean;

  constructor(props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
      mapCenter: [40.866667, 34.566667],
      mapZoom: 13,
      userLocation: null,
    };
    this.isFirstFitBounce = false;
    window.trackerMarkers = window.trackerMarkers || {};
  }

  changeTileLayer = (layerId: string) => {
    if (this.tileLayer) {
      this.map.removeLayer(this.tileLayer);
    }
    this.tileLayer = L.tileLayer(TILE_TOKEN, {
      ...TILE_OPTIONS,
      id: 'mapbox/' + layerId,
    }).addTo(this.map);
  };

  removeMarker = markerId => {
    if (window.trackerMarkers[markerId]) {
      this.map.removeLayer(window.trackerMarkers[markerId]);
      delete window.trackerMarkers[markerId];
    }
  };

  componentDidMount() {
    const { mapCenter, mapZoom } = this.state;
    this.map = L.map('map').setView(mapCenter, mapZoom);
    window.mapType = 'leaflet';
    window.mapEvents = new MapEvents('leaflet', this.map);
    this.tileLayer = L.tileLayer(TILE_TOKEN, TILE_OPTIONS).addTo(this.map);

    this.map.on('locationfound', (e: L.LocationEvent) => {
      window.mapEvents.setCenterFlyTo(e.latlng, { zoom: 15 });
      this.setState({ userLocation: e.latlng });
    });
    this.map.on('click', e => {
      console.log('___MAP CLICKED', e);
    });

    // this.map.addControl(geolocate);
    window.mapEvents.getUseLocation = () => {
      this.map.locate({ enableHighAccuracy: true });
    };

    window.mapEvents.changeLayer = this.changeTileLayer;
    window.mapEvents.removeMarker = this.removeMarker;

    window.mapEvents.reset = () => {
      // this.changeTileLayer('streets-v11');
      this.fitBoundTrackers(true);
    };

    this.setState({ isInitiatedMap: true }, this.props.initMapCallback);
  }

  componentWillUnmount() {
    const { trackers } = this.props;
    Object.keys(trackers).map(id => this.removeMarker(id));
  }

  componentWillReceiveProps(nextProps) {
    const { trackerHistories } = nextProps;
    const { trackerHistories: currentTrackerHistories } = this.props;
    if (
      trackerHistories &&
      Object.keys(trackerHistories).length > 0 &&
      trackerHistories !== currentTrackerHistories
    ) {
      const trackerHistoryIds = Object.keys(trackerHistories);
      const latlngs = trackerHistoryIds.reduce(
        (result, item) => [
          ...result,
          [trackerHistories[item]?.lat, trackerHistories[item]?.lng],
        ],
        [] as any
      );
      window.mapEvents.setFitBounds(
        latlngs,
        window.mapFullWidth ? {} : LEAFLET_PADDING_OPTIONS
      );
    }
  }

  onClickTracker = (id: string | number) => {
    const { onClickMarker, openSideBar } = this.props;
    openSideBar && openSideBar();
    onClickMarker && onClickMarker(id);
  };

  fitBoundTrackers = (isReset: boolean) => {
    const { trackers, fullWidth } = this.props;
    if (
      (isReset || !this.isFirstFitBounce) &&
      Object.values(trackers).length > 0
    ) {
      this.isFirstFitBounce = true;
      const coords = Object.values(trackers).filter(
        ({ lat, lng }) => !!lat && !!lng
      );
      if (coords.length > 0) {
        window.mapEvents.setFitBounds(
          coords,
          fullWidth || window.mapFullWidth ? {} : LEAFLET_PADDING_OPTIONS
        );
      }
    }
  };

  renderMarkers = () => {
    const {
      trackers,
      isBeep,
      isMobile,
      isAlertSos,
      alertSosTrackerId,
      selectedTrackerId,
      isTracking,
      isDashboard,
      trackingIds,
      showTrackerName,
    } = this.props;

    if (this.state.isInitiatedMap && trackers) {
      // tracking view => show only tracker tracking
      if (isTracking || isDashboard) {
        const trackerIds = Object.keys(trackers);
        const [selectedTrackingId] = isEmpty(trackingIds)
          ? trackerIds
          : trackingIds;
        const tracker = trackers[selectedTrackingId];

        if (tracker) {
          return (
            <TrackerMarker
              map={this.map}
              isMobile={isMobile}
              tracker={tracker}
              onClickMarker={this.onClickTracker}
              isBeep={isBeep}
              isTracking={true}
              showTrackerName={showTrackerName}
              selectedTrackerId={selectedTrackingId}
              alertSosTrackerId={alertSosTrackerId}
              isAlertSos={isAlertSos}
            />
          );
        }
        return;
      }

      // normal view => show all tracker
      this.fitBoundTrackers(false);
      return Object.values(trackers).map(tracker => (
        <TrackerMarker
          key={tracker.device_id}
          map={this.map}
          tracker={tracker}
          onClickMarker={this.onClickTracker}
          isBeep={isBeep}
          showTrackerName={showTrackerName}
          selectedTrackerId={selectedTrackerId}
          alertSosTrackerId={alertSosTrackerId}
          isAlertSos={isAlertSos}
        />
      ));
    }
    return null;
  };

  render() {
    const { userLocation, isInitiatedMap } = this.state;
    const {
      mapAction,
      t,
      geofences,
      newGeofence,
      editGeofenceId,
      showGeofences,
      isMobile,
      trackers,
      pointTrackingIndex,
      changePointTracking,
      changeMapAction,
      updateNewGeofence,
      updateGeofence,
      trackerHistories,
      viewMode,
      mapView,
      histories,
      selectedTrackerId,
    } = this.props;

    return (
      <React.Fragment>
        {this.renderMarkers()}
        {userLocation && (
          <UserLocation map={this.map} location={userLocation} />
        )}
        {isInitiatedMap && !isMobile && (
          <DrawTool
            map={this.map}
            mapAction={mapAction}
            changeMapAction={changeMapAction}
            newGeofence={newGeofence}
            editGeofence={geofences[editGeofenceId]}
            updateNewGeofence={updateNewGeofence}
            updateGeofence={updateGeofence}
            t={t}
          />
        )}
        {isInitiatedMap && (
          <Geofences
            map={this.map}
            newGeofence={newGeofence}
            geofences={geofences}
            showGeofences={showGeofences}
            editGeofenceId={editGeofenceId}
            updateNewGeofence={updateNewGeofence}
            updateGeofence={updateGeofence}
          />
        )}
        {isInitiatedMap && viewMode === 'heat_map' && (
          <HeatMap map={this.map} histories={trackerHistories || {}} />
        )}
        {isInitiatedMap &&
          mapView === 'tracker_history' &&
          selectedTrackerId && (
            <TrackerHistoryPath
              map={this.map}
              isMobile={isMobile}
              tracker={trackers[selectedTrackerId]}
              pointTrackingIndex={pointTrackingIndex}
              changePointTracking={changePointTracking}
              history={histories[selectedTrackerId] || {}}
            />
          )}
      </React.Fragment>
    );
  }
}

export default LeafletMap;
