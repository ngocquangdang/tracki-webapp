import React from 'react';
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { uniqueId } from 'lodash';

import { MAPBOX_API_KEY } from '@Definitions/app';
import UserLocation from '@Components/Maps/Leaflet/components/UserLocation';
import SelectTracker from '../MultiView/SelectTracker';
import style from './styles';
import MapToolBar from '../MapToolBar';

interface IProps {
  mapId: string;
  isFullWidth: boolean;
  isMultiScreen: boolean;
  isMultiView: boolean;
  trackers: object;
  settings: object;
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
  route: any;
  steps = 60;
  counter = 1;
  currentLat = 0;
  currentLng = 0;
  pointsTemp = {};
  DELTA_LAT = 0;
  DELTA_LNG = 0;

  constructor(props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
      mapCenter: [40.866667, 34.566667],
      mapZoom: 17,
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

  moveMarker = tracker => () => {
    const history = tracker.histories || [];
    const startPoint = history[history.length - 1];

    if (this.counter <= this.steps && startPoint) {
      this.counter += 1;
      this.currentLat = (this.currentLat || startPoint.lat) + this.DELTA_LAT;
      this.currentLng = (this.currentLng || startPoint.lng) + this.DELTA_LNG;
      const latlng = {
        lat: +this.currentLat.toFixed(7),
        lng: +this.currentLng.toFixed(7),
      };

      if (this.marker) {
        this.marker.setLatLng(latlng);
        if (this.props.mapId !== 'mapPosition') {
          if (this.route) {
            const latlngs = this.route.getLatLngs();
            latlngs.push(latlng);
            this.route.setLatLngs(latlngs);
          } else {
            this.route = L.polyline([startPoint, latlng], {
              weight: 3,
              color: '#168449',
            });
            this.route.addTo(this.map);
          }
        }
        this.map.setView(latlng);
      }
      requestAnimationFrame(this.moveMarker(tracker));
    } else {
      this.counter = 1;
    }
  };

  componentWillReceiveProps(nextProps) {
    const {
      selectedTrackerId,
      isFullWidth,
      viewMode,
      isMultiScreen,
      trackers: nextTrackers,
      settings,
    } = nextProps;
    const {
      selectedTrackerId: thisSelectedTracker,
      isFullWidth: thisIsFull,
      trackers,
      viewMode: currentViewMode,
      mapId,
    } = this.props;
    const tracker = trackers[selectedTrackerId];

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
    if (selectedTrackerId !== thisSelectedTracker) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = undefined;
      }
      if (this.route) {
        this.map.removeLayer(this.route);
        this.route = null;
      }
      if (this.props.mapId !== 'mapPosition') {
        const pointIds = Object.keys(this.pointsTemp);
        pointIds.map(id => {
          this.map.removeLayer(this.pointsTemp[id]);
          delete this.pointsTemp[id];
          return null;
        });
      }
    }

