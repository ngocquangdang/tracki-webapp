import React from 'react';
import L from 'leaflet';
import { uniqueId } from 'lodash';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
  isBeep: boolean;
  isAlertSos?: boolean;
  isTracking?: boolean;
  showTrackerName: boolean;
  selectedTrackerId?: number | null;
  alertSosTrackerId?: number | null;
  onClickMarker(id: string | number): void;
}

class TrackerMarker extends React.Component<Props> {
  steps = 60;
  counter = 1;
  currentLat = 0;
  currentLng = 0;
  trackerRoute: any = null;
  pointsTemp = {};

  constructor(props) {
    super(props);
    window.trackerMarkers = window.trackerMarkers || {};
  }

  moveMarker = tracker => () => {
    const history = tracker.histories || [];
    const startPoint = history[history.length - 1];
    if (startPoint) {
      const DELTA_LAT = (tracker.lat - startPoint.lat) / this.steps;
      const DELTA_LNG = (tracker.lng - startPoint.lng) / this.steps;
      this.currentLat = (this.currentLat || startPoint.lat) + DELTA_LAT;
      this.currentLng = (this.currentLng || startPoint.lng) + DELTA_LNG;
      const latlng = L.latLng(this.currentLat, this.currentLng);

      if (window.trackerMarkers[tracker.device_id]) {
        if (this.counter < this.steps) {
          this.counter += 1;
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
          const options = !window.mapFullWidth ? LEAFLET_PADDING_OPTIONS : {};
          window.mapEvents.setFitBounds([latlng], options);
          requestAnimationFrame(this.moveMarker(tracker));
        } else {
          this.counter = 0;
        }
      }
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
    const { tracker, isAlertSos, alertSosTrackerId, showTrackerName } = props;
    const marker = window.trackerMarkers[tracker.device_id];
    const isSelected =
      tracker.device_id.toString() === alertSosTrackerId?.toString();
    const elm2 = document.createElement('div');
    elm2.className = 'custom-div-icon-sos';
    elm2.innerHTML = `
      <div class='icon-red${isAlertSos && isSelected ? '-sos' : ''}'>
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
        const lastPoint =
          nextTracker.histories[nextTracker.histories.length - 1];
        const icon = new L.DivIcon({
          className: 'point-dot',
        });
        this.pointsTemp[uniqueId('point')] = L.marker(lastPoint, {
          icon,
        }).addTo(map);
        this.moveMarker(nextTracker)();
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
      if (isAlertSos !== currentIsAlertSos) {
        this.updateAlertMarker(nextProps);
      }
    }
  }

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

  renderTracker = () => {
    const {
      map,
      showTrackerName,
      tracker: { device_id, lat, lng, icon_url, device_name, status },
    } = this.props;

    if (map && !window.trackerMarkers[device_id] && lat && lng) {
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
          ${
            showTrackerName
              ? this.trackerName(device_name || device_id, status)
              : ''
          }
        </div>`;

      const icon = new L.DivIcon({ html: elm });
      elm.addEventListener('click', this.onClickMarker);
      window.trackerMarkers[device_id] = L.marker([lat, lng], { icon });
      window.trackerMarkers[device_id].addTo(map);
    }
  };

  render() {
    return <>{this.renderTracker()}</>;
  }
}

export default TrackerMarker;
