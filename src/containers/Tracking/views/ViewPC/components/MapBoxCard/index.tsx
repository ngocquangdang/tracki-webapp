import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
import { bearing as turfBearing } from '@turf/turf';
import mapboxgl from 'mapbox-gl';

import { MAPBOX_API_KEY } from '@Definitions/app';
import MapToolBar from '../MapToolBar';
import style from './styles';
import { ITracker } from '@Interfaces';

interface IProps {
  mapId: string;
  isFullWidth: boolean;
  isMultiScreen: boolean;
  isMultiView: boolean;
  trackers: object;
  settings: object;
  isMobile?: boolean;
  isHelicopterView?: boolean;
  selectedTrackerId: number;
  trackingIds: number[];
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

class MapCard extends React.Component<IProps, IState> {
  map: any;
  marker: any;
  mapTile: any;
  isFirstFitBounce: boolean;
  steps = 60;
  counter = 1;
  currentLat = 0;
  currentLng = 0;
  pointsTemp = {};
  DELTA_LAT = 0;
  DELTA_LNG = 0;
  geolocate: any;
  bearing = 0;

  constructor(props) {
    super(props);
    this.state = {
      isInitiatedMap: false,
      mapCenter: [40.866667, 34.566667],
      mapZoom: 16,
      userLocation: null,
      mapStyle: 'satellite-v9',
    };
    this.isFirstFitBounce = false;
  }

