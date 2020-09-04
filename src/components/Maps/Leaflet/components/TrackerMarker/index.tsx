import React from 'react';
import L from 'leaflet';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
  isBeep: boolean;
  isAlertSos?: boolean;
  showTrackerName: boolean;
  selectedTrackerId?: number | null;
  alertSosTrackerId?: number[];
  onClickMarker(id: string | number): void;
}

class TrackerMarker extends React.Component<Props> {
  steps = 100;
  counter = 1;
  currentLat = 0;
  currentLng = 0;

  constructor(props) {
    super(props);
    window.trackerMarkers = window.trackerMarkers || {};
  }

  moveMarker = tracker => () => {
    const history = tracker.histories || [];
    const startPoint = history[history.length - 1];
    const DELTA_LAT = (startPoint.lat - tracker.lat) / this.steps;
    const DELTA_LNG = (startPoint.lng - tracker.lng) / this.steps;
    this.currentLat = (this.currentLat || startPoint.lat) + DELTA_LAT;
    this.currentLng = (this.currentLng || startPoint.lng) + DELTA_LNG;
    const latlng = L.latLng(this.currentLat, this.currentLng);

    if (window.trackerMarkers[tracker.device_id]) {
      if (this.counter < this.steps) {
        this.counter += 1;
        const options = !window.mapFullWidth ? LEAFLET_PADDING_OPTIONS : {};
        window.mapEvents.setFitBounds([latlng], options);
        window.trackerMarkers[tracker.device_id].setLatLng(latlng);
        requestAnimationFrame(this.moveMarker(tracker));
      } else {
        this.counter = 0;
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    const {
      isBeep,
      showTrackerName,
      tracker: nextTracker,
      selectedTrackerId: nextSelectedTrackerId,
      isAlertSos,
    } = nextProps;
    const {
      isBeep: currentIsBeep,
      tracker,
      selectedTrackerId,
      showTrackerName: thisShowTrackerName,
      alertSosTrackerId,
      isAlertSos: currentIsAlertSos,
    } = this.props;
    const marker = window.trackerMarkers[tracker.device_id];
    const element = marker ? marker.getElement() : undefined;

    if (nextSelectedTrackerId !== selectedTrackerId && element) {
      element.style.zIndex =
        tracker.device_id === nextSelectedTrackerId ? 2 : 1;
    }

    if (
      (nextTracker.histories || []).length !== (tracker.histories || []).length
    ) {
      this.moveMarker(nextTracker)();
    }

    if (
      (isBeep !== currentIsBeep || showTrackerName !== thisShowTrackerName) &&
      marker &&
      tracker
    ) {
      const isSelected =
        tracker.device_id.toString() === selectedTrackerId?.toString();
      const elm2 = document.createElement('div');
      elm2.className = `custom-div-icon${
        isBeep && isSelected ? '-custom' : ''
      }`;
      elm2.innerHTML = `
        <div class='icon-red${isBeep && isSelected ? '-active' : ''}'>
          <span class='inner'></span>
          <div class='marker-pin' style='background-image:url(${
            tracker.status === 'active'
              ? '/images/icon-marker.svg'
              : '/images/red-marker.svg'
          })'
          >
            ${
              tracker.icon_url
                ? `<div class='image-marker' style='background-image: url(${tracker.icon_url})'></div>`
                : `<img src='/images/image-device.png'
                } class='image-device'></img>`
            }
          </div>
         ${
           showTrackerName
             ? this.trackerName(tracker.device_name, tracker.status)
             : ''
         }
        </div>`;
      const icon = new L.DivIcon({ html: elm2 });
      marker.setIcon(icon);
      if (element) {
        element.style.zIndex = isSelected ? 2 : 1;
      }
    }

    if ((isAlertSos !== currentIsAlertSos || isAlertSos) && tracker && marker) {
      const isSelectedTrackerSos = Boolean(
        alertSosTrackerId?.find(trackerSos => {
          return trackerSos === tracker.device_id;
        })
      );

      const elm2 = document.createElement('div');
      elm2.className = 'custom-div-icon-sos';
      elm2.innerHTML = `
        <div class='icon-red${
          isAlertSos && isSelectedTrackerSos ? '-sos' : ''
        }'>
          <span class='inner'></span>
          <div class='marker-pin' style='background-image:url(${
            tracker.status === 'active'
              ? '/images/icon-marker.svg'
              : '/images/red-marker.svg'
          })'
          >
            ${
              tracker.icon_url
                ? `<div class='image-marker' style='background-image: url(${tracker.icon_url})'></div>`
                : `<img src='/images/image-device.png'
                } class='image-device'></img>`
            }
            ${
              showTrackerName
                ? this.trackerName(tracker.device_name, tracker.status)
                : ''
            }
          </div>
        </div>`;
      const icon = new L.DivIcon({ html: elm2 });
      marker.setIcon(icon);
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

  trackerName = (name: string, status: string) => {
    const nameWidth = name.length * 9;
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
          })'
          >
            ${
              icon_url
                ? `<div class='image-marker' style='background-image: url(${icon_url})'></div>`
                : `<img src='/images/image-device.png'
                } class='image-device'></img>`
            }
          ${showTrackerName ? this.trackerName(device_name, status) : ''}
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