    const nextTracker = nextTrackers[selectedTrackerId];
    if (
      (nextTracker.histories || []).length !== (tracker.histories || []).length
    ) {
      const lastPoint = nextTracker.histories[nextTracker.histories.length - 1];
      if (this.props.mapId !== 'mapPosition') {
        const icon = new L.DivIcon({ className: 'point-dot' });
        this.pointsTemp[uniqueId('point')] = L.marker(lastPoint, {
          icon,
        }).addTo(this.map);
      }
      const setting = settings[nextTracker.settings_id];
      const {
        preferences: {
          tracking_mode: { sample_rate, tracking_measurment },
        },
      } = setting;
      this.steps = tracking_measurment === 'seconds' ? sample_rate * 60 : 60;
      this.DELTA_LAT = (nextTracker.lat - lastPoint.lat) / this.steps;
      this.DELTA_LNG = (nextTracker.lng - lastPoint.lng) / this.steps;
      this.moveMarker(nextTracker)();
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

  trackerName = (name: string | number, status: string) => {
    const nameWidth = name.toString().length * 9;
    return `<div class=${
      status === 'active' ? 'title-device' : 'red-title-device'
    } style='width:${nameWidth}px; left:-${nameWidth / 2 - 4}px'>${name}</div>`;
  };

  componentDidMount() {
    const { mapId, tracker, isMultiScreen, isMobile, isMultiView } = this.props;
    const { mapCenter, mapZoom } = this.state;
    const mapTile = this.getMapTile(isMultiScreen, mapId);
    let center = mapCenter;

    const zoom = isMobile && isMultiView ? 8 : mapZoom;

    if (tracker && tracker.lat && tracker.lng) {
      center = [tracker.lat, tracker.lng];
      this.isFirstFitBounce = true;
    }

    this.map = L.map(mapId).setView(center, zoom);
    this.mapTile = L.tileLayer(TILE_TOKEN, {
      ...TILE_OPTIONS,
      id: 'mapbox/' + mapTile,
    }).addTo(this.map);

    this.map.on('locationfound', (e: L.LocationEvent) => {
      this.map.flyTo(e.latlng, 14);
      this.setState({ userLocation: e.latlng });
    });
    this.map.on('click', e => {
      console.log('___MAP CLICKED', e);
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

  getMarkerElement = tracker => {
    const { device_name, device_id, icon_url, status } = tracker;
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
        ${this.trackerName(device_name || device_id, status)}
      </div>`;
    return elm;
  };

  renderMarker = () => {
    const { trackers, selectedTrackerId } = this.props;
    const tracker = trackers[selectedTrackerId];

    if (!this.marker && tracker && tracker.lat && tracker.lng) {
      const { lat, lng } = tracker;
      const elm = this.getMarkerElement(tracker);
      const icon = new L.DivIcon({ html: elm });
      this.marker = L.marker([lat, lng], { icon });
      this.marker.addTo(this.map);
      this.map.panTo([lat, lng]);
    }
    return null;
  };

  onChangeOption = (value: string | number) => {
    const {
      selectedTrackerId,
      trackingIds,
      changeTrackersTracking,
    } = this.props;
    const selectedIndex = trackingIds.findIndex(
      id => id.toString() === selectedTrackerId.toString()
    );
    const newTrackings = [...trackingIds];
    newTrackings[selectedIndex] = +value;
    changeTrackersTracking(newTrackings);
  };

  render() {
    const {
      mapId,
      classes,
      mapLabel,
      isMultiScreen,
      trackers,
      selectedTrackerId,
      trackingIds,
      isMobile,
      t,
    } = this.props;

    const { userLocation, isInitiatedMap, mapStyle } = this.state;
    const options = Object.keys(trackers)
      .filter(
        id =>
          id.toString() === selectedTrackerId.toString() ||
          !(trackingIds || []).includes(+id)
      )
      .map(id => ({ value: id, label: trackers[id].device_name || id }));

    return (
      <React.Fragment>
        <div
          id={mapId}
          className={clsx(classes.mapCard, {
            [classes.mapCardMobile]: isMobile,
          })}
        />
        {isMultiScreen ? (
          <div
            className={clsx(classes.selects, {
              [classes.selectMobile]: isMobile,
            })}
            style={{ position: 'absolute' }}
          >
            <SelectTracker
              id={mapId}
              value={selectedTrackerId.toString()}
              options={options}
              onChange={this.onChangeOption}
            />
          </div>
        ) : (
          <div
            className={clsx(classes.mapLabel, {
              [classes.labelMobile]: isMobile,
            })}
            style={{ position: 'absolute' }}
          >
            {mapLabel}
          </div>
        )}
        {userLocation && (
          <UserLocation map={this.map} location={userLocation} />
        )}
        {isInitiatedMap && this.renderMarker()}
        {isInitiatedMap && (
          <MapToolBar
            t={t}
            isMobile={isMobile}
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