  moveMarker = tracker => () => {
    const history = tracker.histories || [];
    const startPoint = history[history.length - 1];

    if (this.counter <= this.steps && startPoint) {
      this.counter += 1;
      this.currentLat = (this.currentLat || startPoint.lat) + this.DELTA_LAT;
      this.currentLng = (this.currentLng || startPoint.lng) + this.DELTA_LNG;
      const lnglat = [+this.currentLng.toFixed(7), +this.currentLat.toFixed(7)];

      if (this.marker) {
        this.marker.setLngLat(lnglat);
        const routeSource = this.map.getSource('route-tracker');
        if (routeSource) {
          const {
            _data: {
              geometry: { coordinates },
            },
          } = routeSource;
          const lineGeoJson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [...coordinates, lnglat],
            },
          };
          this.map.getSource('route-tracker').setData(lineGeoJson);
        } else {
          this.initRoute([[startPoint.lng, startPoint.lat], lnglat]);
        }
        this.map.panTo(lnglat, { duration: 0 });
      }
      requestAnimationFrame(this.moveMarker(tracker));
    } else {
      this.counter = 1;
    }
  };

  initRoute = coordinates => {
    const lineGeoJson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    };
    this.map.addSource('route-tracker', {
      type: 'geojson',
      data: lineGeoJson,
    });
    this.map.addLayer({
      id: 'route-layer',
      type: 'line',
      source: 'route-tracker',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#168449',
        'line-width': 3,
        'line-opacity': 1,
      },
    });
  };

  componentWillReceiveProps(nextProps) {
    const { selectedTrackerId, trackers: nextTrackers } = nextProps;
    const { selectedTrackerId: thisSelectedTracker, trackers } = this.props;
    const tracker = trackers[selectedTrackerId];

    // fitbound map
    if (
      this.map &&
      tracker &&
      tracker.lat &&
      tracker.lng &&
      !this.isFirstFitBounce
    ) {
      this.map.flyTo({ center: [tracker.lng, tracker.lat], duration: 0 });
      this.isFirstFitBounce = true;
    }

    // remove current marker
    if (selectedTrackerId !== thisSelectedTracker) {
      if (this.marker) {
        this.marker.remove();
        this.marker = undefined;
      }
      if (this.map.getLayer('route-layer')) {
        this.map.removeLayer('route-layer');
      }
      if (this.map.getSource('route-tracker')) {
        this.map.removeSource('route-tracker');
      }
      if (this.props.mapId !== 'mapPosition') {
        const pointIds = Object.keys(this.pointsTemp);
        pointIds.map(id => {
          this.pointsTemp[id].remove();
          delete this.pointsTemp[id];
          return null;
        });
      }
    }

    const nextTracker = nextTrackers[selectedTrackerId];
    if (
      (nextTracker?.histories || []).length !==
      (tracker?.histories || []).length
    ) {
      this.handleMovingTracker(nextTracker);
    }
  }

  handleMovingTracker = (tracker: ITracker) => {
    const { settings } = this.props;
    const lastPoint = tracker.histories[tracker.histories.length - 1];
    const isFirstPoint = tracker.histories.length === 1;
    const el = document.createElement('div');
    if (isFirstPoint) {
      el.className = 'start-point';
      el.innerHTML = `
        <div class="dot"></div>
        <div class="line"></div>
      `;
    } else {
      el.className = 'point-dot';
    }
    this.pointsTemp[uniqueId('point')] = new mapboxgl.Marker(el)
      .setLngLat([lastPoint.lng, lastPoint.lat])
      .addTo(this.map);
    const setting = settings[tracker.settings_id];
    const {
      preferences: {
        tracking_mode: { sample_rate, tracking_measurment },
      },
    } = setting;
    this.steps = tracking_measurment === 'seconds' ? sample_rate * 60 : 60;
    this.DELTA_LAT = (tracker.lat - lastPoint.lat) / this.steps;
    this.DELTA_LNG = (tracker.lng - lastPoint.lng) / this.steps;
    this.bearing = turfBearing(
      [lastPoint.lng, lastPoint.lat],
      [tracker.lng, tracker.lat],
      { final: true }
    );
    this.map.rotateTo(this.bearing, { duration: 100 });
    setTimeout(() => {
      this.moveMarker(tracker)();
    }, 500);
  };

  trackerName = (name: string | number, status: string) => {
    const nameWidth = (name || '').toString().length * 9;
    return `<div class=${
      status === 'active' ? 'title-device' : 'red-title-device'
    } style='width:${nameWidth}px; left:-${nameWidth / 2 - 4}px'>${name}</div>`;
  };

  componentDidMount() {
    const { mapId, tracker, isMobile, isMultiView } = this.props;
    const { mapCenter, mapZoom, mapStyle } = this.state;
    const zoom = isMobile && isMultiView ? 14 : mapZoom;
    let center = mapCenter;

    if (tracker && tracker.lat && tracker.lng) {
      center = [tracker.lat, tracker.lng];
      this.isFirstFitBounce = true;
    }

    mapboxgl.accessToken = MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      container: mapId,
      style: `mapbox://styles/mapbox/` + mapStyle,
      center,
      zoom,
      maxZoom: 19,
      attributionControl: true,
    });

    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    this.map.addControl(this.geolocate);
    this.map.on('click', e => {
      console.log('___MAP CLICKED', e);
    });

    this.setState({ isInitiatedMap: true });
  }

  getUserLocation = () => {
    this.geolocate.trigger();
  };

  changeMapTile = (tile: string) => {
    const route = this.map.getSource('route-tracker');
    this.map.setStyle('mapbox://styles/mapbox/' + tile);
    this.setState({ mapStyle: tile }, () => {
      setTimeout(() => {
        if (route) {
          this.initRoute(route._data.geometry.coordinates);
        }
      }, 1000);
    });
  };

  changeZoom = (value: number) => {
    const currentZoom = this.map.getZoom();
    this.map.setZoom(currentZoom + value * 2);
  };

  onClickTracker = (id: string | number) => {
    console.log(id);
  };

  getMarkerElement = tracker => {
    const { device_name, device_id, status } = tracker;
    const markerSize = 20;
    const markerData = `<svg id="Layer_1" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g><path d="M17.3375483,23.9265823 L17.3375483,23.9265823 L32,31.9974684 L16,0 L0,32 L14.6624517,23.9291139 L14.6624517,23.9291139 C15.4913945,23.4708861 16.5086055,23.4708861 17.3375483,23.9265823 Z" fill="#168449" stroke="#fff" fill-stroke="1"/></g>
    </svg>`;
    const el = document.createElement('div');
    el.className = 'arrow-div-icon';
    el.id = 'arrowTrackerIcon';
    el.style.backgroundImage =
      'url(data:image/svg+xml;base64,' + btoa(markerData) + ')';
    el.style.width = markerSize + 'px';
    el.style.height = markerSize + 'px';
    el.innerHTML = `
      <div class="arrow-title">
        ${this.trackerName(device_name || device_id, status)}
      </div>`;
    return el;
  };

  renderMarker = () => {
    const { trackers, selectedTrackerId } = this.props;
    const tracker = trackers[selectedTrackerId];

    if (!this.marker && tracker && tracker.lat && tracker.lng) {
      const { lat, lng } = tracker;
      const elm = this.getMarkerElement(tracker);
      this.marker = new mapboxgl.Marker(elm)
        .setLngLat([lng, lat])
        .addTo(this.map);
      this.map.flyTo({ center: [lng, lat], duration: 0 });
    }
    return null;
  };

  render() {
    const { mapId, classes, mapLabel, isMobile, t } = this.props;
    const { isInitiatedMap, mapStyle } = this.state;

    return (
      <React.Fragment>
        <div
          id={mapId}
          className={clsx(classes.mapCard, {
            [classes.mapCardMobile]: isMobile,
          })}
        />
        <div
          className={clsx(classes.mapLabel, {
            [classes.labelMobile]: isMobile,
          })}
          style={{ position: 'absolute' }}
        >
          {mapLabel}
        </div>
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
