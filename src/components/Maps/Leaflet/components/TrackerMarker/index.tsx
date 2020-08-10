import React from 'react';
import L from 'leaflet';

import { ITracker } from '@Interfaces';

interface Props {
  map: any;
  tracker: ITracker;
  isBeep: boolean;
  selectedTrackerId?: number | null;
  onClickMarker(id: string | number): void;
}

declare global {
  interface Window {
    trackerMarkers: object;
  }
}

class TrackerMarker extends React.Component<Props> {
  constructor(props) {
    super(props);
    window.trackerMarkers = window.trackerMarkers || {};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isBeep } = nextProps;
    const { isBeep: currentIsBeep, tracker, selectedTrackerId } = this.props;
    const marker = window.trackerMarkers[tracker.device_id];

    if (isBeep !== currentIsBeep && marker && tracker) {
      const nameWidth = tracker.device_name.length * 9;
      const elm2 = document.createElement('div');
      elm2.className = `custom-div-icon${
        isBeep && tracker.device_id === selectedTrackerId ? '-custom' : ''
      }`;
      elm2.innerHTML = `
        <div class='icon-red${
          isBeep && tracker.device_id === selectedTrackerId ? '-active' : ''
        }'>
          <span class='inner'></span>
          <div class='marker-pin'>
            <img src=${
              tracker.icon_url || '/images/image-device.png'
            } class='image-device'></img>
          </div>
        <div>
        <div class='title-device' style='width:${nameWidth}px; left:-${
        nameWidth / 2
      }px'>${tracker.device_name}</div>`;
      const icon = new L.DivIcon({ html: elm2 });
      marker.setIcon(icon);
    }
  }

  onClickMarker = () => {
    const {
      tracker: { device_id },
      onClickMarker,
    } = this.props;
    onClickMarker(device_id);
  };

  renderTracker = () => {
    const {
      map,
      tracker: { device_id, lat, lng, icon_url, device_name },
    } = this.props;

    if (map && !window.trackerMarkers[device_id] && lat && lng) {
      const nameWidth = device_name.length * 9;
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
        <div>
        <div class='title-device' style='width:${nameWidth}px; left:-${
        nameWidth / 2 - 4
      }px'>${device_name}</div>`;

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
