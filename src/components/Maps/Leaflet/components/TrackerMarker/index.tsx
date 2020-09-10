import React from 'react';
import L from 'leaflet';
import { uniqueId } from 'lodash';
import { bearing as turfBearing } from '@turf/turf';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
  settings: object;
  isBeep: boolean;
  isAlertSos?: boolean;
  isMobile?: boolean;
  isTracking?: boolean;
  showTrackerName: boolean;
  selectedTrackerId?: number | null;
  alertSosTrackerId?: number[];
  onClickMarker(id: string | number): void;
}

class TrackerMarker extends React.Component<Props> {
  steps = 60;
  counter = 1;
  currentLat = 0;
  currentLng = 0;
  trackerRoute: any = null;
  pointsTemp = {};
  DELTA_LAT = 0;
  DELTA_LNG = 0;

  constructor(props) {
    super(props);
    window.trackerMarkers = window.trackerMarkers || {};
  }

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

      if (window.trackerMarkers[tracker.device_id]) {
        window.trackerMarkers[tracker.device_id].setLatLng(latlng);
        if (this.trackerRoute) {
          const latlngs = this.trackerRoute.getLatLngs();
          latlngs.push(latlng);
          this.trackerRoute.setLatLngs(latlngs);
        } else {
          this.trackerRoute = L.polyline([startPoint, latlng], {
            weight: 3,
            color: '#168449',
          });
          this.trackerRoute.addTo(this.props.map);
        }
        const options =
          !this.props.isMobile && !window.mapFullWidth
            ? LEAFLET_PADDING_OPTIONS
            : {};
        this.props.map.panInside(latlng, options);
      }
      requestAnimationFrame(this.moveMarker(tracker));
    } else {
      this.counter = 1;
    }
  };

  updateBeepMarker = (props: Props) => {
    const { tracker, selectedTrackerId, isBeep, showTrackerName } = props;
    const marker = window.trackerMarkers[tracker.device_id];
    const element = marker ? marker.getElement() : undefined;
    const isSelected =
      tracker.device_id.toString() === selectedTrackerId?.toString();
    const elm2 = document.createElement('div');
    elm2.className = `custom-div-icon${isBeep && isSelected ? '-custom' : ''}`;
    elm2.innerHTML = `
      <div class='icon-red${isBeep && isSelected ? '-active' : ''}'>
        <span class='inner'></span>
        <div class='marker-pin' style='background-image:url(${
          tracker.status === 'active'
            ? '/images/icon-marker.svg'
            : '/images/red-marker.svg'
        })'>
          ${
            tracker.icon_url
              ? `<div class='image-marker' style='background-image: url(${tracker.icon_url})'></div>`
              : `<img src='/images/image-device.png' class='image-device'></img>`
          }
        </div>
      ${
        showTrackerName
          ? this.trackerName(
              tracker.device_name || tracker.device_id,
              tracker.status
            )
          : ''
      }
      </div>`;
    const icon = new L.DivIcon({ html: elm2 });
    marker.setIcon(icon);
    if (element) {
      element.style.zIndex = isSelected ? 2 : 1;
    }
  };

  updateAlertMarker = (props: Props) => {
    const { tracker, alertSosTrackerId, isAlertSos, showTrackerName } = props;
    const isSelectedTrackerSos = Boolean(
      alertSosTrackerId?.find(trackerSos => {
        return trackerSos === tracker.device_id;
      })
    );

    const marker = window.trackerMarkers[tracker.device_id];
    const elm2 = document.createElement('div');
    elm2.className = 'custom-div-icon-sos';
    elm2.innerHTML = `
      <div class='icon-red${isAlertSos && isSelectedTrackerSos ? '-sos' : ''}'>
        <span class='inner'></span>
        <div class='marker-pin' style='background-image:url(${
          tracker.status === 'active'
            ? '/images/icon-marker.svg'
            : '/images/red-marker.svg'
        })'>
        ${
          tracker.icon_url
            ? `<div class='image-marker' style='background-image: url(${tracker.icon_url})'></div>`
            : `<img src='/images/image-device.png' class='image-device'></img>`
        }
        ${
          showTrackerName
            ? this.trackerName(
                tracker.device_name || tracker.device_id,
                tracker.status
              )
            : ''
        }
        </div>
      </div>`;
    const icon = new L.DivIcon({ html: elm2 });
    marker.setIcon(icon);
  };

  componentWillReceiveProps(nextProps) {
    const {
      isBeep,
      showTrackerName,
      tracker: nextTracker,
      selectedTrackerId: nextSelectedTrackerId,
      isAlertSos,
      isTracking,
      map,
    } = nextProps;
    const {
      isBeep: currentIsBeep,
      tracker,
      selectedTrackerId,
      showTrackerName: thisShowTrackerName,
      isAlertSos: currentIsAlertSos,
    } = this.props;
    const marker = window.trackerMarkers[tracker.device_id];
    const element = marker ? marker.getElement() : undefined;

    if (nextSelectedTrackerId !== selectedTrackerId && element) {
      element.style.zIndex =
        tracker.device_id === nextSelectedTrackerId ? 2 : 1;
    }

    // update marker at the tracking screen
    if (isTracking) {
      if (
        nextTracker.device_id === tracker.device_id &&
        (nextTracker.histories || []).length !==
          (tracker.histories || []).length
      ) {
        this.handleMovingTracker(nextTracker);
      }
      if (nextTracker.device_id !== tracker.device_id) {
        if (this.trackerRoute) {
          map.removeLayer(this.trackerRoute);
          this.trackerRoute = null;
        }
        if (window.trackerMarkers[tracker.device_id]) {
          map.removeLayer(window.trackerMarkers[tracker.device_id]);
          delete window.trackerMarkers[tracker.device_id];
        }
        const pointIds = Object.keys(this.pointsTemp);
        pointIds.map(id => {
          map.removeLayer(this.pointsTemp[id]);
          delete this.pointsTemp[id];
          return null;
        });
      }
    }

    // update marker
    if (tracker && marker) {
      // update beep
      if (isBeep !== currentIsBeep || showTrackerName !== thisShowTrackerName) {
        this.updateBeepMarker(nextProps);
      }

      // update alert
      if (isAlertSos !== currentIsAlertSos || isAlertSos) {
        this.updateAlertMarker(nextProps);
      }
    }
  }

  handleMovingTracker = (tracker: ITracker) => {
    const { map, settings } = this.props;
    const lastPoint = tracker.histories[tracker.histories.length - 1];
    const icon = new L.DivIcon({ className: 'point-dot' });
    this.pointsTemp[uniqueId('point')] = L.marker(lastPoint, {
      icon,
    }).addTo(map);
    const setting = settings[tracker.settings_id];
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
    const arrow = document.getElementById(
      tracker.device_id + '_arrowTrackerIcon'
    );
    if (arrow) {
      arrow.style.transform = `rotate(${bearing}deg)`;
    }
    this.moveMarker(tracker)();
  };

  onZoomEnd = () => {
    const { tracker, selectedTrackerId } = this.props;
    const marker = window.trackerMarkers[tracker.device_id];
    const element = marker ? marker.getElement() : undefined;
    const isSelected =
      tracker.device_id.toString() === selectedTrackerId?.toString();

    if (element) {
      element.style.zIndex = isSelected ? 2 : 1;
    }
  };

  componentDidMount() {
    const { map } = this.props;
    map.on('zoomend', this.onZoomEnd);
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.off('zoomend', this.onZoomEnd);
  }

  onClickMarker = () => {
    const {
      tracker: { device_id },
      onClickMarker,
    } = this.props;
    onClickMarker && onClickMarker(device_id);
  };

  trackerName = (name: string | number, status: string) => {
    const nameWidth = name.toString().length * 9;
    return `<div class=${
      status === 'active' ? 'title-device' : 'red-title-device'
    } style='width:${nameWidth}px; left:-${nameWidth / 2 - 4}px'>${name}</div>`;
  };

  getMarkerElement = (tracker, isTracking) => {
    const { device_name, device_id, icon_url, status } = tracker;

    if (isTracking) {
      const markerSize = 20;
      const markerData = `<svg id="Layer_1" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g><path d="M17.3375483,23.9265823 L17.3375483,23.9265823 L32,31.9974684 L16,0 L0,32 L14.6624517,23.9291139 L14.6624517,23.9291139 C15.4913945,23.4708861 16.5086055,23.4708861 17.3375483,23.9265823 Z" fill="#168449" stroke="#fff" fill-stroke="1"/></g>
      </svg>`;
      const el = document.createElement('div');
      el.innerHTML = `
        <div id="${device_id + '_arrowTrackerIcon'}"
          class="arrow-div-icon"
          style="background-image: url(data:image/svg+xml;base64,${btoa(
            markerData
          )});width: ${markerSize}px;height: ${markerSize}px"
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

  renderTracker = () => {
    const { map, isTracking, tracker } = this.props;
    const { device_id, lat, lng } = tracker;

    if (map && !window.trackerMarkers[device_id] && lat && lng) {
      const elm = this.getMarkerElement(tracker, isTracking);
      const icon = new L.DivIcon({
        html: elm,
        className: isTracking ? 'arrow-icon' : '',
      });
      if (!isTracking) {
        elm.addEventListener('click', this.onClickMarker);
      }
      window.trackerMarkers[device_id] = L.marker([lat, lng], { icon });
      window.trackerMarkers[device_id].addTo(map);
    }
  };

  render() {
    return <>{this.renderTracker()}</>;
  }
}

export default TrackerMarker;
