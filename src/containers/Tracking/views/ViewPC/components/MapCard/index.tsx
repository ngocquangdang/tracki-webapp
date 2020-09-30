import React from 'react';
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
import { bearing as turfBearing } from '@turf/turf';

import { MAPBOX_API_KEY } from '@Definitions/app';
import UserLocation from '@Components/Maps/Leaflet/components/UserLocation';
import SelectTracker from '../MultiView/SelectTracker';
import style from './styles';
import MapToolBar from '../MapToolBar';
import { ITracker } from '@Interfaces';

interface IProps {
  mapId: string;
  isFullWidth: boolean;
  isMultiScreen: boolean;
  isMultiView: boolean;
  trackers: object;
  settings: object;
  isMobile?: boolean;
  isTracking?: boolean;
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
    } = nextProps;
    const {
      selectedTrackerId: thisSelectedTracker,
      isFullWidth: thisIsFull,
      trackers,
      viewMode: currentViewMode,
      mapId,
      isMultiScreen: thisIsMultiScreen,
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

    const nextTracker = nextTrackers[selectedTrackerId];

    // remove current marker and redraw route if have
    if (selectedTrackerId !== thisSelectedTracker) {
      this.removeElements();
    }

    if (isMultiScreen !== thisIsMultiScreen && mapId === 'mapPosition') {
      if (isMultiScreen) {
        this.drawRouteAndPoints(tracker);
      } else {
        this.removeElements();
      }
    }

    if (
      (nextTracker?.histories || []).length !==
      (tracker?.histories || []).length
    ) {
      this.handleMovingTracker(nextTracker);
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

  removeElements = () => {
    if (this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = undefined;
    }
    if (this.route) {
      this.map.removeLayer(this.route);
      this.route = null;
    }
    const pointIds = Object.keys(this.pointsTemp);
    pointIds.map(id => {
      this.map.removeLayer(this.pointsTemp[id]);
      delete this.pointsTemp[id];
      return null;
    });
  };

  drawRouteAndPoints = tracker => {
    const history = tracker?.histories || [];
    if (history.length) {
      const points = [...history, tracker];
      this.route = L.polyline(points, { weight: 3, color: '#168449' });
      this.route.addTo(this.map);
      points.map((p, i) => {
        const isFirstPoint = i === 0;
        const elm = document.createElement('div');
        elm.className = 'start-point';
        elm.innerHTML = `<div class="dot"></div><div class="line"></div>`;
        const icon = new L.DivIcon({
          html: isFirstPoint ? elm : '',
          className: isFirstPoint ? '' : 'point-dot',
        });
        this.pointsTemp[uniqueId('point')] = L.marker(p, {
          icon,
        }).addTo(this.map);
        return null;
      });
    }
  };

  handleMovingTracker = (tracker: ITracker) => {
    const { settings, mapId } = this.props;
    const lastPoint = tracker.histories[tracker.histories.length - 1];
    if (this.props.mapId !== 'mapPosition') {
      const isFirstPoint = tracker.histories.length === 1;
      const elm = document.createElement('div');
      elm.className = 'start-point';
      elm.innerHTML = `
        <div class="dot"></div>
        <div class="line"></div>
      `;
      const icon = new L.DivIcon({
        html: isFirstPoint ? elm : '',
        className: isFirstPoint ? '' : 'point-dot',
      });
      this.pointsTemp[uniqueId('point')] = L.marker(lastPoint, {
        icon,
      }).addTo(this.map);
    }
    const setting = settings
      ? settings[tracker.settings_id]
      : {
          preferences: {
            tracking_mode: { sample_rate: '', tracking_measurment: '' },
          },
        };
    const {
      preferences: {
        tracking_mode: { sample_rate, tracking_measurment },
      },
    } = setting;
    this.steps = tracking_measurment === 'seconds' ? sample_rate * 60 : 60;
    this.DELTA_LAT = (tracker.lat - lastPoint.lat) / this.steps;
    this.DELTA_LNG = (tracker.lng - lastPoint.lng) / this.steps;
    const bearing = turfBearing(
      [lastPoint.lng, lastPoint.lat],
      [tracker.lng, tracker.lat]
    );
    const arrow = document.getElementById(mapId + '_arrowTrackerIcon');
    if (arrow) {
      arrow.style.transform = `rotate(${bearing}deg)`;
    }
    this.moveMarker(tracker)();
  };

  trackerName = (name: string | number, status: string) => {
    const nameWidth = (name || '').toString().length * 9;
    return `<div class=${
      status === 'active' ? 'title-device' : 'red-title-device'
    } style='width:${nameWidth}px; left:-${nameWidth / 2 - 4}px'>${name}</div>`;
  };

  componentDidMount() {
    const { mapId, tracker, isMultiScreen, isMobile, isMultiView } = this.props;
    const { mapCenter, mapZoom } = this.state;
    const mapTile = this.getMapTile(isMultiScreen, mapId);
    let center = mapCenter;

    const zoom = isMobile && isMultiView ? 15 : mapZoom;

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

  getMarkerElement = (tracker, isTracking) => {
    const { device_name, device_id, icon_url, status } = tracker;
    const { mapId } = this.props;

    if (isTracking) {
      const markerSize = 20;
      const markerData = `<svg id="Layer_1" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g><path d="M17.3375483,23.9265823 L17.3375483,23.9265823 L32,31.9974684 L16,0 L0,32 L14.6624517,23.9291139 L14.6624517,23.9291139 C15.4913945,23.4708861 16.5086055,23.4708861 17.3375483,23.9265823 Z" fill="#168449" stroke="#fff" fill-stroke="1"/></g>
      </svg>`;
      const el = document.createElement('div');
      el.innerHTML = `
        <div id="${mapId + '_arrowTrackerIcon'}"
          class="arrow-div-icon"
          style="background-image: url(data:image/svg+xml;base64,${btoa(
            markerData
          )});width:${markerSize}px;height:${markerSize}px;z-index:1;"
        ></div>
        <div class="arrow-title">
          ${this.trackerName(device_name || device_id, status)}
        </div>
      `;
      return el;
    }

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
    const { trackers, isTracking, selectedTrackerId, mapId } = this.props;
    const tracker = trackers[selectedTrackerId];

    if (!this.marker && tracker && tracker.lat && tracker.lng) {
      const { lat, lng } = tracker;
      const elm = this.getMarkerElement(tracker, isTracking);
      const icon = new L.DivIcon({
        html: elm,
        className: isTracking ? 'arrow-icon' : '',
      });
      this.marker = L.marker([lat, lng], { icon });
      this.marker.addTo(this.map);
      this.map.panTo([lat, lng]);
      if (isTracking && mapId !== 'mapPosition') {
        this.drawRouteAndPoints(tracker);
      }
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
      id => id.toString() === selectedTrackerId?.toString()
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
          id.toString() === selectedTrackerId?.toString() ||
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
        {isMultiScreen && (
          <div
            className={clsx(classes.selects, {
              [classes.selectMobile]: isMobile,
            })}
            style={{ position: 'absolute' }}
          >
            <SelectTracker
              id={mapId}
              value={selectedTrackerId?.toString()}
              options={options}
              onChange={this.onChangeOption}
            />
          </div>
        )}
        {!isMultiScreen && mapLabel && (
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
