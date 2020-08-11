import React from 'react';
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';

import { MAPBOX_API_KEY } from '@Definitions/app';
import UserLocation from '@Components/Maps/Leaflet/components/UserLocation';
import { ITracker } from '@Interfaces';
import style from './styles';
import MapToolBar from './MapToolBar';

interface IProps {
  mapId: string;
  isFullWidth: boolean;
  tracker: ITracker;
  classes: any;
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
      mapZoom: 13,
      userLocation: null,
      mapStyle: 'streets-v11',
    };
    this.isFirstFitBounce = false;
  }

  getMapTile = (mapId: string) => {
    if (mapId === 'mapSatelliteView') return 'satellite-v9';
    return 'streets-v11';
  };

  componentWillReceiveProps(nextProps) {
    const { tracker, isFullWidth } = nextProps;
    const { tracker: thisTracker, isFullWidth: thisIsFull } = this.props;

    // fitbound map
    if (
      this.map &&
      tracker &&
      tracker.lat &&
      tracker.lng &&
      !this.isFirstFitBounce
    ) {
      this.map.panTo([tracker.lat, tracker.lng]);
      this.isFirstFitBounce = true;
    }

    // resize map
    if (isFullWidth !== thisIsFull) {
      this.map.fire('resize');
    }

    // remove current marker
    if (tracker.device_id !== thisTracker.device_id) {
      this.map.removeLayer(this.marker);
      this.marker = undefined;
    }
  }

  trackerName = (name: string) => {
    const nameWidth = name.length * 9;
    return `<div class='title-device' style='width:${nameWidth}px; left:-${
      nameWidth / 2 - 4
    }px'>${name}</div>`;
  };

  componentDidMount() {
    const { mapId, tracker } = this.props;
    const { mapCenter, mapZoom } = this.state;
    const mapTile = this.getMapTile(mapId);
    let center = mapCenter;

    if (tracker && tracker.lat && tracker.lng) {
      center = [tracker.lat, tracker.lng];
      this.isFirstFitBounce = true;
    }

    this.map = L.map(mapId).setView(center, mapZoom);
    this.mapTile = L.tileLayer(TILE_TOKEN, {
      ...TILE_OPTIONS,
      id: 'mapbox/' + mapTile,
    });
    this.mapTile.addTo(this.map);

    this.map.on('locationfound', (e: L.LocationEvent) => {
      this.map.panTo(e.latlng, { zoom: 15 });
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

  onClickTracker = (id: string | number) => {
    console.log(id);
  };

  renderMarker = () => {
    const { tracker } = this.props;

    if (!this.marker && tracker && tracker.lat && tracker.lng) {
      const { device_name, lat, lng, icon_url } = tracker;
      const elm = document.createElement('div');
      elm.className = `custom-div-icon`;
      elm.innerHTML = `
        <div class='icon-red'>
          <span class='inner'></span>
          <div class='marker-pin'>
            <img src=${
              icon_url || '/images/image-device.png'
            } class='image-device'></img>
          </div>
        <div>${this.trackerName(device_name)}`;

      const icon = new L.DivIcon({ html: elm });
      this.marker = L.marker([lat, lng], { icon });
      this.marker.addTo(this.map);
      this.map.panTo([lat, lng]);
    }
    return null;
  };

  render() {
    const { mapId, classes, mapLabel, t } = this.props;
    const { userLocation, isInitiatedMap, mapStyle } = this.state;

    return (
      <React.Fragment>
        <div id={mapId} className={classes.mapCard} />
        <div className={classes.mapLabel} style={{ position: 'absolute' }}>
          {mapLabel}
        </div>
        {isInitiatedMap && this.renderMarker()}
        {userLocation && (
          <UserLocation map={this.map} location={userLocation} />
        )}
        {isInitiatedMap && mapId !== 'mapStreetView' && (
          <MapToolBar
            t={t}
            mapTile={mapStyle}
            changeMapTile={this.changeMapTile}
            myLocationClick={this.getUserLocation}
            changeZoom={this.changeZoom}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(style)(MapCard);
