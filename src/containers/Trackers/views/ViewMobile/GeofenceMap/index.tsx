import React from 'react';
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { MAPBOX_API_KEY } from '@Definitions/app';
import UserLocation from '@Components/Maps/Leaflet/components/UserLocation';
import Geofences from '@Components/Maps/Leaflet/components/Geofences';
import DrawTool from '@Components/Maps/Leaflet/components/DrawTool';
import MapToolBar from './MapToolBar';
import { ITracker, IGeofence } from '@Interfaces';
import style from './styles';

interface IProps {
  mapId: string;
  newGeofence: IGeofence;
  geofences: object;
  editGeofenceId: number;
  mapAction: string;
  tracker: ITracker | any;
  classes: any;
  t(key: string, format?: object): string;
  changeMapAction(action: string): void;
  updateNewGeofence(data): void;
  updateGeofence(id: number, data: object): void;
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

  trackerName = (name: string, status: string) => {
    const nameWidth = name.length * 9;
    return `<div class=${
      status === 'active' ? 'title-device' : 'red-title-device'
    } style='width:${nameWidth}px; left:-${nameWidth / 2 - 4}px'>${name}</div>`;
  };

  componentDidMount() {
    const { mapId, tracker } = this.props;
    const { mapCenter, mapZoom } = this.state;
    let center = mapCenter;

    if (tracker && tracker.lat && tracker.lng) {
      center = [tracker.lat, tracker.lng];
      this.isFirstFitBounce = true;
    }

    this.map = L.map(mapId).setView(center, mapZoom);
    this.mapTile = L.tileLayer(TILE_TOKEN, TILE_OPTIONS).addTo(this.map);
    this.map.on('locationfound', this.foundLocation);
    window.geoMapMobile = this.map;
    this.setState({ isInitiatedMap: true });
  }

  componentWillUnmount() {
    window.geoMapMobile = undefined;
    window.geosMobile = {};
  }

  foundLocation = (e: L.LocationEvent) => {
    const { mapId } = this.props;
    const mapDiv = document.getElementById(mapId);
    const { width, height } = mapDiv
      ? mapDiv.getBoundingClientRect()
      : { width: 0, height: 0 };

    this.map.panInside(e.latlng, {
      zoom: this.state.mapZoom,
      paddingTopLeft: [width / 2, height / 3],
    });
    this.setState({ userLocation: e.latlng });
  };

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

  onClickTracker = (id: string | number) => {
    console.log(id);
  };

  renderMarker = () => {
    const { tracker } = this.props;

    if (!this.marker && tracker && tracker.lat && tracker.lng) {
      const { device_name, lat, lng, icon_url, status } = tracker;
      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
        <div class='icon-red'>
          <span class='inner'></span>
          <div class='marker-pin' style='background-image: url(${
            status === 'active'
              ? '/images/icon-marker.svg'
              : '/images/red-marker.svg'
          })'>
            ${
              icon_url
                ? `<div class='image-marker' style='background-image: url(${icon_url})'></div>`
                : `<img src='/images/image-device.png' class='image-device'></img>`
            }
          </div>
        <div>${this.trackerName(device_name, status)} </div>`;

      const icon = new L.DivIcon({ html: elm });
      this.marker = L.marker([lat, lng], { icon });
      this.marker.addTo(this.map);
      this.map.panTo([lat, lng]);
    }
    return null;
  };

  gotoLocation = latlng => {
    this.setState({ userLocation: latlng });
    this.map.panTo(latlng, { zoom: 13 });
  };

  render() {
    const {
      mapId,
      classes,
      t,
      mapAction,
      geofences,
      newGeofence,
      editGeofenceId,
      showGeofences,
      changeMapAction,
      updateNewGeofence,
      updateGeofence,
    } = this.props;
    const { userLocation, isInitiatedMap, mapStyle } = this.state;

    return (
      <React.Fragment>
        <div id={mapId} className={clsx(classes.mapCard)} />
        {userLocation && (
          <UserLocation map={this.map} location={userLocation} />
        )}
        {isInitiatedMap && (
          <React.Fragment>
            {this.renderMarker()}
            <MapToolBar
              t={t}
              mapTile={mapStyle}
              gotoLocation={this.gotoLocation}
              changeMapTile={this.changeMapTile}
              myLocationClick={this.getUserLocation}
            />
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
            <Geofences
              map={this.map}
              isGeofenceMobile={true}
              newGeofence={newGeofence}
              geofences={geofences}
              showGeofences={showGeofences}
              editGeofenceId={editGeofenceId}
              updateNewGeofence={updateNewGeofence}
              updateGeofence={updateGeofence}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(style)(MapCard);
