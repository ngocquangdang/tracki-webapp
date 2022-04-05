import React from 'react';
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { MAPBOX_API_KEY } from '@Definitions/app';
import UserLocation from '@Components/Maps/Leaflet/components/UserLocation';
import style from './styles';
import MapToolBarPC from './MapToolBarPC';

interface IProps {
  mapId: string;
  isFullWidth: boolean;
  isMultiScreen: boolean;
  isMultiView: boolean;
  trackers: object;
  isMobile?: boolean;
  selectedTrackerId: number;
  trackingIds: number[];
  classes: any;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

interface IState {
  isInitiatedMap: boolean;
  mapCenter: [number, number];
  mapZoom: number;
  userLocation: any;
  mapStyle: string;
}

const TILE_TOKEN =
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
  MAPBOX_API_KEY;
const TILE_OPTIONS = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: MAPBOX_API_KEY,
};

class MapCard extends React.Component<IProps, IState> {
  map: any;
  marker: any;
  mapTile: any;
  isFirstFitBounce: boolean;

  constructor(props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
      mapCenter: [40.866667, 34.566667],
      mapZoom: 15,
      userLocation: null,
      mapStyle: 'streets-v11',
    };
    this.isFirstFitBounce = false;
  }

  getMapTile = (isMultiScreen: boolean, mapId: string) => {
    if (isMultiScreen) return 'streets-v11';
    if (mapId === 'mapSatelliteView') return 'satellite-v9';
    return 'streets-v11';
  };

  componentWillReceiveProps(nextProps) {
    const { isFullWidth, viewMode, isMultiScreen } = nextProps;
    const {
      isFullWidth: thisIsFull,
      trackers,
      viewMode: currentViewMode,
      mapId,
    } = this.props;

    // fitbound map
    if (
      this.map &&
      trackers[0] &&
      trackers[0]?.geoLocation?.latitude &&
      trackers[0]?.geoLocation?.longitude &&
      !this.isFirstFitBounce
    ) {
      this.map.panTo([
        trackers[0]?.geoLocation?.latitude,
        trackers[0]?.geoLocation?.longitude,
      ]);
      this.isFirstFitBounce = true;
    }
    if (this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = undefined;
    }
    // resize map
    if (isFullWidth !== thisIsFull) {
      this.map.fire('resize');
    }

    // reset map tile
    if (viewMode !== currentViewMode) {
      this.map.removeLayer(this.mapTile);
      const mapTile = this.getMapTile(isMultiScreen, mapId);
      this.mapTile = L.tileLayer(TILE_TOKEN, {
        ...TILE_OPTIONS,
        id: 'mapbox/' + (isMultiScreen ? 'streets-v11' : mapTile),
      }).addTo(this.map);
    }
  }

  trackersName = (name: string) => {
    const nameWidth = name.length * 9;
    return `<div class='title-device' style='width:${nameWidth}px; left:-${
      nameWidth / 2 - 4
    }px'>${name}</div>`;
  };

  componentDidMount() {
    const { mapId, trackers, isMultiScreen, isMobile, isMultiView } =
      this.props;
    const { mapCenter, mapZoom } = this.state;
    const mapTile = this.getMapTile(isMultiScreen, mapId);
    let center = mapCenter;

    const zoom = isMobile && isMultiView ? 8 : mapZoom;

    if (
      trackers[0] &&
      trackers[0]?.geoLocation?.latitude &&
      trackers[0]?.geoLocation?.longitude
    ) {
      center = [
        trackers[0]?.geoLocation?.latitude,
        trackers[0]?.geoLocation?.longitude,
      ];
      this.isFirstFitBounce = true;
    }

    this.map = L.map(mapId).setView(center, zoom);
    this.mapTile = L.tileLayer(TILE_TOKEN, {
      ...TILE_OPTIONS,
      id: 'mapbox/' + mapTile,
    }).addTo(this.map);

    this.map.on('locationfound', (e: L.LocationEvent) => {
      this.map.panTo(e.latlng, { zoom });
      this.setState({ userLocation: e.latlng });
    });

    this.setState({ isInitiatedMap: true });
  }

  getUserLocation = () => {
    this.map.locate({ enableHighAccuracy: true });
  };

  changeMapTile = (tile: string) => {
    if (this.mapTile) {
      this.map.removeLayer(this.mapTile);
    }
    this.mapTile = L.tileLayer(TILE_TOKEN, {
      ...TILE_OPTIONS,
      id: 'mapbox/' + tile,
    }).addTo(this.map);
    this.setState({ mapStyle: tile });
  };

  changeZoom = (value: number) => {
    const currentZoom = this.map.getZoom();
    this.map.setZoom(currentZoom + value * 2);
  };

  renderMarker = () => {
    const { trackers } = this.props;

    if (
      !this.marker &&
      trackers[0] &&
      trackers[0]?.geoLocation?.latitude &&
      trackers[0]?.geoLocation?.longitude
    ) {
      const { deviceName, icon_url, geoLocation } = trackers[0];
      const { latitude, longitude } = geoLocation;

      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
      <div class='icon-red'>
        <span class='inner'></span>
        <div class='marker-pin' style='background-image:url("static/images/icon-marker.svg")'>
          ${
            icon_url
              ? `<div class='image-marker' style='background-image: url(${icon_url})'></div>`
              : `<img src='/static/images/image-device.png' class='image-device'></img>`
          }
        </div>
       ${this.trackersName(deviceName)}
      </div>`;

      const icon = new L.DivIcon({ html: elm });
      this.marker = L.marker([latitude, longitude], { icon });
      this.marker.addTo(this.map);
      this.map.panTo([latitude, longitude]);
    }
    return null;
  };

  render() {
    const { mapId, classes, isMobile, t } = this.props;

    const { userLocation, isInitiatedMap, mapStyle } = this.state;

    return (
      <React.Fragment>
        <div
          id={mapId}
          className={clsx(classes.mapCard, {
            [classes.mapCardMobile]: isMobile,
          })}
        />
        {userLocation && (
          <UserLocation map={this.map} location={userLocation} />
        )}
        {isInitiatedMap && this.renderMarker()}
        {isInitiatedMap && (
          <MapToolBarPC
            t={t}
            isMobile={isMobile}
            mapTile={mapStyle}
            changeMapTile={this.changeMapTile}
            myLocationClick={this.getUserLocation}
            changeZoom={this.changeZoom}
            isInitiatedMap={isInitiatedMap}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(style)(MapCard);
